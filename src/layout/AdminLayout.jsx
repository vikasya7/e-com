import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 space-y-6">

        <h2 className="text-2xl font-bold">Admin Panel</h2>

        <nav className="flex flex-col gap-3">

          <NavLink
            to="/admin/products"
            className="hover:bg-gray-800 p-2 rounded"
          >
            📦 Products
          </NavLink>

          <NavLink
            to="/admin/categories"
            className="hover:bg-gray-800 p-2 rounded"
          >
            🏷 Categories
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
