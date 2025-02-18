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
          className="max-w-6xl min-h-[500px] mx-auto"
        >
          <Card className="bg-accent/10 backdrop-blur-sm p-8 h-[400px]">
            <CardContent className="pt-6">
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-white">
                Hey, this is RB
              </h1>
              <p className="text-2xl text-muted-foreground leading-relaxed">
                Welcome!
              </p>
              <p className="text-2xl text-muted-foreground leading-relaxed mt-4">
                Thank You!!!
              <br></br>
              Expect the Unexpected!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
