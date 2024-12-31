// src/repositories/user.repository.ts
import prisma from '../prisma/prisma';
import { AddressDTO } from '../dtos/user'; // Import the DTO

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
}