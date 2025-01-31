import prisma from '../prisma/prisma';
import { ProductDetailDTO } from '../dtos/product';

export class ProductRepository {
  async getMainProduct(id: number): Promise<ProductDetailDTO | null> {
    return await prisma.mainProducts.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true
      }
    });
  }

  async getUserSpecificProduct(userId: string, id: number): Promise<ProductDetailDTO | null> {
    return await prisma.userSpecificProducts.findFirst({
      where: {
        userId: parseInt(userId),
        id
      },
      select: {
        id: true,
        name: true,
        price: true
      }
    });
  }
}
