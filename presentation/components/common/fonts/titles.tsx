import { cn } from '@/lib/utils'
import React from 'react'

type TitleProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export const Title1 = ({className, ...props}: TitleProps) => {
  return (
    <h1 className={cn('text-2xl lg:text-4xl font-black', className)} {...props} />
  )
}

