import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-accent/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Hey, this is RB
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Welcome to my corner of the web! I'm passionate about creating innovative solutions 
                through technology. With a focus on web development, artificial intelligence, and 
                astronomical applications, I strive to build projects that make a difference.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                My journey in technology has led me to work on various exciting projects, 
                from stellar navigation systems to modern web applications. I believe in 
                the power of combining different disciplines to create unique solutions.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
