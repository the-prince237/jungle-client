import { HomeHero } from '@/presentation'

export default function HomePage() {
  // const properties = await getPropertiesAction({ status: 'active' })

  return (
    <div className="mx-auto overflow-x-hidden flex flex-col gap-20 lg:gap-50 pb-8">
      <HomeHero />
    </div>
  )
}