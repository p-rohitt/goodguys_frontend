"use client"

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
export const HoverEffect = ({ className, children }) => {

    const [isHovering, setIsHovering] = useState(false)
  return (
    <div className={cn("relative group block p-2 h-full w-full", className)}  onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}>
      <AnimatePresence>
        {
            isHovering && (


            
        <motion.span
          className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.15 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.15 },
          }}
          style={{ opacity: 0 }}
          // This style ensures the background is hidden initially and only shown on hover
          whileHover={{ opacity: 1 }}
        />
    )
}
      </AnimatePresence>
      {children}
    </div>
  );
};


export const Card = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}>
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>)
  );
};
export const CardTitle = ({
  className,
  children
}) => {
  return (
    (<h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>)
  );
};
export const CardDescription = ({
  className,
  children
}) => {
  return (
    (<p
      className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </p>)
  );
};
