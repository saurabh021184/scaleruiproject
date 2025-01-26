import { NextApiRequest, NextApiResponse } from 'next';
import { ProductHandler } from '../../../handlers/product'; // Adjust path accordingly

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  // Add other properties as needed
}

const productHandler = new ProductHandler();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Validate the product ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    // Extract and validate userId from the request headers
    const userId = req.headers['x-user-id'];
    const userIdString = typeof userId === 'string' ? userId : undefined;

    // Get the product data using the handler
    const { status, body }: { status: number; body: Product } = await productHandler.getProductByID(req, Number(id), userIdString);

    // Return the response
    return res.status(status).json(body);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
