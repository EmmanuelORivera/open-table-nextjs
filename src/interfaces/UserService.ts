import { User } from '@prisma/client'
import { AuthInputs } from './AuthInputs'

export interface UserService {
  createUser(inputs: AuthInputs): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
}
