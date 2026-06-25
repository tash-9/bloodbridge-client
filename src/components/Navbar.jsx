import { Link, NavLink, useLocation } from "react-router-dom";
import { HeartPulse, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="topbar">
      <Link to="/" className="brand">
        <HeartPulse size={26} />
        BloodBridge
      </Link>

      <nav>
        <NavLink to="/donation-requests">Donation Requests</NavLink>
        {user && <NavLink to="/funding">Funding</NavLink>}

        {!user && !isAuthPage ? (
          <Link to="/login" className="btn primary" style={{ marginLeft: "0.5rem" }}>
            Login
          </Link>
        ) : user ? (
          <div className="avatar-menu">
            <div className="avatar-trigger">
              <img className="avatar-img" src={user.avatar} alt={user.name} />
              <span>{user.name.split(" ")[0]}</span>
            </div>
            <div className="dropdown-menu">
              <Link to="/dashboard">
                <LayoutDashboard size={15} /> Dashboard
              </Link>
              <div className="separator" />
              <button onClick={logout}>
                <LogOut size={15} /> Logout
              </button>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}