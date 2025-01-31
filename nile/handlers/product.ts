import { NextApiRequest, NextApiResponse } from 'next';
import { ProductService } from '../services/product';
import { ProductDetailDTO } from '../dtos/product';

export class ProductHandler {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async getProductByID(req: NextApiRequest, id: number, userId?: string): Promise<{ status: number; body: any }> { 
    try {
      let product: ProductDetailDTO | null;
      product = await this.productService.getProductByID(userId ?? null, id);

      if (!product) {
        return { status: 404, body: { message: 'Product not found' } };
      }

      return { status: 200, body: product };
    } catch (error) {
      console.error('Error fetching product:', error);
      return { status: 500, body: { message: 'Internal Server Error' } };
    }
  }
}
