import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Droplets, MapPin, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function PublicRequests() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/requests/public")
      .then(({ data }) => setItems(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h1>Blood Donation Requests</h1>
          <p style={{ color: "var(--muted)", marginTop: "0.25rem" }}>
            All pending requests that need your help
          </p>
        </div>
        <Link className="btn primary" to="/register">
          Join as Donor
        </Link>
      </div>

      {!loading && !items.length && (
        <div className="empty-state">
          <Droplets size={48} />
          <p>No pending donation requests at the moment.</p>
        </div>
      )}

      <div className="request-grid">
        {items.map((item, i) => (
          <motion.article
            className="request-card"
            key={item._id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="badge red" style={{ fontSize: "1rem", padding: "0.4rem 1rem" }}>
              {item.bloodGroup}
            </span>
            <h3>{item.recipientName}</h3>
            <p><MapPin size={13} /> {item.recipientDistrict}, {item.recipientUpazila}</p>
            <p><Calendar size={13} /> {item.donationDate}</p>
            <p><Clock size={13} /> {item.donationTime}</p>
            <div className="card-actions" style={{ marginTop: "auto", paddingTop: "0.75rem" }}>
              <Link className="btn ghost" to={`/requests/${item._id}`} style={{ width: "100%", justifyContent: "center" }}>
                View Details
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </main>
  );
}
