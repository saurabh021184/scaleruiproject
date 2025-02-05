// src/repositories/user.repository.ts
import prisma from '../prisma/prisma';
import { AddressDTO, RecommendationsDTO, ResetPasswordDTO } from '../dtos/user'; // Import the DTO

export class UserRepository {
  async findUserByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  async updateUserToken(username: string, token: string) {
    return prisma.user.update({
      where: { username },
      data: { token },
    });
  }

  async getAllUsers() {
    return prisma.user.findMany();
  }

  async validateSession(session: string): Promise<boolean> {
    // If session data is in a database, perform DB logic here.
    // For now, return true if session equals "authenticated".
    return session === 'authenticated';
  }
  
  public async findAddressByUserId(userId: number): Promise<AddressDTO | null> {
    try {
      // Fetch the address data from the database
      const address = await prisma.address.findUnique({
        where: {
          id: userId,
        },
      });
      // If the address is not found, return null
      if (!address) {
        return null;
      }

      // Map the fetched data to AddressDTO
      const addressDTO: AddressDTO = {
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
      };

      return addressDTO;
    } catch (error) {
      console.error('Error fetching address:', error);
      throw new Error('Database error');
    }
  }

  public async getRecommendationsByUserId(userId: number): Promise<RecommendationsDTO[] | null> {
    try {
      // Fetch the address data from the database
      const recommendations = userId
      ? await prisma.userSpecificProducts.findMany({
          where: { userId: Number(userId) },
          orderBy: { id: "asc" },
          take: 4,
        })
      : await prisma.mainProducts.findMany({
          orderBy: { id: "asc" },
          take: 4,
        });
      // If the address is not found, return null

      // If no recommendations are found, return an empty array
      if (!recommendations || recommendations.length === 0) {
        return null;
      }

      interface Recommendation {
        id: number;
        name: string;
        price: number;
      }
      
      const recommendationsDTO: RecommendationsDTO[] = recommendations.map((recommandation: Recommendation) => ({
        id: recommandation.id,
        name: recommandation.name,
        price: recommandation.price,
      }));

      return recommendationsDTO;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw new Error('Database error');
    }
  }

  public async resetPassword(resetPasswordDTO: ResetPasswordDTO) {
    try {
      // Check if the user exists
      const { username, password } = resetPasswordDTO;
      const user = await prisma.user.findUnique({
        where: { username },
      });
  
      if (!user) {
        throw new Error(`username not found`);
      }
  
      // Reset password (e.g., set to a temporary one or send an email)
      // const tempPassword = "temp1234"; // Example: Generate a temp password or token
      await prisma.user.update({
        where: { username },
        data: { password: password },
      });
  
      // Return success
      return ("Password reset successful. Use the temporary password to log in.");
    } catch (error) {
      console.error("Error resetting password:", error);
      throw new Error("Internal Server Error");
    }
  }
}