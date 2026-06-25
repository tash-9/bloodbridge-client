import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import api from "../../services/api";
import RequestTable from "../../components/RequestTable";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function MyRequests({ all = false }) {
  const { user } = useAuth();

  if (all && !["admin", "volunteer"].includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  const [state, setState] = useState({ items: [], page: 1, pages: 1, total: 0 });
  const [status, setStatus] = useState("");

  const load = useCallback(
    (page = 1) => {
      api
        .get("/requests", {
          params: {
            page,
            limit: 8,
            status: status || undefined,
            mine: all ? undefined : true,
          },
        })
        .then(({ data }) => setState(data));
    },
    [status, all]
  );

  useEffect(() => { load(1); }, [load]);

  return (
    <div>
      <div className="section-head">
        <h1>{all ? "All Blood Donation Requests" : "My Donation Requests"}</h1>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          <select
            value={status}
            style={{ width: "auto", padding: "0.5rem 0.75rem" }}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
          {user?.role === "donor" && (
            <Link className="btn primary" to="/dashboard/create-donation-request">
              <PlusCircle size={15} /> New Request
            </Link>
          )}
        </div>
      </div>

      <p style={{ color: "var(--muted)", fontSize: "0.88rem", marginBottom: "1rem" }}>
        {state.total} request{state.total !== 1 ? "s" : ""} found
      </p>

      <RequestTable
        requests={state.items}
        refresh={() => load(state.page)}
        management
      />

      {state.pages > 1 && (
        <div className="pager">
          <button
            className="btn ghost"
            disabled={state.page <= 1}
            onClick={() => load(state.page - 1)}
          >
            ← Previous
          </button>
          <span>Page {state.page} of {state.pages}</span>
          <button
            className="btn ghost"
            disabled={state.page >= state.pages}
            onClick={() => load(state.page + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
