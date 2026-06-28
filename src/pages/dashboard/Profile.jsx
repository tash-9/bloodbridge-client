import { useState } from "react";
import { Pencil, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import { bloodGroups } from "../../data/locations";
import LocationFields from "../../components/LocationFields";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState({ ...user });
  const [loading, setLoading] = useState(false);

  const change = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "district" ? { upazila: "" } : {}),
    }));

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.patch("/users/profile", {
        name: form.name,
        avatar: form.avatar,
        bloodGroup: form.bloodGroup,
        district: form.district,
        upazila: form.upazila,
      });
      setUser(data);
      setForm(data);
      setEditable(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const cancel = () => {
    setForm({ ...user });
    setEditable(false);
  };

  return (
    <div>
      <form onSubmit={save} className="panel">
        <div className="section-head">
          <h1>My Profile</h1>
          {!editable ? (
            <button type="button" className="btn ghost" onClick={() => setEditable(true)}>
              <Pencil size={15} /> Edit Profile
            </button>
          ) : (
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <button type="button" className="btn ghost" onClick={cancel}>Cancel</button>
              <button className="btn primary" disabled={loading}>
                <Save size={15} /> {loading ? "Saving…" : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        {/* Avatar preview */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.5rem 0", borderBottom: "1px solid var(--line)", marginBottom: "1.5rem" }}>
          <img
            src={form.avatar}
            alt={form.name}
            style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--red-mid)" }}
          />
          <div>
            <strong style={{ fontSize: "1.15rem" }}>{user.name}</strong>
            <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{user.email}</div>
            <span className={`badge ${user.role}`} style={{ marginTop: "0.4rem" }}>{user.role}</span>
          </div>
        </div>

        <div className="form-grid">
          <label>
            Full Name
            <input
              disabled={!editable}
              value={form.name}
              onChange={(e) => change("name", e.target.value)}
              required={editable}
            />
          </label>
          <label>
            Email Address
            <input disabled value={form.email} />
          </label>
          <div className="full" style={{ display: "grid", gap: "0.5rem" }}>
                      <label>
                        Avatar URL
                        <input
                          disabled={!editable}
                          value={form.avatar}
                          onChange={(e) => change("avatar", e.target.value)}
                          placeholder="https://..."
                        />
                      </label>

                      {editable && (
                        <label>
                          Upload New Avatar
                        <input type="file" accept="image/*" onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const key = import.meta.env.VITE_IMGBB_API_KEY;
                            if (!key) return toast.error("ImgBB key not configured");
                            const body = new FormData();
                            body.append("image", file);
                            try {
                              const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
                              const json = await res.json();
                              if (json.data?.url) {
                                change("avatar", json.data.url);
                                toast.success("Image uploaded!");
                              } else {
                                toast.error("Upload failed");
                              }
                            } catch {
                              toast.error("Upload failed");
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
          <label>
            Blood Group
            <select
              disabled={!editable}
              value={form.bloodGroup}
              onChange={(e) => change("bloodGroup", e.target.value)}
            >
              {bloodGroups.map((b) => <option key={b}>{b}</option>)}
            </select>
          </label>
          <div /> {/* spacer */}
          <LocationFields
            disabled={!editable}
            district={form.district}
            upazila={form.upazila}
            onChange={change}
          />
        </div>
      </form>
    </div>
  );
}
