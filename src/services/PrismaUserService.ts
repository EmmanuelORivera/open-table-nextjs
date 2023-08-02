import { AuthInputs } from '@/interfaces/AuthInputs'
import { UserService } from '@/interfaces/UserService'
import { prisma } from './PrismaSingleton'
import { User } from '@prisma/client'

export class PrismaUserService implements UserService {
  async createUser(inputs: AuthInputs): Promise<User> {
    return prisma.user.create({
      data: {
        first_name: inputs.firstName,
        last_name: inputs.lastName,
        password: inputs.password,
        city: inputs.city,
        phone: inputs.phone,
        email: inputs.email,
      },
    })
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        email,
      },
    })
  }
}
