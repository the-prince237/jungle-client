import React from 'react'
import { logoDarkBg } from '@/public/logos'
import Image from 'next/image'

const Logo = () => {
  return (
    <a href="/">
      <Image src={logoDarkBg} alt="Logo" width={125} height={100} />
    </a>
  )
}

export default Logo