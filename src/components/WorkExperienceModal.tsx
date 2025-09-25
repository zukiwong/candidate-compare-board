import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Building, Calendar, Trophy, Code } from "lucide-react";

interface WorkExperiencePosition {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

interface WorkExperience {
  years: number;
  months: number;
  positions: WorkExperiencePosition[];
}

interface WorkExperienceModalProps {
  workExperience: WorkExperience | null;
  candidateName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function WorkExperienceModal({
  workExperience,
  candidateName,
  isOpen,
  onClose,
}: WorkExperienceModalProps) {
  if (!workExperience) return null;

  const formatExperience = (years: number, months: number) => {
    if (years === 0) return `${months} months`;
    if (months === 0)
      return `${years} year${years > 1 ? "s" : ""}`;
    return `${years} year${years > 1 ? "s" : ""}, ${months} month${months > 1 ? "s" : ""}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-secondary">
            {candidateName}'s Work Experience
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              Total Experience:{" "}
              {formatExperience(
                workExperience.years,
                workExperience.months,
              )}
            </span>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {workExperience.positions.map((position, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 space-y-4"
              >
                {/* Position Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-secondary">
                      {position.position}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Building className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">
                        {position.company}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {position.duration}
                  </Badge>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold text-secondary mb-2">
                    Role Description
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {position.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-primary" />
                    <h4 className="text-sm font-semibold text-secondary">
                      Technologies Used
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {position.technologies.map(
                      (tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs bg-accent/20 text-accent-foreground hover:bg-accent/30"
                        >
                          {tech}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-4 h-4 text-primary" />
                    <h4 className="text-sm font-semibold text-secondary">
                      Key Achievements
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {position.achievements.map(
                      (achievement, achievementIndex) => (
                        <div
                          key={achievementIndex}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-foreground leading-relaxed">
                            {achievement}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}