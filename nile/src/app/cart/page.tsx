"use client";
import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation"; // Use this to access the URL query params
import Header from "@/components/Header";

declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }

  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    handler: (response: RazorpayResponse) => void;
  }

  interface RazorpayInstance {
    open(): void;
    close(): void;
  }

  interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
}

const CartPage = () => {
  const [cartData, setCartData] = useState({
    productId: "N/A",
    productName: "Unnamed Product",
    price: 0,
    quantity: 1,
    totalPrice: 0,
  });

  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

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

    // Extract query params only when the component is mounted (client-side)
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get("productId") || "N/A";
    const productName = searchParams.get("productName") || "Unnamed Product";
    const price = searchParams.get("price") || "0";
    const quantity = searchParams.get("quantity") || "1";

    // Safely parse numeric values
    const parsedPrice = parseFloat(price) || 0;
    const parsedQuantity = parseInt(quantity, 10) || 1;
    const totalPrice = parsedPrice * parsedQuantity;

    setCartData({
      productId,
      productName,
      price: parsedPrice,
      quantity: parsedQuantity,
      totalPrice,
    });
  }, []);

  const handleCheckout = async () => {
    if (!isRazorpayLoaded) {
      console.error("Razorpay script not loaded yet.");
      return;
    }

    // Call your backend to create the order
    const response = await fetch("/api/razorpay/createOrder", {
      method: "POST",
      body: JSON.stringify({ amount: cartData.totalPrice, currency: "INR", receipt: "order_rcptid_11" }),
      headers: { "Content-Type": "application/json" },
    });

    const order = await response.json();

    if (order.status === "created") {
      const options = {
        key: "your_razorpay_key_id", // Replace with your Razorpay key ID
        amount: order.amount, // Amount in paise
        currency: order.currency,
        name: "Your Company",
        description: `Payment for ${cartData.productName}`,
        order_id: order.id,
        handler: (response: RazorpayResponse) => {
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
        <div className="flex flex-col gap-4 mb-6">
          <p><strong>Product ID:</strong> {cartData.productId}</p>
          <p><strong>Product Name:</strong> {cartData.productName}</p>
          <p><strong>Price per Unit:</strong> ₹{cartData.price.toFixed(2)}</p>
          <p><strong>Quantity:</strong> {cartData.quantity}</p>
          <p className="font-semibold"><strong>Total Price:</strong> ₹{cartData.totalPrice.toFixed(2)}</p>
        </div>
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
