"use client";

import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import {
  Home,
  User,
  LucideHousePlus,
  Settings,
  MapPinHouseIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Accueil", icon: Home, href: "/" },
  { label: "Feed", icon: MapPinHouseIcon, href: "/feed" },
  { label: "Ajouter", icon: LucideHousePlus, href: "/new" },
  { label: "Paramètres", icon: Settings, href: "/settings" },
  { label: "Profile", icon: User, href: '/profile/me' },
];

const MOBILE_LABEL_WIDTH = 72;

type BottomNavBarProps = {
  className?: string;
  defaultIndex?: number;
  stickyBottom?: boolean;
};

export function BottomNavBar({
  className,
  defaultIndex = 0,
  stickyBottom = false,
}: BottomNavBarProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const pathname = usePathname();

  useEffect(() => {
    const activeNavIndex = navItems.findIndex(item => item.href === pathname);
    if (activeNavIndex !== -1) {
      setActiveIndex(activeNavIndex);
    }
  }, [pathname]);

  return (
    <motion.nav
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Bottom Navigation"
      className={cn(
        "bg-card/90 backdrop-blur-3xl dark:bg-card/90 border border-border dark:border-sidebar-border rounded-full flex items-center justify-between p-2 shadow-xl space-x-1 min-w-[320px] max-w-[95vw] h-15",
        stickyBottom && "fixed inset-x-0 bottom-4 mx-auto z-20 w-fit",
        className,
      )}
    >
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = activeIndex === idx;

        return (
          <Link key={item.label} href={item.href}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className={cn(
                "flex items-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-13 min-w-11 min-h-10 max-h-11",
                isActive
                  ? "bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary gap-2"
                  : "bg-transparent text-muted-foreground dark:text-muted-foreground hover:bg-muted dark:hover:bg-muted",
                "focus:outline-none focus-visible:ring-0",
              )}
              onClick={() => setActiveIndex(idx)}
              aria-label={item.label}
              type="button"
            >
              <Icon
                size={22}
                strokeWidth={2}
                aria-hidden
                className="transition-colors duration-200"
              />

              <motion.div
                initial={false}
                animate={{
                  width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                  opacity: isActive ? 1 : 0,
                  marginLeft: isActive ? "8px" : "0px",
                }}
                transition={{
                  width: { type: "spring", stiffness: 350, damping: 32 },
                  opacity: { duration: 0.19 },
                  marginLeft: { duration: 0.19 },
                }}
                className={cn("overflow-hidden flex items-center max-w-[72px]")}
              >
                <span
                  className={cn(
                    "font-medium text-xs whitespace-nowrap select-none transition-opacity duration-200 overflow-hidden text-ellipsis text-[clamp(0.625rem,0.5263rem+0.5263vw,1rem)] leading-[1.9]",
                    isActive ? "text-primary dark:text-primary" : "opacity-0",
                  )}
                  title={item.label}
                >
                  {item.label}
                </span>
              </motion.div>
            </motion.button>
          </Link>
        );
      })}
    </motion.nav>
  );
}

export default React.memo(BottomNavBar);
