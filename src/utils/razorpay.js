import api from "./api";
import toast from "react-hot-toast";

export const startPayment = async (addressId, navigate) => {
  try {
    // create db order
    const {data:orderRes}=await api.post("/api/v1/orders/place-order", {
      addressId,
      paymentMethod: "RAZORPAY",
    });
    
    const order = orderRes.data;

    // create razorpay order
    const { data: razorRes } = await api.post("/api/v1/payment/create", {
      orderId: order._id,
    });

    const razorpayOrder = razorRes.data;

    console.log("Frontend Key:", import.meta.env.VITE_RAZORPAY_KEY);
    console.log("Order ID:", razorpayOrder.id);

    // configure Razorpay
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,

      name: "Squirll Bites",
      description: "Taste the Crunch",

      handler: async function (response) {
        try {
          // verify payment
          const { data: verifyRes } = await api.post(
            "/api/v1/payment/verify",
            response,
          );
          toast.success("Payment Successful 🎉");

          // redirect to order success page
          navigate(`/order-success/${verifyRes.data._id}`);
        } catch (error) {
          console.log(error);

          toast.error("Payment verification failed ❌");
        }
      },
      theme: {
        color: "#6B3E26",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error(error);
    toast.error("Payment failed ❌");
  }
};
