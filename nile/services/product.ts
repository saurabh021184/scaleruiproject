import { ProductRepository } from '../repositories/product';
import { ProductDetailDTO } from '../dtos/product';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProductByID(userId: string | null, id: number): Promise<ProductDetailDTO | null> {
    if (userId) {
      // If user is logged in, fetch from user-specific table
      return await this.productRepository.getUserSpecificProduct(userId, id);
    }
    
    // Otherwise, fetch from main products table
    return await this.productRepository.getMainProduct(id);
  }
}
