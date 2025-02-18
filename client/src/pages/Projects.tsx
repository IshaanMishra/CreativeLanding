import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Project {
  name: string;
  description: string;
  children?: Project[];
}

const projects: Project = {
  name: "Projects",
  description: "Root",
  children: [
    {
      name: "Stars that led and lead",
      description: "An innovative project exploring celestial navigation and guidance",
      children: [
        {
          name: "Ancient Navigation",
          description: "Historical methods of celestial navigation",
        },
        {
          name: "Modern Applications",
          description: "Current uses of stellar navigation",
        }
      ]
    },
    {
      name: "Web Development",
      description: "Full-stack development projects",
      children: [
        {
          name: "Portfolio",
          description: "Interactive 3D globe portfolio",
        },
        {
          name: "E-commerce Platform",
          description: "Modern shopping experience",
        }
      ]
    },
    {
      name: "AI & Machine Learning",
      description: "Artificial Intelligence projects",
      children: [
        {
          name: "Neural Networks",
          description: "Deep learning implementations",
        },
        {
          name: "Computer Vision",
          description: "Image processing applications",
        }
      ]
    }
  ]
};

const TreeNode = ({ project, depth = 0 }: { project: Project; depth?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: depth * 0.2 }}
      className="relative"
    >
      {depth > 0 && (
        <div className="absolute left-[-20px] top-[20px] w-[20px] h-[1px] bg-border" />
      )}
      <Card className="p-4 mb-4 bg-background/80 backdrop-blur-sm border">
        <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </Card>
      {project.children && (
        <div className="ml-8 relative">
          <div className="absolute left-[-8px] top-0 bottom-4 w-[1px] bg-border" />
          {project.children.map((child, index) => (
            <TreeNode key={index} project={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function Projects() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
        >
          Project Tree
        </motion.h1>
        <div className="max-w-3xl mx-auto">
          <TreeNode project={projects} />
        </div>
      </div>
    </div>
  );
}
