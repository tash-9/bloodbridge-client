import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { HeartPulse } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { bloodGroups } from "../data/locations";
import LocationFields from "../components/LocationFields";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ district: "", upazila: "", bloodGroup: "" });

  const change = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "district" ? { upazila: "" } : {}),
    }));

  const uploadAvatar = async (file) => {
    const key = import.meta.env.VITE_IMGBB_API_KEY;

    if (!file || !key || key === "replace-with-imgbb-key") {
      return "";
    }

    try {
      const body = new FormData();
      body.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${key}`,
        {
          method: "POST",
          body,
        }
      );

      if (!res.ok) {
        throw new Error("imgBB upload failed");
      }

      const json = await res.json();
      return json.data?.url || "";
    } catch (error) {
      console.error("Avatar upload failed:", error);
      return "";
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const raw = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(raw), ...form };
    if (data.password !== data.confirm_password) {
      return toast.error("Passwords do not match");
    }
    if (!form.bloodGroup) return toast.error("Please select a blood group");
    if (!form.district || !form.upazila) return toast.error("Please select your location");

    setLoading(true);
    try {
      let avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`;
      const avatarFile = raw.get("avatarFile");
      if (avatarFile && avatarFile.size > 0) {
        avatarUrl = await uploadAvatar(avatarFile);
      }
      data.avatar = avatarUrl;
      delete data.confirm_password;
      await register(data);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page" style={{ padding: "2rem 1rem" }}>
      <form onSubmit={submit} className="auth-card wide">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", color: "var(--red-dark)" }}>
          <HeartPulse size={28} />
          <span style={{ fontWeight: 900, fontSize: "1.3rem" }}>BloodBridge</span>
        </div>
        <h1>Join as a Donor</h1>
        <p className="sub">Create your free account and start saving lives</p>

        <div className="auth-grid">
          <label className="full">
            Full Name
            <input name="name" placeholder="Your full name" required />
          </label>
          <label className="full">
            Email Address
            <input name="email" type="email" placeholder="you@example.com" required />
          </label>
          <label className="full">
            Profile Avatar
            <input name="avatarFile" type="file" accept="image/*" />
          </label>
          <label>
            Blood Group
            <select
              value={form.bloodGroup}
              required
              onChange={(e) => change("bloodGroup", e.target.value)}
            >
              <option value="">Select blood group</option>
              {bloodGroups.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <div /> {/* spacer */}
          <LocationFields
            district={form.district}
            upazila={form.upazila}
            onChange={change}
            required
          />
          <label>
            Password
            <input name="password" type="password" placeholder="Min 6 characters" minLength={6} required />
          </label>
          <label>
            Confirm Password
            <input name="confirm_password" type="password" placeholder="Repeat password" required />
          </label>
          <div className="full">
            <button className="btn primary" disabled={loading} style={{ width: "100%" }}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </div>
        </div>

        <p className="link-row">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </main>
  );
}
