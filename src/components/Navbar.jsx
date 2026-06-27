import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HeartPulse, LogOut, User, LayoutDashboard, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand" onClick={close}>
          <HeartPulse size={26} />
          BloodBridge
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/donation-requests">Donation Requests</NavLink>
          <NavLink to="/search">Search Donors</NavLink>
          {user && <NavLink to="/funding">Funding</NavLink>}

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
                <Link to="/dashboard"><LayoutDashboard size={15} /> Dashboard</Link>
                <Link to="/dashboard/profile"><User size={15} /> Profile</Link>
                <div className="separator" />
                <button onClick={logout}><LogOut size={15} /> Logout</button>
              </div>
            </div>
          )}
        </nav>

        {/* Hamburger button */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <div className="mobile-overlay" onClick={close} />
          <div className="mobile-drawer">
            {user && (
              <div className="drawer-profile">
                <img src={user.avatar} alt={user.name} />
                <div>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
              </div>
            )}

            <NavLink to="/" onClick={close}>Home</NavLink>
            <NavLink to="/donation-requests" onClick={close}>Donation Requests</NavLink>
            <NavLink to="/search" onClick={close}>Search Donors</NavLink>
            {user && <NavLink to="/funding" onClick={close}>Funding</NavLink>}
            {user && <NavLink to="/dashboard" onClick={close}>Dashboard</NavLink>}
            {user && <NavLink to="/dashboard/profile" onClick={close}>Profile</NavLink>}

            <div className="drawer-bottom">
              {!user ? (
                <Link
                  to="/login"
                  className="btn primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={close}
                >
                  Login
                </Link>
              ) : (
                <button
                  className="btn danger"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => { logout(); close(); }}
                >
                  <LogOut size={15} /> Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}