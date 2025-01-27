"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Razorpay from "razorpay";

declare global {
    interface Window {
      Razorpay: any; // You can also define a more specific type if needed, but this is a simple approach.
    }
  }

const CartPage = () => {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const router = useRouter();

  // Dynamically load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setIsRazorpayLoaded(true); // Set state to true once the script is loaded
      script.onerror = () => console.error("Failed to load Razorpay script");
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handleCheckout = async () => {
    if (!isRazorpayLoaded) {
      console.error("Razorpay script not loaded yet.");
      return;
    }

    // Call your backend to create the order
    const response = await fetch("/api/razorpay/createOrder", {
      method: "POST",
      body: JSON.stringify({ amount: 500, currency: "INR", receipt: "order_rcptid_11" }),
      headers: { "Content-Type": "application/json" },
    });

    const order = await response.json();

    if (order.status === "created") {
      const options = {
        key: "your_razorpay_key_id", // Replace with your Razorpay key ID
        amount: order.amount, // Amount in paise
        currency: order.currency,
        name: "Your Company",
        description: "Payment for your order",
        order_id: order.id,
        handler: (response: any) => {
          alert("Payment successful: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options); // Razorpay instance
      rzp.open(); // Open Razorpay checkout
    }
  };

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Cart</h1>
        {/* Display your cart items here */}
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Proceed to Checkout
        </button>
      </main>
    </div>
  );
};

export default CartPage;
