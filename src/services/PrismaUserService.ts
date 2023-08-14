import { AuthInputs } from '@/interfaces/AuthInputs'
import { UserService } from '@/interfaces/UserService'
import { prisma } from './PrismaSingleton'
import { User } from '@prisma/client'
import { SelectedUser } from '@/interfaces/SelectedUser'

export class PrismaUserService implements UserService {
  async createUser(inputs: AuthInputs): Promise<User> {
    return prisma.user.create({
      data: {
        first_name: inputs.first_name,
        last_name: inputs.last_name,
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

  async findUserByEmailWithSelect(email: string): Promise<SelectedUser | null> {
    return prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        city: true,
        phone: true,
      },
    })
  }
}
