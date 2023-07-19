import Hero from '@/components/Hero'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Hero title="Milestones Grill (Toronto)"></Hero>
      {children}
    </section>
  )
}

export default layout
