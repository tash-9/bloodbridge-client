import { Link, NavLink, useLocation } from "react-router-dom";
import { HeartPulse, LogOut, User } from "lucide-react";
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
        
        {user && (
          <>
            <NavLink to="/funding">Funding</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </>
        )}

        {!user && !isAuthPage && (
          <Link to="/login" className="btn primary" style={{ marginLeft: "0.5rem" }}>
            Login
          </Link>
        )}

        {user && (
          <div className="avatar-menu">
            <div className="avatar-trigger">
              <img className="avatar-img" src={user.avatar} alt={user.name} />
              <span>{user.name.split(" ")[0]}</span>
            </div>
            <div className="dropdown-menu">
              <Link to="/dashboard"><User size={15} /> Dashboard</Link>  {/* add this */}
              <Link to="/dashboard/profile"><User size={15} /> Profile</Link>
              <div className="separator" />
              <button onClick={logout}><LogOut size={15} /> Logout</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}