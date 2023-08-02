import { AuthInputs } from '@/interfaces/AuthInputs'
import { prisma } from './PrismaSingleton'

export class UserService {
  static async createUser(inputs: AuthInputs): Promise<any> {
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

  static async findUserByEmail(email: string): Promise<any> {
    return prisma.user.findFirst({
      where: {
        email,
      },
    })
  }
}
