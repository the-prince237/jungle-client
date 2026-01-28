import React from 'react'
import { logoDarkBg, logoSloganWhiteBg } from '@/public/logos'
import Image from 'next/image'
import Link from 'next/link';

const Logo = ({ variant = 'header' }: { variant?: 'footer' | 'header'}) => {
  const logoSrc = variant === 'header' ? logoDarkBg : logoSloganWhiteBg;
  const logoWidth = variant === 'header' ? 125 : 250;
  return (
    <Link href="/">
      <Image src={logoSrc} alt="Logo" width={logoWidth} height={100} />
    </Link>
  )
}

export default Logo