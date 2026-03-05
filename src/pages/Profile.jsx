/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import {  AnimatePresence } from "framer-motion";
import AddAddressForm from "../components/AddAddressForm";
import api from "../utils/api";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
function Profile() {
  const [addresses, setAddresses] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  const fetchAddresses = async () => {
    const { data } = await api.get("/api/v1/users/addresses");
    setAddresses(data.data);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const deleteAddress = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmDelete) return;

    await api.delete(`/api/v1/users/address/${id}`);
    fetchAddresses();
  };

  const setDefault = async (id) => {
    await api.patch(`/api/v1/users/address/${id}/default`);
    fetchAddresses();
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            My Addresses
          </h2>

          <button
            onClick={() => setFormOpen(!formOpen)}
            className="px-6 py-3 rounded-full bg-black text-white hover:scale-[1.03] active:scale-[0.97] transition"
          >
            {formOpen ? "Cancel" : "+ Add New Address"}
          </button>
        </div>

        {/* ADDRESS FORM */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-10 rounded-3xl shadow-lg mb-14"
            >
              <AddAddressForm
                onSuccess={() => {
                  fetchAddresses();
                  setFormOpen(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* EMPTY STATE */}
        {addresses.length === 0 && !formOpen && (
          <div className="bg-white p-12 rounded-3xl shadow-md text-center">
            <p className="text-gray-600 mb-6 text-lg">
              You haven’t added any address yet.
            </p>
            <button
              onClick={() => setFormOpen(true)}
              className="bg-black text-white px-6 py-3 rounded-full"
            >
              Add Address
            </button>
          </div>
        )}

        {/* ADDRESS LIST */}
        <div className="space-y-6">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-lg text-gray-900">
                    {addr.fullName}
                  </p>

                  <p className="text-gray-600 text-sm mt-1">
                    {addr.street}, {addr.city}
                  </p>

                  <p className="text-gray-600 text-sm">
                    {addr.state} - {addr.pincode}
                  </p>

                  <p className="text-gray-600 text-sm">
                    {addr.phone}
                  </p>

                  {addr.isDefault && (
                    <span className="inline-block mt-3 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      Default Address
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-3 text-sm">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefault(addr._id)}
                      className="text-blue-600 hover:underline"
                    >
                      Make Default
                    </button>
                  )}

                  <button
                    onClick={() => deleteAddress(addr._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;