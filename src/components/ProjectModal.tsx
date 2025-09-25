import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { ExternalLink, Github, Calendar } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  duration: string;
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {project.title}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 hover:text-blue-600" />
              </a>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {project.duration}
          </div>
          
          <p className="text-sm leading-relaxed">{project.description}</p>
          
          <div>
            <h4 className="mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}