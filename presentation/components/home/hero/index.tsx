'use client';

import { cn } from '@/lib/utils';
import { AnimatedText, TextScramble, ZoomParallax } from '../../ui';
import { TypeAnimation } from 'react-type-animation';

export function HomeHero() {
	return <div>
    <div className="relative flex h-[50vh] items-center justify-center">
				{/* Radial spotlight */}
				<div
					aria-hidden="true"
					className={cn(
						'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full flex flex-col items-center justify-center',
						'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
						'blur-[30px]',
					)}
				/>
          <div className='flex items-center flex-col'>
            <TextScramble className='border-solid border rounded-full bg-gray-100 px-2 font-medium text-shadow-border border-gray-400 text-gray-600' characterSet="nlJugempaoncrstilde0123456789">
              Bienvenu Dans ...
            </TextScramble>
            <AnimatedText textClassName='text-8xl' text='Jungle' />
            <TypeAnimation 
              sequence={[
                'Trouve.',
                1000,
                'Valide.',
                1000,
                'Entre.',
                1000
              ]}
              wrapper="div"
              speed={50}
              style={{ fontSize: '2em', marginTop: '16px', fontWeight: '900', color: '#bbb' }}
              repeat={Infinity} 
            />
          </div>
        </div>
  </div>
}
