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
import CountUp from "react-countup";

const STATUS_COLORS = {
  pending: "#c7852f",
  inprogress: "#0d7490",
  done: "#16a34a",
  canceled: "#94a3b8",
};

const valueStyle = { fontSize: "2.5rem", fontWeight: 900, color: "#1a2332", display: "block", lineHeight: 1.1 };
const labelStyle = { fontSize: "1rem", fontWeight: 600, color: "#64748b", marginTop: "0.3rem", display: "block" };

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

      {user.role !== "donor" && stats && (
        </*Stats*/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "1.5rem" }}>
          {[
            { Icon: Users, value: stats.donors, suffix: "", label: "Total Donors", color: "#e53e3e" },
            { Icon: HandCoins, value: stats.funding, suffix: "", decimals: 2, prefix: "Tk ", label: "Total Funding", color: "#b45309" },
            { Icon: Droplets, value: stats.requests, suffix: "", label: "Donation Requests", color: "#0d7490" },
          ].map(({ Icon, value, suffix, decimals, prefix, label, color }) => (
            <div
              key={label}
              style={{
                background: "var(--paper)",
                border: "1px solid #3d4561",
                borderRadius: 16,
                padding: "2rem",
                textAlign: "center",
                transition: "all 0.2s",
                cursor: "default",
                boxShadow: "var(--shadow-sm)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#3d4561";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 12,
                background: `${color}22`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.25rem",
              }}>
                <Icon size={26} style={{ color }} />
              </div>
              <h3 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--ink)", margin: 0 }}>
                {prefix}
                <CountUp end={value} duration={2} separator="," suffix={suffix} decimals={decimals || 0} enableScrollSpy scrollSpyDelay={100} />
              </h3>
              <p style={{ color: "var(--muted)", marginTop: "0.5rem", fontSize: "0.9rem", fontWeight: 600 }}>
                {label}
              </p>
            </div>
          ))}
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