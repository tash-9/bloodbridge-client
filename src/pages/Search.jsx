import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { Search as SearchIcon, Download, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";
import LocationFields from "../components/LocationFields";
import { bloodGroups } from "../data/locations";

export default function Search() {
  const [form, setForm] = useState({ bloodGroup: "", district: "", upazila: "" });
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/users/search", { params: {} })
      .then(({ data }) => {
        setDonors(data);
        setSearched(true);
      });
  }, []);

  const change = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "district" ? { upazila: "" } : {}),
    }));

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.get("/users/search", { params: form });
      setDonors(data);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("BloodBridge – Donor Search Results", 14, 18);
    doc.setFontSize(11);
    doc.text(`Blood Group: ${form.bloodGroup} | District: ${form.district} | Upazila: ${form.upazila}`, 14, 28);
    doc.setLineWidth(0.3);
    doc.line(14, 32, 196, 32);
    doc.setFontSize(10);
    donors.forEach((d, i) => {
      const y = 40 + i * 10;
      if (y > 270) return;
      doc.text(`${i + 1}. ${d.name} — ${d.bloodGroup} — ${d.district}, ${d.upazila} — ${d.email}`, 14, y);
    });
    doc.save("bloodbridge-donor-search.pdf");
  };

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h1>Search Donors</h1>
          <p style={{ color: "var(--muted)", marginTop: "0.25rem" }}>
            Find available donors by blood group and location
          </p>
        </div>
      </div>

      <form onSubmit={search} className="search-form">
        <label>
          Blood Group
          <select value={form.bloodGroup} onChange={(e) => change("bloodGroup", e.target.value)}>
            <option value="">Select blood group</option>
            {bloodGroups.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
        <LocationFields
          district={form.district} upazila={form.upazila} onChange={change} />
        <button className="btn primary" disabled={loading}>
          <SearchIcon size={16} />
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {searched && !donors.length && (
        <div className="empty-state">
          <Droplets size={48} />
          <p>No donors found matching your search. Try a different location or blood group.</p>
        </div>
      )}

      {!!donors.length && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <p style={{ color: "var(--muted)", fontWeight: 600 }}>
              Found {donors.length} donor{donors.length !== 1 ? "s" : ""}
            </p>
            <button className="btn ghost" onClick={download}>
              <Download size={15} /> Download PDF
            </button>
          </div>

          <div className="donor-grid">
            {donors.map((d, i) => (
              <motion.article
                className="donor-card"
                key={d._id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <img src={d.avatar} alt={d.name} />
                <h3>{d.name}</h3>
                <span className="badge red" style={{ margin: "0.25rem auto" }}>{d.bloodGroup}</span>
                <p>{d.email}</p>
                <p>{d.district}, {d.upazila}</p>
              </motion.article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}