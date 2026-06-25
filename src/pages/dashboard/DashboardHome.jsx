import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, HandCoins, Droplets } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { motion } from "framer-motion";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import RequestTable from "../../components/RequestTable";

const STATUS_COLORS = {
  pending: "#c7852f",
  inprogress: "#0d7490",
  done: "#16a34a",
  canceled: "#94a3b8",
};

export default function DashboardHome() {
  const { user } = useAuth();
  const [recent, setRecent] = useState([]);
  const [stats, setStats] = useState(null);

  const loadRecent = () =>
    api.get("/requests", { params: { mine: true, limit: 3 } })
      .then(({ data }) => setRecent(data.items));

  useEffect(() => {
    if (user.role === "donor") {
      loadRecent();
    } else {
      api.get("/stats").then(({ data }) => setStats(data));
    }
  }, [user.role]);

  return (
    <div>
      <motion.div
        className="welcome-banner"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Welcome, {user.name} 👋</h1>
        <p>
          {user.role === "donor"
            ? "Manage your donation requests and profile from here."
            : user.role === "volunteer"
            ? "You can view and manage all blood donation requests."
            : "You have full admin access to the platform."}
        </p>
      </motion.div>

      {/* ── Admin & Volunteer: Stats + Chart ── */}
      {user.role !== "donor" && stats && (
        <>
          <div className="stat-cards">
            <div className="stat-card">
              <div className="stat-icon red"><Users size={22} /></div>
              <div>
                <strong>{stats.donors}</strong>
                <span>Total Donors</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon gold"><HandCoins size={22} /></div>
              <div>
                <strong>${stats.funding.toFixed(2)}</strong>
                <span>Total Funding</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon teal"><Droplets size={22} /></div>
              <div>
                <strong>{stats.requests}</strong>
                <span>Donation Requests</span>
              </div>
            </div>
          </div>

          <div className="chart-panel">
            <h2>Donation Requests by Status</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats.chart} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="status" tick={{ fontSize: 13, fontWeight: 600 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.88rem" }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {stats.chart.map((entry) => (
                    <Cell key={entry.status} fill={STATUS_COLORS[entry.status] || "#c0253a"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* ── Donor: Recent requests ── */}
      {user.role === "donor" && !!recent.length && (
        <div>
          <div className="section-head">
            <h1>Recent Donation Requests</h1>
          </div>
          <RequestTable requests={recent} refresh={loadRecent} management />
          <div style={{ marginTop: "1rem" }}>
            <Link className="btn ghost" to="/dashboard/my-donation-requests">
              View all my requests →
            </Link>
          </div>
        </div>
      )}

      {user.role === "donor" && !recent.length && (
        <div className="empty-state">
          <Droplets size={48} />
          <p>You haven't made any donation requests yet.</p>
          <Link className="btn primary" to="/dashboard/create-donation-request">
            Create a request
          </Link>
        </div>
      )}
    </div>
  );
}
