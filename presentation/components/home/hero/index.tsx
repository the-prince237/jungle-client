'use client';

import { cn } from '@/lib/utils';
import { AnimatedText, Image, TextScramble, ZoomParallax } from '../../ui';

export function HomeHero() {
  const images: Image[] = [
    { src: 'https://pbs.twimg.com/media/CNBxQXwUkAA2ma6.jpg', alt: 'Hero Image 1' },
    { src: 'https://afriqpnb.com/api/images/properties/property_2025-04-09T15_33_43.487Z67f691adf532231b0349d93e_yaounde-roundabout-i_(1)_logo_compr.webp.webp', alt: 'Hero Image 2' },
    { src: 'https://cceonlinenews.com/wp-content/uploads/2020/06/Douala-Grand-Mall.jpg', alt: 'Hero Image 4' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS40tVGjHL7yb_siiFD_l-42oLUCBLIK_B3kg&s', alt: 'Hero Image 6' },
    { src: 'https://wallpapers.com/images/hd/douala-night-stroll-at-the-largest-city-in-cameroon-k1rzeusubnwzgqod.jpg', alt: 'Hero Image 7' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Rue_Bafoussam_%28Marie_rurale%29.jpg/2560px-Rue_Bafoussam_%28Marie_rurale%29.jpg', alt: 'Hero Image 7' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Kribi_2k18.jpg', alt: 'Hero Image 7' },
    { src: 'https://www.airial.travel/_next/image?url=https%3A%2F%2Fcoinventmediastorage.blob.core.windows.net%2Fmedia-storage-container%2Fgphoto_ChIJAQAAI_sSYRAR5ZJ9U4CIgDs_1.jpg&w=3840&q=70', alt: 'Hero Image 7' },
];

	return <div>
    <div className="relative flex h-[50vh] items-center justify-center">
				{/* Radial spotlight */}
				<div
					aria-hidden="true"
					className={cn(
						'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
						'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
						'blur-[30px]',
					)}
				/>
          <div className='flex items-center flex-col'>
            <TextScramble className='border-solid border rounded-full bg-gray-100 px-2 font-medium text-shadow-border border-gray-400' characterSet="nlJugempaoncrstilde0123456789">
              Bienvenu Dans ...
            </TextScramble>

            <AnimatedText textClassName='text-8xl' text='Jungle' />
          </div>
        </div>
    <ZoomParallax images={images} />
  </div>
}
