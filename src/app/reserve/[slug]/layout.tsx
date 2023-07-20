import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reserve at Milestones Grill (Toronto)',
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return <section>{children}</section>
}

export default layout
