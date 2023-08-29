import { Action } from '@/types/Action'

export const renderContent = (
  action: Action,
  signinContent: string,
  signupContent: string
) => {
  return action === 'sign-in' ? signinContent : signupContent
}
