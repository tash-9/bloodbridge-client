import { NavLink, Outlet } from "react-router-dom";
import {
  Home, User, PlusCircle, ClipboardList, Users, LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardLayout() {
  const { user } = useAuth();

  const links = [
    { to: "/dashboard", label: "Home", icon: Home, end: true, roles: ["donor", "admin", "volunteer"] },
    { to: "/dashboard/profile", label: "Profile", icon: User, roles: ["donor", "admin", "volunteer"] },
    { to: "/dashboard/my-donation-requests", label: "My Requests", icon: ClipboardList, roles: ["donor"] },
    { to: "/dashboard/create-donation-request", label: "Create Request", icon: PlusCircle, roles: ["donor", "volunteer"] },
    { to: "/dashboard/all-users", label: "All Users", icon: Users, roles: ["admin"] },
    { to: "/dashboard/all-blood-donation-request", label: "All Requests", icon: LayoutDashboard, roles: ["admin", "volunteer"] },
  ].filter((l) => l.roles.includes(user.role));

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <div className="sidebar-profile">
          <img src={user.avatar} alt={user.name} />
          <div>
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </div>
        </div>
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end}>
            <Icon size={17} /> {label}
          </NavLink>
        ))}
      </aside>
      <section className="dash-content">
        <Outlet />
      </section>
    </div>
  );
}
