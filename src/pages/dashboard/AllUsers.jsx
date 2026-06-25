import { useEffect, useState } from "react";
import { MoreVertical, ShieldCheck, UserCheck, UserX, UserCog } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

function ActionMenu({ user, onAction }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        className="small-btn"
        onClick={() => setOpen((v) => !v)}
        style={{ padding: "0.4rem 0.55rem" }}
      >
        <MoreVertical size={15} />
      </button>
      {open && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 10 }}
            onClick={() => setOpen(false)}
          />
          <div
            style={{
              position: "absolute", right: 0, top: "calc(100% + 4px)",
              background: "#fff", border: "1px solid var(--line)",
              borderRadius: 10, padding: "0.4rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 20,
              minWidth: 180, display: "flex", flexDirection: "column", gap: "0.2rem",
            }}
          >
            {user.status === "active" ? (
              <button
                className="small-btn"
                style={{ width: "100%", justifyContent: "flex-start", color: "var(--red-dark)" }}
                onClick={() => { onAction(user._id, "status", { status: "blocked" }); setOpen(false); }}
              >
                <UserX size={13} /> Block User
              </button>
            ) : (
              <button
                className="small-btn"
                style={{ width: "100%", justifyContent: "flex-start", color: "var(--green)" }}
                onClick={() => { onAction(user._id, "status", { status: "active" }); setOpen(false); }}
              >
                <UserCheck size={13} /> Unblock User
              </button>
            )}
            {user.role === "donor" && (
              <button
                className="small-btn"
                style={{ width: "100%", justifyContent: "flex-start" }}
                onClick={() => { onAction(user._id, "role", { role: "volunteer" }); setOpen(false); }}
              >
                <UserCog size={13} /> Make Volunteer
              </button>
            )}
            {user.role !== "admin" && (
              <button
                className="small-btn"
                style={{ width: "100%", justifyContent: "flex-start", color: "var(--gold)" }}
                onClick={() => { onAction(user._id, "role", { role: "admin" }); setOpen(false); }}
              >
                <ShieldCheck size={13} /> Make Admin
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function AllUsers() {
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const load = (p = 1) => {
    api
      .get("/users", { params: { status: status || undefined, page: p, limit: 10 } })
      .then(({ data }) => {
        setUsers(data.items);
        setPages(data.pages);
        setTotal(data.total);
        setPage(p);
      });
  };

  useEffect(() => { load(1); }, [status]);

  const action = async (id, path, payload) => {
    try {
      await api.patch(`/users/${id}/${path}`, payload);
      toast.success("User updated successfully");
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div>
      <div className="section-head">
        <h1>All Users</h1>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          <span style={{ color: "var(--muted)", fontSize: "0.88rem" }}>{total} total</span>
          <select
            value={status}
            style={{ width: "auto", padding: "0.5rem 0.75rem" }}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <img
                      className="tiny-avatar"
                      src={u.avatar}
                      alt={u.name}
                    />
                    <span style={{ fontWeight: 700 }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ color: "var(--muted)", fontSize: "0.88rem" }}>{u.email}</td>
                <td><span className={`badge ${u.role}`}>{u.role}</span></td>
                <td><span className={`badge ${u.status}`}>{u.status}</span></td>
                <td>
                  <ActionMenu user={u} onAction={action} />
                </td>
              </tr>
            ))}
            {!users.length && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "var(--muted)" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="pager">
          <button className="btn ghost" disabled={page <= 1} onClick={() => load(page - 1)}>
            ← Previous
          </button>
          <span>Page {page} of {pages}</span>
          <button className="btn ghost" disabled={page >= pages} onClick={() => load(page + 1)}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
