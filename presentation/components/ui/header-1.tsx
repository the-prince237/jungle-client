'use client';
import React from 'react';
import { Button } from '@/presentation/components/ui/button';
import { cn } from '@/lib/utils';
import { useScroll } from '@/presentation/components/ui/use-scroll';
import {  LucideHousePlus, MapPinHouseIcon, Search, Settings } from 'lucide-react';
import Logo from '../logo';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function Header1() {
	const scrolled = useScroll(10);
	const [searchFocused, setSearchFocused] = React.useState(false);

	return (
		<header
			className={cn('sticky top-0 z-60 w-full border-b border-transparent bg-foreground', {
				'bg-foreground/95 supports-backdrop-filter:bg-foreground/80 shadow-2xs shadow-foreground backdrop-blur-xl':
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-20 w-full items-center justify-between padded-x">
				{/* Left Side */}
				<div className='flex items-center gap-5 lg:gap-8'>
					<Logo />
					<div className='relative hidden md:flex items-center group' >
						<Search className={cn('absolute left-3 text-gray-500', { "scale-0": searchFocused})} />
						<input 
							type='text'
							placeholder='Rechercher sur Jungle'
							onFocus={() => setSearchFocused(true)}
							onBlur={() => setSearchFocused(false)}
							className={cn("px-4 py-2 w-45 lg:w-auto text-sm lg:text-base pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-gray-300 text-black", {"pl-4": searchFocused})} 
						/>
					</div>
				</div>

				{/* Right Side */}
				<div className="items-center gap-3 lg:gap-5 flex">
					<a href="/feed" className='hidden md:block'>
						<Button className='text-base flex items-center gap-2'>
							Trouver un meublé
							<MapPinHouseIcon />
						</Button>
					</a>
					<a href="/feed" className='md:hidden text-white font-extralight w-10 h-10 flex items-center bg-primary justify-center rounded-full'>
						<MapPinHouseIcon size={18} />
					</a>

					<SignedIn>
						<div className='text-background w- flex items-center gap-3'>
							<a href="/settings" className='size-10 border-primary rounded-full border-2 grid place-items-center p-1 hover:bg-primary hover:text-white transition-colors text-primary'>
								<Settings size={18} />
							</a>
              <UserButton appearance={{ elements: { userButtonAvatarBox: { width: '40px', height: '40px' } } }} />
						</div>
					</SignedIn>

					<SignedOut>
						<a href="/new" className='hidden md:block'>
							<Button variant="outline" className='text-base bg-transparent text-primary border-primary hover:bg-primary hover:text-white flex items-center gap-2'>
								Ajouter un meublé
								<LucideHousePlus />
							</Button>
						</a>
						<a href="/new" className='md:hidden text-primary border hover:bg-primary hover:text-white font-extralight w-10 h-10 flex items-center border-primary justify-center rounded-full'>
							<LucideHousePlus size={18} />
						</a>
					</SignedOut>
				</div>
			</nav>
		</header>
	);
}

export type Header1LinkProps = {
	label: string;
	href: string;
	icon: any;
	submenu?: {
			label: string;
			href: string;
			icon: any;
	}[];
	cta?: boolean; 
}