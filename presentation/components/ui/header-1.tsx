'use client';
import React from 'react';
import { Button, buttonVariants } from '@/presentation/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/presentation/components/ui/menu-toggle-icon';
import { useScroll } from '@/presentation/components/ui/use-scroll';
import { createPortal } from 'react-dom';
import { Search, Settings } from 'lucide-react';
import Logo from '../logo';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export function Header1() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const [searchFocused, setSearchFocused] = React.useState(false);

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn('sticky top-0 z-50 w-full border-b border-transparent bg-foreground', {
				'bg-foreground/95 supports-backdrop-filter:bg-foreground/50 border-border backdrop-blur-lg':
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-20 w-full items-center justify-between padded-x">
				<div className='flex items-center gap-5 lg:gap-8'>
					<Logo />
					<div className='relative flex items-center group' >
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
				<div className="hidden items-center gap-3 lg:gap-5 md:flex">
					<Button className='font-bold text-base'>Trouver Un Meublé</Button>
					<div className='h-3 w-0.5 bg-gray-500' />
					<SignedOut>
						<Button variant="outline">Se Connecter</Button>
					</SignedOut>
					<SignedIn>
						<div className='text-background'>
							<a href="/settings">
								<Settings />
							</a>
						</div>
					</SignedIn>
				</div>
				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="md:hidden"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>
			<MobileMenu open={open} className="flex flex-col justify-between gap-2">
				<div className="flex flex-col gap-2">
					<Button variant="outline" className="w-full bg-transparent">
						Sign In
					</Button>
					<Button className="w-full">Get Started</Button>
				</div>
			</MobileMenu>
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

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-foreground/95 supports-backdrop-filter:bg-foreground/50 backdrop-blur-lg',
				'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full p-4',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}