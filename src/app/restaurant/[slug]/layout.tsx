import Hero from '@/components/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Restaurant',
}

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) => {
  return (
    <section>
      <Hero title={params.slug}></Hero>
      {children}
    </section>
  )
}

export default layout
