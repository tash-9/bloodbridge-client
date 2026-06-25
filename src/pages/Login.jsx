import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { HeartPulse } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from || "/dashboard";
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(Object.fromEntries(new FormData(e.currentTarget)));
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form onSubmit={submit} className="auth-card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", color: "var(--red-dark)" }}>
          <HeartPulse size={28} />
          <span style={{ fontWeight: 900, fontSize: "1.3rem" }}>BloodBridge</span>
        </div>
        <h1>Welcome back</h1>
        <p className="sub">Sign in to your donor account</p>

        <div style={{ display: "grid", gap: "1rem" }}>
          <label>
            Email address
            <input name="email" type="email" placeholder="you@example.com" required autoFocus />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="••••••••" required />
          </label>
          <div className="form-footer">
            <button className="btn primary" disabled={loading}>
              {loading ? "Signing in…" : "Login"}
            </button>
          </div>
        </div>

        <p className="link-row">
          New to BloodBridge?{" "}
          <Link to="/register">Create an account</Link>
        </p>
      </form>
    </main>
  );
}
