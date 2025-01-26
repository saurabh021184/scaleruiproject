import { NextApiRequest, NextApiResponse } from 'next';
import { ProductHandler } from '../../../handlers/product'; // Adjust path accordingly

const productHandler = new ProductHandler();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    // const { status, body } = await productHandler.getProductByID(req, id as string);
    // Call the handler and get the response
    const userId = req.headers['x-user-id'];
    // Validate and convert userId to a string or undefined
    const userIdString = typeof userId === 'string' ? userId : undefined;
    const { status, body }: { status: number; body: any } = await productHandler.getProductByID(req, Number(id), userIdString);

    return res.status(status).json(body);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
