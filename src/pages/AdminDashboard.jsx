import { useEffect, useState } from "react";
import useAuth from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";



export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [email, setEmail] = useState("");
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingPromote, setLoadingPromote] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/v1/admin/stats");
        setStats(res.data); // assuming ApiResponse
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const promoteAdmin = async () => {
    if (!email) {
      setMessage("Please enter an email");
      return;
    }

    try {
      setLoadingPromote(true);
      setMessage("");
      const res = await api.patch("/api/v1/admin/promote", { email });
      setMessage(res.data.message || "User promoted successfully");
      setEmail("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred");
    } finally {
      setLoadingPromote(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8EE] p-10">
      
      <h1 className="text-4xl font-semibold text-[#6B3E26] mb-12">
        Admin Dashboard
      </h1>

      {/* 📊 Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        <Card title="Total Products" value={loadingStats ? "..." : stats.totalProducts || 0} />
        <Card title="Total Orders" value={loadingStats ? "..." : stats.totalOrders || 0} />
        <Card title="Total Stock" value={loadingStats ? "..." : stats.totalStock || 0} />
        <Card title="Total Revenue" value={loadingStats ? "..." : `₹${stats.revenue || 0}`} />
      </div>

      {/* 👑 Promote Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f1e7dc] max-w-xl">
        
        <h2 className="text-xl font-semibold text-[#6B3E26] mb-6">
          Promote User to Admin
        </h2>

        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#e5d5c4] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#C48A3A]"
          />

          <button
            onClick={promoteAdmin}
            disabled={loadingPromote}
            className="bg-[#6B3E26] text-white px-6 py-3 rounded-full hover:bg-[#5a341f] transition disabled:opacity-50"
          >
            {loadingPromote ? "Promoting..." : "Promote"}
          </button>
        </div>

        {message && (
          <p className="mt-4 text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}


function Card({ title, value }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f1e7dc]">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <h2 className="text-3xl font-semibold text-[#6B3E26]">{value}</h2>
    </div>
  );
}

