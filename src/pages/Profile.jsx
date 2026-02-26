/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import AddAddressForm from "../components/AddAddressForm";
import api from "../utils/api";

function Profile() {
  const [addresses, setAddresses] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  const fetchAddresses = async () => {
    const { data } = await api.get("/api/v1/users/addresses", 
    );

    setAddresses(data.data);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const deleteAddress = async (id) => {
    await api.delete(`/api/v1/users/address/${id}`);
    fetchAddresses();
  };

  const setDefault = async (id) => {
    await api.patch(`/api/v1/users/address/${id}/default`);
    fetchAddresses();
  };

  return (
    <div max-w-4xl mx-auto p-8>
      <h2 className="text-2xl font-bold mb-6">My Addresses</h2>

      <button
        onClick={() => setFormOpen(!formOpen)}
        className="bg-black text-white px-4 py-2 rounded mb-6"
      >
        Add new address
      </button>

      {formOpen && (
        <AddAddressForm
          onSuccess={() => {
            fetchAddresses();
            setFormOpen(false);
          }}
        />
      )}

      {addresses.map((addr) => (
        <div key={addr._id} className="border p-4 rounded mb-4">
          <p className="font-semibold">{addr.fullName}</p>
          <p>
            {addr.street}, {addr.city}
          </p>
          <p>
            {addr.state} - {addr.pincode}
          </p>
          <p>{addr.phone}</p>

           {addr.isDefault && (
            <span className="text-green-600 text-sm font-medium">
              Default
            </span>
          )}

          <div>
            {!addr.isDefault && (
                <button
                  onClick={()=>setDefault(addr._id)}
                  className="text-blue-600"
                >
                    Make Default
                </button>
            )}

            <button
             onClick={()=>deleteAddress(addr._id)}
             className="text-red-600"
            >
                Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;
