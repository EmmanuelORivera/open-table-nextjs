import { User } from '@prisma/client'
import { AuthInputs } from './AuthInputs'
import { SelectedUser } from '@/interfaces/SelectedUser'

export interface UserService {
  createUser(inputs: AuthInputs): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
  findUserByEmailWithSelect(email: string): Promise<SelectedUser | null>
}
