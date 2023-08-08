import { User } from '@prisma/client'

export type SelectedUser = Pick<
  User,
  'id' | 'first_name' | 'last_name' | 'email' | 'city' | 'phone'
>
