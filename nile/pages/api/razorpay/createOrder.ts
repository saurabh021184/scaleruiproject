// /pages/api/razorpay/createOrder.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { amount, currency, receipt } = req.body;

  // Skipping Razorpay API call and mocking the response for testing
  try {
    // Mocking a successful order creation response
    const mockOrderResponse = {
      id: "order_xyz_123",
      amount,
      currency,
      receipt,
      status: "created",
      created_at: new Date().toISOString(),
    };

    // Return the mocked order response as if it came from Razorpay
    res.status(200).json(mockOrderResponse);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
}
