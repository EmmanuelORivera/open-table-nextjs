import { Action } from '@/components/AuthModal'

export const renderContent = (
  action: Action,
  signinContent: string,
  signupContent: string
) => {
  return action === 'sign-in' ? signinContent : signupContent
}
