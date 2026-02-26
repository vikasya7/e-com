
import { useEffect, useState } from "react";
import api from "../utils/api";



export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    expiresAt: "",
  });

  const fetchCoupons=async()=>{
    const res = await api.get("/api/v1/coupons");
    setCoupons(res.data.data)
  }

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCoupons()
  },[])

  const handleCreate=async()=>{
    await api.post("/api/v1/coupons/create", form);
    setForm({
        code: "",
      discountType: "percentage",
      discountValue: "",
      minOrderAmount: "",
      expiresAt: ""
    });
    fetchCoupons()
  }

  const toggleStatus=async(id)=>{
    await api.patch(`/api/v1/coupons/toggle/${id}`);
    fetchCoupons()
  }

  const deleteCoupon=async(id)=>{
    await api.delete(`/api/v1/coupons/${id}`);
    fetchCoupons()
  }

  return (
      <div className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">Coupon Management</h1>

      {/* Create Coupon Form */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10 space-y-4">
        <h2 className="text-xl font-semibold">Create Coupon</h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            placeholder="Code"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="border p-3 rounded"
          />

          <select
            value={form.discountType}
            onChange={(e) => setForm({ ...form, discountType: e.target.value })}
            className="border p-3 rounded"
          >
            <option value="percentage">Percentage</option>
            <option value="flat">Flat</option>
          </select>

          <input
            type="number"
            placeholder="Discount Value"
            value={form.discountValue}
            onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
            className="border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Min Order Amount"
            value={form.minOrderAmount}
            onChange={(e) => setForm({ ...form, minOrderAmount: e.target.value })}
            className="border p-3 rounded"
          />

          <input
            type="date"
            value={form.expiresAt}
            onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
            className="border p-3 rounded"
          />

        </div>

        <button
          onClick={handleCreate}
          className="bg-black text-white px-6 py-3 rounded mt-4"
        >
          Create Coupon
        </button>
      </div>

      {/* Coupon Table */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-semibold mb-4">All Coupons</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Min Order</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((c) => (
              <tr key={c._id} className="border-b">
                <td>{c.code}</td>
                <td>{c.discountType}</td>
                <td>{c.discountValue}</td>
                <td>₹{c.minOrderAmount}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    c.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {c.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => toggleStatus(c._id)}
                    className="text-blue-600"
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() => deleteCoupon(c._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  )
}
