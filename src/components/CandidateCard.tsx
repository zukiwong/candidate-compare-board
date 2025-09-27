import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Checkbox } from "./ui/checkbox";
import { SkillProgressBar } from "./SkillProgressBar";
import { SkillChips } from "./SkillChips";
import { FollowUpPrompts } from "./FollowUpPrompts";
import { ProjectModal } from "./ProjectModal";
import { WorkExperienceModal } from "./WorkExperienceModal";
import { Github, ExternalLink, Linkedin, FileText, MapPin, Check, X } from "lucide-react";
import { Candidate } from "../types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
  isSelected?: boolean;
  onSelectionChange?: (candidateId: string, selected: boolean) => void;
  selectionDisabled?: boolean;
  showSelection?: boolean;
}

export function CandidateCard({ 
  candidate, 
  isSelected = false, 
  onSelectionChange, 
  selectionDisabled = false, 
  showSelection = false 
}: CandidateCardProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isWorkExperienceModalOpen, setIsWorkExperienceModalOpen] = useState(false);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleWorkExperienceClick = () => {
    setIsWorkExperienceModalOpen(true);
  };

  const handleSelectionChange = (checked: boolean) => {
    if (onSelectionChange) {
      onSelectionChange(candidate.id, checked);
    }
  };

  const formatExperience = (years: number, months: number) => {
    if (years === 0) return `${months} months`;
    if (months === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years}y ${months}m`;
  };

  return (
    <>
      <div className={`bg-card border border-border rounded-lg p-6 space-y-6 min-w-[300px] shadow-sm hover:shadow-md transition-all relative ${
        isSelected ? 'ring-2 ring-primary border-primary' : ''
      }`}>
        {/* Selection checkbox */}
        {showSelection && (
          <div className="absolute top-4 right-4">
            <Checkbox
              checked={isSelected}
              onCheckedChange={handleSelectionChange}
              disabled={selectionDisabled}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Avatar className="w-12 h-12">
            <AvatarImage src={candidate.avatar} />
            <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
              {candidate.initials || candidate.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-secondary">{candidate.name}</h3>
            <div className="text-sm text-muted-foreground">Candidate Profile</div>
          </div>

        </div>

        {/* Core Skill Match */}
        <div className="space-y-3">
          <h5 className="text-sm font-semibold text-secondary">Core Skill Match</h5>
          <SkillProgressBar percentage={candidate.coreSkillMatch} />
        </div>

        {/* Top 5 Skills */}
        <div className="space-y-3">
          <h5 className="text-sm font-semibold text-secondary">Top Skills</h5>
          <SkillChips skills={candidate.topSkills} />
        </div>

        {/* Projects */}
        <div className="space-y-3">
          <h5 className="text-sm font-semibold text-secondary">Key Projects</h5>
          <div className="flex flex-wrap gap-2">
            {candidate.projects?.map((project, index) => (
              <Badge
                key={`${candidate.id}-project-${index}`}
                variant="outline"
                className="text-xs cursor-pointer hover:bg-accent hover:border-primary transition-colors"
                onClick={() => handleProjectClick(project)}
              >
                {project.title}
              </Badge>
            ))}
          </div>
        </div>

        {/* Education & Experience */}
        <div className="space-y-4">
          <div>
            <h5 className="text-sm font-semibold text-secondary mb-2">Education</h5>
            <div>
              <div className="text-sm font-medium">{candidate.education.school}</div>
              <div className="text-xs text-muted-foreground">{candidate.education.degree}</div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-secondary mb-2">Experience</h5>
            <div 
              className="cursor-pointer hover:bg-accent/20 rounded p-2 transition-colors group"
              onClick={handleWorkExperienceClick}
            >
              <div className="space-y-1">
                {candidate.workExperience.positions.length > 0 && (
                  <div className="text-sm group-hover:text-primary font-semibold">
                    {candidate.workExperience.positions[0].position}
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  {formatExperience(candidate.workExperience.years, candidate.workExperience.months)}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-secondary mb-2">Location & Availability</h5>
            <div className="space-y-2">
              <div>
                <span className="text-sm">{candidate.location.current}</span>
              </div>
              <div className="flex gap-2">
                {candidate.location.isRemote && (
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">Remote</Badge>
                )}
                {candidate.location.isHybrid && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">Hybrid</Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <h5 className="text-sm font-semibold text-secondary">Profile Links</h5>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {candidate.links.github && (
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-2 hover:bg-accent whitespace-nowrap flex-shrink-0 cursor-pointer"
                onClick={() => window.open(candidate.links.github, '_blank')}
              >
                <Github className="w-4 h-4 mr-1" />
                GitHub
              </Button>
            )}
            {candidate.links.portfolio && (
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-2 hover:bg-accent whitespace-nowrap flex-shrink-0 cursor-pointer"
                onClick={() => window.open(candidate.links.portfolio, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Portfolio
              </Button>
            )}
            {candidate.links.linkedin && (
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-2 hover:bg-accent whitespace-nowrap flex-shrink-0 cursor-pointer"
                onClick={() => window.open(candidate.links.linkedin, '_blank')}
              >
                <Linkedin className="w-4 h-4 mr-1" />
                LinkedIn
              </Button>
            )}
            {candidate.links.cv && (
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-2 hover:bg-accent whitespace-nowrap flex-shrink-0 cursor-pointer"
                onClick={() => window.open(candidate.links.cv, '_blank')}
              >
                <FileText className="w-4 h-4 mr-1" />
                CV
              </Button>
            )}
            {candidate.links.transcript && (
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-2 hover:bg-accent whitespace-nowrap flex-shrink-0 cursor-pointer"
                onClick={() => window.open(candidate.links.transcript, '_blank')}
              >
                <FileText className="w-4 h-4 mr-1" />
                Transcript
              </Button>
            )}
            {candidate.links.visa && (
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-2 hover:bg-accent whitespace-nowrap flex-shrink-0 cursor-pointer"
                onClick={() => window.open(candidate.links.visa, '_blank')}
              >
                <FileText className="w-4 h-4 mr-1" />
                Visa
              </Button>
            )}
          </div>
        </div>



        {/* Follow-up Prompts */}
        <FollowUpPrompts prompts={candidate.followUpPrompts} />
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

      <WorkExperienceModal
        workExperience={candidate.workExperience}
        candidateName={candidate.name}
        isOpen={isWorkExperienceModalOpen}
        onClose={() => setIsWorkExperienceModalOpen(false)}
      />
    </>
  );
}