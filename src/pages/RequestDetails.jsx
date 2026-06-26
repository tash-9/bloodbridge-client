import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Droplets, MapPin, Calendar, Clock, Hospital, User, Mail, FileText } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

function DonateModal({ item, user, onConfirm, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Confirm Donation</h2>
        <p>
          You are about to confirm donation for <strong>{item.recipientName}</strong>.
          Your information will be recorded and the request status will change to
          <em> in progress</em>.
        </p>
        <div style={{ background: "var(--soft)", borderRadius: 8, padding: "1rem", marginBottom: "1rem", display: "grid", gap: "0.5rem" }}>
          <label>
            Donor Name
            <input disabled value={user.name} />
          </label>
          <label>
            Donor Email
            <input disabled value={user.email} />
          </label>
        </div>
        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={onConfirm}>Confirm Donation</button>
        </div>
      </div>
    </div>
  );
}

export default function RequestDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const load = () =>
    api.get(`/requests/${id}`)
      .then(({ data }) => setItem(data))
      .catch(() => navigate("/donation-requests"))
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, [id]);

  const confirmDonate = async () => {
    try {
      await api.patch(`/requests/${id}/status`, { status: "inprogress" });
      toast.success("Donation confirmed! Thank you.");
      setShowModal(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not confirm donation");
    }
  };

  if (loading) return <div className="loader">Loading request details…</div>;
  if (!item) return null;

  const rows = [
    [Hospital, "Hospital", item.hospitalName],
    [MapPin, "Address", `${item.address}, ${item.recipientUpazila}, ${item.recipientDistrict}`],
    [Calendar, "Date", item.donationDate],
    [Clock, "Time", item.donationTime],
    [User, "Requester", item.requesterName],
    [Mail, "Contact", item.requesterEmail],
    [FileText, "Message", item.message],
  ];

  return (
    <main className="page">
      {showModal && (
        <DonateModal
          item={item}
          user={user}
          onConfirm={confirmDonate}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="details-card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span className="badge red" style={{ fontSize: "1.1rem", padding: "0.5rem 1.1rem" }}>
            {item.bloodGroup}
          </span>
          <span className={`badge ${item.status}`}>{item.status}</span>
        </div>

        <h1>{item.recipientName}</h1>
        <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>Donation request details</p>

        <dl>
          {rows.map(([Icon, label, value]) => (
            <div className="details-row" key={label}>
              <dt style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Icon size={14} style={{ color: "var(--red)" }} /> {label}
              </dt>
              <dd>{value}</dd>
            </div>
          ))}

          {item.status === "inprogress" && (
            <div className="details-row">
              <dt style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Droplets size={14} style={{ color: "var(--red)" }} /> Donor
              </dt>
              <dd>
                <strong>{item.donorName || "Unknown"}</strong>
                {item.donorEmail && (
                  <span style={{ color: "var(--muted)", fontSize: "0.875rem", display: "block" }}>
                    {item.donorEmail}
                  </span>
                )}
              </dd>
            </div>
          )}
        </dl>

        {item.status === "pending" && (
          <div className="donate-section">
            <p style={{ color: "var(--muted)", marginBottom: "1rem", fontSize: "0.95rem" }}>
              Ready to help? Click the button below to confirm your donation.
            </p>
            <button className="btn primary" onClick={() => setShowModal(true)}>
              <Droplets size={16} /> Donate Now
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
