import { Contacts, HomeHero } from '@/presentation'

export default function HomePage() {
  // const properties = await getPropertiesAction({ status: 'active' })

  return (
    <div className="mx-auto overflow-x-hidden flex flex-col gap-20">
      <HomeHero />
      <Contacts />
    </div>
  )
}