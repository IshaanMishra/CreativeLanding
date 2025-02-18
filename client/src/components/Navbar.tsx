import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import useScroll from "@/hooks/useScroll";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const scrolled = useScroll(0.1); // Adjust threshold to 10% of viewport height
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.header 
      className={cn(
        "fixed top-0 w-full z-50",
        scrolled ? "h-12 mt-4" : "h-16 bg-background/80 backdrop-blur-md border-b"
      )}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: scrolled ? 0 : 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <nav className="container mx-auto px-4 h-full flex items-center justify-between">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {!scrolled && (
            <Link href="/">
              <a className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Portfolio
              </a>
            </Link>
          )}
        </motion.div>

        <ul className={cn(
          "flex gap-4 transition-all duration-300 ease-in-out",
          scrolled ? "mx-auto" : ""
        )}>
          {navItems.map((item) => (
            <motion.li 
              key={item.name}
              layout
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <Link href={item.path}>
                <a
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative py-1.5 px-4 transition-all duration-300 ease-in-out",
                    scrolled ? "bg-background/80 backdrop-blur-md rounded-full border shadow-sm" : ""
                  )}
                >
                  <span className="relative z-10 text-sm font-medium">
                    {item.name}
                  </span>
                  {hoveredItem === item.name && !scrolled && (
                    <motion.div
                      layoutId="navbar-highlight"
                      className="absolute inset-0 bg-accent rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </a>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}