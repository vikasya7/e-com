import { NavLink, Outlet, Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";


export default function AdminLayout() {

  const { user, loading } = useAuth();

  // ⏳ Wait until auth finishes loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // 🔐 After loading, check role
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          <NavLink to="/admin" end className="p-3 rounded hover:bg-gray-800">
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/products" className="p-3 rounded hover:bg-gray-800">
            📦 Products
          </NavLink>

          <NavLink to="/admin/categories" className="p-3 rounded hover:bg-gray-800">
            🏷 Categories
          </NavLink>

          <NavLink to="/admin/coupons" className="p-3 rounded hover:bg-gray-800">
            🎟 Coupons
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}



/* 🔥 Reusable NavItem with active styling */
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      end={to === "/admin"}
      className={({ isActive }) =>
        `p-3 rounded-lg transition ${
          isActive
            ? "bg-indigo-600 text-white"
            : "hover:bg-gray-800 text-gray-300"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

