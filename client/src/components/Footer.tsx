import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <a 
            href="mailto:rk@gmail.com"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact Us
          </a>

          <p className="text-sm text-muted-foreground">
            2025 © All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}