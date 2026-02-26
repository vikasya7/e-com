
import api from "./api";

export const startPayment = async (addressId) => {
  try {
    // 1️⃣ create order from backend
   const { data } = await api.post(
  "/api/v1/orders/place-order",
  { addressId }
);

    // 2️⃣ Razorpay options (comes from docs)
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,

      name: "My Store",
      description: "Order Payment",

      handler: async function (response) {
        // 3️⃣ verify payment
        await api.post(
          "/api/payment/verify",
          response
        );

        alert("✅ Payment Successful");
        window.location.href = "/orders/success";
      },

      theme: {
        color: "#111827"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};
