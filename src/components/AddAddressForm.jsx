
import React from "react";
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
    makeDefault: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/api/v1/users/address", form);
    onSuccess();
  };

  return (
    <form
       onSubmit={handleSubmit}
       className="border p-4 mb-6 rounded"
    >
      {Object.keys(form).map(
        (key) =>
          key !== "makeDefault" && (
            <input
              key={key}
              type="text"
              placeholder={key}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="border p-2 w-full mb-3"
            />
          ),
      )}

      <label>
        <input
          type="checkbox"
          checked={form.makeDefault}
          onChange={(e) => setForm({ ...form, makeDefault: e.target.checked })}
        />
        Set as default
      </label>

      <button type="submit" className="bg-black text-white px-4 py-2 rounded"
      
      >
        Save Address
      </button>
    </form>
  );
}

export default AddAddressForm;
