import Hero from '@/components/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Restaurant',
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Hero title="Milestones Grill (Toronto)"></Hero>
      {children}
    </section>
  )
}

export default layout
