import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import useScroll from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Request", path: "/request" },
];

export default function Navbar() {
  const scrolled = useScroll(0.1);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop menu */}
        <ul className={cn(
          "hidden md:flex gap-4 transition-all duration-300 ease-in-out",
          scrolled ? "mx-auto" : ""
        )}>
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} scrolled={scrolled} />
          ))}
        </ul>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b md:hidden"
          >
            <ul className="py-4 px-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>
                    <a
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 px-4 hover:bg-accent rounded-md transition-colors"
                    >
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}

// NavItem component for desktop menu
function NavItem({ item, hoveredItem, setHoveredItem, scrolled }: {
  item: { name: string; path: string };
  hoveredItem: string | null;
  setHoveredItem: (name: string | null) => void;
  scrolled: number;
}) {
  return (
    <motion.li
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
  );
}