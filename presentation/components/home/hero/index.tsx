'use client';

import { cn } from '@/lib/utils';
import { AnimatedText, TextScramble } from '../../ui';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, CheckCircle2, LucideHousePlus, MapPinHouseIcon, Shield, Smartphone } from 'lucide-react';
import { Button } from '../../ui/button';
import React from 'react';
import { motion } from 'framer-motion'
import Link from 'next/link';

export function HomeHero() {
	return (
      <section className="relative w-full">
        <div className="padded-x w-full py-24 md:py-32 lg:py-40">
          <div className="relative w-full flex flex-col lg:flex-row lg:items-center lg:gap-16">
            <div className="mx-auto text-center lg:mx-0 lg:w-1/2 lg:text-left">
              <div
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full flex flex-col justify-center',
                  'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
                  'blur-[30px]',
                )}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className='flex items-center lg:items-start flex-col'>
                  <TextScramble className='border-solid border rounded-full bg-gray-100 px-2 font-medium text-shadow-border border-gray-400 text-gray-600' characterSet="nlJugempaoncrstilde0123456789">
                    Bienvenu Dans ...
                  </TextScramble>
                  <AnimatedText textClassName='text-7xl lg:text-9xl' text='Jungle' />
                  <TypeAnimation 
                    sequence={[
                      "L'immobilier,",
                      1000,
                      "Autrement.",
                      1000,
                    ]}
                    wrapper="div"
                    speed={50}
                    className='text-xl mt-4 font-black text-gray-400'
                    style={{ fontSize: 24, letterSpacing: 3 }}
                    repeat={Infinity} 
                  />
                </div>
                <p className="mt-6 max-w-lg text-lg text-muted-foreground md:text-xl">
                  La plateforme pensée pour les <span className='font-bold'>logements meublés</span>  : <br /> <b>visitez</b> <span className='text-primary font-semibold'>à distance</span>, <b>décidez</b> <span className='font-semibold text-primary'>plus vite</span>, sans mauvaises surprises.
                </p>

                <div className="mt-10 flex flex-col sm:items-center justify-center gap-4 sm:flex-row lg:justify-start">
                  <Link href="/feed">
                    <Button
                      size="lg"
                      className="w-full flex items-center gap-3 sm:w-auto px-8 text-base"
                    >
                      <span>Trouver un meublé</span>
							        <MapPinHouseIcon />
                    </Button>
                  </Link>
                  <Link href="/new">
                    <Button variant="outline" className='text-base w-full sm:w-auto bg-transparent text-primary border-primary hover:bg-primary hover:text-white flex items-center gap-2'>
                      Ajouter un meublé
                      <LucideHousePlus />
                    </Button>
                  </Link>  
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-[#00b800]" />
                  <span>Spécialiste du meublé</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-5 w-5 text-[#00b800]" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Smartphone className="h-5 w-5 text-[#00b800]" />
                  <span>Mobile-first</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-16 lg:mt-0 lg:w-1/2"
            >
              <div className="relative z-10 overflow-hidden rounded-2xl border border-border bg-muted/30 p-4 shadow-2xl backdrop-blur-sm">
                <div className="aspect-4/3 overflow-hidden rounded-lg bg-linear-to-br from-[#00b800]/10 to-muted">
                  <img
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
                    alt="Modern furnished apartment"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-[#00b800]/20 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-[#00b800]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Visite virtuelle
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Disponible maintenant
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary"
                    >
                      Voir
                    </Button>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 -top-4 h-72 w-72 rounded-full bg-[#00b800]/10 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-72 w-72 rounded-full bg-[#00b800]/5 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>
  )
}



interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border bg-background p-2 text-center font-semibold",
        className,
      )}
      {...props}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight className="h-5 w-5" />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-[#00b800] transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-[#00b800]"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";