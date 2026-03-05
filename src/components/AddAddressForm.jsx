import { useState } from "react";
import api from "../utils/api";

function AddAddressForm({ onSuccess }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    landmark: "",
    isDefault: false,
  });

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const handleSendOtp = async () => {
    try {
      await api.post("/api/v1/otp/send-otp", {
        phone: form.phone,
      });
      setOtpSent(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await api.post("/api/v1/otp/verify-otp", {
        phone: form.phone,
        otp,
      });
      setPhoneVerified(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneVerified) {
      alert("Please verify your phone number first");
      return;
    }

    setLoading(true);
    setLoading(true);

    try {
      await api.post("/api/v1/users/address", form);
      onSuccess();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="input-style"
          required
        />

        <div className="flex gap-3">
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="input-style flex-1"
            required
          />

          {!phoneVerified && (
            <button
              type="button"
              onClick={handleSendOtp}
              className="bg-black text-white px-4 rounded-md"
            >
              Send OTP
            </button>
          )}

          {phoneVerified && (
            <span className="text-green-600 font-semibold">Verified ✓</span>
          )}
        </div>

        {otpSent && !phoneVerified && (
          <div className="flex gap-3">
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-style flex-1"
            />

            <button
              type="button"
              onClick={handleVerifyOtp}
              className="bg-black text-white px-4 rounded-md"
            >
              Verify
            </button>
          </div>
        )}

        <input
          name="street"
          placeholder="Street Address"
          value={form.street}
          onChange={handleChange}
          className="input-style md:col-span-2"
          required
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="input-style"
          required
        />

        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="input-style"
          required
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          className="input-style"
          required
        />

        <input
          name="landmark"
          placeholder="Landmark (Optional)"
          value={form.landmark}
          onChange={handleChange}
          className="input-style md:col-span-2"
        />
      </div>

      {/* DEFAULT CHECKBOX */}
      <label className="flex items-center gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          name="isDefault"
          checked={form.isDefault}
          onChange={handleChange}
          className="accent-black"
        />
        Set as default address
      </label>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading || !phoneVerified}
        className="w-full bg-black text-white py-4 rounded-full font-semibold hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Address"}
      </button>
    </form>
  );
}

export default AddAddressForm;
