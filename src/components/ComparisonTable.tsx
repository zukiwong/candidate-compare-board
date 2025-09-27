import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SkillProgressBar } from "./SkillProgressBar";
import { ProjectModal } from "./ProjectModal";
import { WorkExperienceModal } from "./WorkExperienceModal";
import { Candidate } from "../types/candidate";
import {
  MapPin,
  Check,
  X,
  Clock,
  Github,
  ExternalLink,
  Linkedin,
  FileText
} from "lucide-react";

interface ComparisonTableProps {
  candidates: Candidate[];
  activeDimensions: string[];
  highlightedRow?: string;
  onRowClick?: (dimension: string) => void;
  hasJD?: boolean;
}

export function ComparisonTable({
  candidates,
  activeDimensions,
  highlightedRow,
  onRowClick,
  hasJD = false
}: ComparisonTableProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedWorkExperience, setSelectedWorkExperience] = useState<any>(null);
  const [selectedCandidateName, setSelectedCandidateName] = useState("");
  const [isWorkExperienceModalOpen, setIsWorkExperienceModalOpen] = useState(false);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleWorkExperienceClick = (workExperience: any, candidateName: string) => {
    setSelectedWorkExperience(workExperience);
    setSelectedCandidateName(candidateName);
    setIsWorkExperienceModalOpen(true);
  };

  const formatExperience = (years: number, months: number) => {
    if (years === 0) return `${months} months`;
    if (months === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years}y ${months}m`;
  };

  const getHighestValue = (dimension: string, candidates: Candidate[]) => {
    switch (dimension) {
      case "Core Skill Match %":
        return Math.max(...candidates.map(c => c.coreSkillMatch || 0));
      case "Work Experience":
        return Math.max(...candidates.map(c => c.workExperience.years * 12 + c.workExperience.months));
      default:
        return null;
    }
  };

  const isHighestInDimension = (dimension: string, candidate: Candidate) => {
    const highest = getHighestValue(dimension, candidates);
    if (highest === null) return false;
    
    switch (dimension) {
      case "Core Skill Match %":
        return candidate.coreSkillMatch === highest;
      case "Work Experience":
        return (candidate.workExperience.years * 12 + candidate.workExperience.months) === highest;
      default:
        return false;
    }
  };

  const renderDimensionContent = (dimensionName: string, candidate: Candidate) => {
    const isHighest = isHighestInDimension(dimensionName, candidate);
    const highlightClass = isHighest ? "bg-accent/30" : "";

    switch (dimensionName) {
      case "Core Skill Match %":
        return (
          <div className={`px-4 py-3 ${highlightClass}`}>
            <SkillProgressBar percentage={candidate.coreSkillMatch || 0} />
          </div>
        );
      
      case "Top 5 Skills (Self-Ranked)":
        return (
          <div className="px-4 py-3">
            <div className="space-y-1">
              {candidate.topSkills.slice(0, 5).map((skill, index) => (
                <div key={skill.name} className="flex items-center justify-between text-xs group">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      index === 0 ? 'bg-primary text-white' :
                      index === 1 ? 'bg-accent text-accent-foreground' :
                      index === 2 ? 'bg-secondary text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="truncate font-medium">{skill.name}</span>
                  </div>
                  <span className={`text-xs font-semibold ${
                    index < 3 ? 'text-secondary' : 'text-muted-foreground'
                  }`}>
                    {skill.rating}/5
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "Project Experience":
        return (
          <div className="px-4 py-3">
            <div className="space-y-1">
              {candidate.projects.slice(0, 2).map((project) => (
                <Badge
                  key={project.title}
                  variant="outline"
                  className="text-xs cursor-pointer hover:bg-accent/50 block w-fit"
                  onClick={() => handleProjectClick(project)}
                >
                  {project.title}
                </Badge>
              ))}
            </div>
          </div>
        );
      
      case "Education":
        return (
          <div className="px-4 py-3">
            <div className="flex items-center gap-2">
              <Avatar className="w-5 h-5">
                <AvatarFallback className="text-xs">
                  {candidate.education.school.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="text-xs min-w-0">
                <div className="truncate font-medium">{candidate.education.degree}</div>
                <div className="text-muted-foreground truncate">{candidate.education.school}</div>
              </div>
            </div>
          </div>
        );
      
      case "Work Experience":
        return (
          <div className={`px-4 py-3 ${highlightClass}`}>
            <div 
              className="flex items-center gap-2 cursor-pointer hover:bg-accent/20 rounded p-1 transition-colors group"
              onClick={() => handleWorkExperienceClick(candidate.workExperience, candidate.name)}
            >
              <Clock className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
              <span className="text-xs group-hover:text-primary font-medium">
                {formatExperience(candidate.workExperience.years, candidate.workExperience.months)}
              </span>
            </div>
          </div>
        );
      
      case "Location / Availability":
        return (
          <div className="px-4 py-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs truncate">{candidate.location.current}</span>
                {candidate.location.matches ? (
                  <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                ) : (
                  <X className="w-3 h-3 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex gap-1">
                {candidate.location.isRemote && (
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">Remote</Badge>
                )}
                {candidate.location.isHybrid && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">Hybrid</Badge>
                )}
              </div>
            </div>
          </div>
        );
      
      case "Candidate Links":
        return (
          <div className="px-4 py-3">
            <div className="flex gap-1">
              {candidate.links.github && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-accent/50 cursor-pointer"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    window.open(candidate.links.github, '_blank');
                  }}
                >
                  <Github className="w-3 h-3" />
                </Button>
              )}
              {candidate.links.portfolio && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-accent/50 cursor-pointer"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    window.open(candidate.links.portfolio, '_blank');
                  }}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              )}
              {candidate.links.linkedin && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-accent/50 cursor-pointer"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    window.open(candidate.links.linkedin, '_blank');
                  }}
                >
                  <Linkedin className="w-3 h-3" />
                </Button>
              )}
              {candidate.links.cv && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-accent/50 cursor-pointer"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (candidate.links.cv) {
                      // 处理CV文件 - 如果是相对路径，直接使用（Vite会处理public文件夹中的文件）
                      const cvUrl = candidate.links.cv.startsWith('http')
                        ? candidate.links.cv
                        : candidate.links.cv;
                      window.open(cvUrl, '_blank');
                    }
                  }}
                >
                  <FileText className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        );
      
      case "Soft Skills":
        return (
          <div className="px-4 py-3">
            <div className="space-y-1">
              {candidate.softSkills.slice(0, 2).map((skill) => (
                <div key={skill.name} className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="truncate">{skill.name}</span>
                    <span>{skill.rating}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-gray-600 h-1 rounded-full"
                      style={{ width: `${(skill.rating / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="px-4 py-3">
            <div className="text-xs text-muted-foreground">Custom dimension</div>
          </div>
        );
    }
  };

  const allDimensions = [
    "Top 5 Skills (Self-Ranked)",
    ...activeDimensions
  ];

  return (
    <>
      <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="grid bg-muted/50 border-b border-border" style={{ gridTemplateColumns: `200px repeat(${candidates.length}, minmax(250px, 1fr))` }}>
          <div className="px-4 py-4 border-r border-border">
            <div className="table-header">Dimensions</div>
          </div>
          {candidates.map((candidate) => (
            <div key={candidate.id} className="px-4 py-4 border-r border-border last:border-r-0">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={candidate.avatar} />
                  <AvatarFallback className="text-xs">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">{candidate.name}</div>
                </div>
              </div>
              {hasJD && (
                <div className="mt-2">
                  <SkillProgressBar percentage={candidate.coreSkillMatch || 0} showPercentage={false} />
                  <div className="text-xs text-center mt-1 font-medium">{candidate.coreSkillMatch || 0}% Match</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Table Body */}
        {allDimensions.map((dimension) => (
          <div
            key={dimension}
            className={`grid border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors cursor-pointer ${
              highlightedRow === dimension ? 'bg-accent/20' : ''
            }`}
            style={{ gridTemplateColumns: `200px repeat(${candidates.length}, minmax(250px, 1fr))` }}
            onClick={() => onRowClick?.(dimension)}
          >
            <div className="px-4 py-3 border-r border-border bg-muted/20 flex items-center">
              <div className="dimension-label">{dimension}</div>
            </div>
            {candidates.map((candidate) => (
              <div key={candidate.id} className="border-r border-border last:border-r-0">
                {renderDimensionContent(dimension, candidate)}
              </div>
            ))}
          </div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

      <WorkExperienceModal
        workExperience={selectedWorkExperience}
        candidateName={selectedCandidateName}
        isOpen={isWorkExperienceModalOpen}
        onClose={() => setIsWorkExperienceModalOpen(false)}
      />
    </>
  );
}