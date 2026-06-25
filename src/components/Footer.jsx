import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            <HeartPulse size={22} />
            BloodBridge
          </div>
          <p>
            Connecting urgent blood needs with ready donors across Bangladesh.
            Every drop matters — be a hero today.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/donation-requests">Open Requests</Link>
            <Link to="/search">Search Donors</Link>
            <Link to="/funding">Funding</Link>
          </div>
        </div>

        <div>
          <h4>Account</h4>
          <div className="footer-links">
            <Link to="/register">Join as Donor</Link>
            <Link to="/login">Login</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span style={{ flex: 1, textAlign: "center" }}>© {new Date().getFullYear()} BloodBridge. All rights reserved.</span>
        <div className="social-links">
          {/* X (formerly Twitter) logo */}
          <a href="#" aria-label="X">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
