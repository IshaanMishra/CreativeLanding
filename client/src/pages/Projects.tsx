import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Project {
  name: string;
  description: string;
  children?: Project[];
}

const projects: Project = {
  name: "Projects",
  description: "Index",
  children: [
    {
      name: "Stars that led and lead",
      description: "An innovative project exploring historic characters and guidance",
      children: [
        {
          name: "Ancient Navigation",
          description: "Historical data through celestial guidance",
        },
        {
          name: "Modern Views",
          description: "My take on the modern social discord",
        }
      ]
    },
    {
      name: "Project Hue",
      description: "Color symbolism in different cultures",
      children: [
        {
          name: "Countries",
          description: "Flag",
        },
        {
          name: "Tribes",
          description: "Social Life",
        }
      ]
    },
    {
      name: "Buildings across time",
      description: "Vision of deconstruct",
      children: [
        {
          name: "Oldest habitat",
          description: "Region",
        },
        {
          name: "Era",
          description: "Ancient-Medieval-Modern",
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
          className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-white"
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
