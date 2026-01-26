import React from 'react'
import { logoDarkBg, logoSloganWhiteBg } from '@/public/logos'
import Image from 'next/image'

const Logo = ({ variant = 'header' }: { variant?: 'footer' | 'header'}) => {
  const logoSrc = variant === 'header' ? logoDarkBg : logoSloganWhiteBg;
  const logoWidth = variant === 'header' ? 125 : 250;
  return (
    <a href="/">
      <Image src={logoSrc} alt="Logo" width={logoWidth} height={100} />
    </a>
  )
}

export default Logo