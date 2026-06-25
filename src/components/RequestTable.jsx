import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Action</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
          <button className="btn danger" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default function RequestTable({ requests, refresh, management = false }) {
  const { user } = useAuth();
  const [deleteId, setDeleteId] = useState(null);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/requests/${id}/status`, { status });
      toast.success("Status updated");
      refresh?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/requests/${deleteId}`);
      toast.success("Request deleted");
      setDeleteId(null);
      refresh?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  if (!requests.length) {
    return (
      <div className="empty-state">
        <p>No donation requests found.</p>
      </div>
    );
  }

  return (
    <>
      {deleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this donation request? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood</th>
              <th>Status</th>
              <th>Donor Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item) => (
              <tr key={item._id}>
                <td style={{ fontWeight: 700 }}>{item.recipientName}</td>
                <td>{item.recipientDistrict}, {item.recipientUpazila}</td>
                <td>{item.donationDate}</td>
                <td>{item.donationTime}</td>
                <td><span className="badge red">{item.bloodGroup}</span></td>
                <td><span className={`badge ${item.status}`}>{item.status}</span></td>
                <td style={{ fontSize: "0.82rem" }}>
                  {item.status === "inprogress"
                    ? <><strong>{item.donorName}</strong><br /><span style={{ color: "var(--muted)" }}>{item.donorEmail}</span></>
                    : "–"}
                </td>
                <td>
                  <div className="td-actions">
                    <Link className="small-btn" to={`/requests/${item._id}`}>
                      <Eye size={13} /> View
                    </Link>

                    {management && user?.role !== "volunteer" && (
                      <Link className="small-btn" to={`/dashboard/edit-request/${item._id}`}>
                        <Pencil size={13} /> Edit
                      </Link>
                    )}

                    {management && user?.role !== "volunteer" && (
                      <button className="small-btn" onClick={() => setDeleteId(item._id)}>
                        <Trash2 size={13} /> Delete
                      </button>
                    )}

                    {item.status === "inprogress" && user?.role !== "volunteer" && (
                      <>
                        <button
                          className="small-btn primary"
                          onClick={() => updateStatus(item._id, "done")}
                        >
                          <CheckCircle size={13} /> Done
                        </button>
                        <button
                          className="small-btn"
                          style={{ color: "var(--red-dark)", borderColor: "var(--red-mid)" }}
                          onClick={() => updateStatus(item._id, "canceled")}
                        >
                          <XCircle size={13} /> Cancel
                        </button>
                      </>
                    )}

                    {management && user?.role === "volunteer" && (
                      <select
                        value={item.status}
                        style={{ width: "auto", padding: "0.35rem 0.6rem", fontSize: "0.82rem" }}
                        onChange={(e) => updateStatus(item._id, e.target.value)}
                      >
                        <option value="pending">pending</option>
                        <option value="inprogress">inprogress</option>
                        <option value="done">done</option>
                        <option value="canceled">canceled</option>
                      </select>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
