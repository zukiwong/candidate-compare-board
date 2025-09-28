import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  Building,
  MapPin,
  DollarSign
} from "lucide-react";
import { Job } from "../types/job";

interface StudentJobTableProps {
  jobs: Job[];
  studentProfile: any;
  activeDimensions: string[];
  highlightedRow: string;
  onRowClick: (dimension: string) => void;
}

export function StudentJobTable({
  jobs,
  studentProfile,
  activeDimensions,
  highlightedRow,
  onRowClick
}: StudentJobTableProps) {

  // Helper function to check if student has a skill
  const hasSkill = (skillName: string) => {
    if (!studentProfile || !skillName) return false;

    const allSkills = [
      // Handle both object format {name: "JavaScript"} and string format "JavaScript"
      ...(studentProfile.skills?.programming?.map((s: any) => typeof s === 'string' ? s : s.name).filter(Boolean) || []),
      ...(studentProfile.skills?.frameworks?.map((s: any) => typeof s === 'string' ? s : s.name).filter(Boolean) || []),
      ...(studentProfile.skills?.tools?.map((s: any) => typeof s === 'string' ? s : s.name).filter(Boolean) || []),
      ...(studentProfile.skills?.databases?.map((s: any) => typeof s === 'string' ? s : s.name).filter(Boolean) || []),
      ...(studentProfile.skills?.cloud?.map((s: any) => typeof s === 'string' ? s : s.name).filter(Boolean) || []),
      // Add soft skills (usually object format)
      ...(studentProfile.skills?.soft?.map((s: any) => typeof s === 'string' ? s : s.name).filter(Boolean) || [])
    ];

    // Normalize skill names for better matching
    const normalizeSkill = (skill: string) => {
      if (!skill || typeof skill !== 'string') return '';
      return skill.toLowerCase().replace(/[^a-z0-9]/g, '');
    };

    const normalizedJobSkill = normalizeSkill(skillName);
    if (!normalizedJobSkill) return false;

    return allSkills.some((studentSkill: string) => {
      if (!studentSkill || typeof studentSkill !== 'string') return false;

      const normalizedStudentSkill = normalizeSkill(studentSkill);
      if (!normalizedStudentSkill) return false;

      return (
        normalizedStudentSkill.includes(normalizedJobSkill) ||
        normalizedJobSkill.includes(normalizedStudentSkill) ||
        // Special mappings for common variations
        (normalizedJobSkill === 'problemsolving' && normalizedStudentSkill === 'problemsolving') ||
        (normalizedJobSkill === 'aiml' && (normalizedStudentSkill.includes('ai') || normalizedStudentSkill.includes('machinelearning'))) ||
        (normalizedJobSkill === 'fullstackdevelopment' && normalizedStudentSkill.includes('fullstack'))
      );
    });
  };

  const renderDimensionCell = (dimension: string, job: Job) => {
    switch (dimension) {
      case "Company & Role":
        return (
          <div className="space-y-1">
            <div className="font-medium text-sm">{job.company}</div>
            <div className="text-xs text-muted-foreground">{job.title}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <DollarSign className="w-3 h-3" />
              <span>{job.salary}</span>
            </div>
          </div>
        );

      case "Requirements Match":
        return (
          <div className="space-y-2">
            {/* Main container with skills and count */}
            <div className="flex justify-between items-start">
              {/* Required skills with match status */}
              <div className="flex flex-wrap gap-1 flex-1">
                {job.skills.required.map((skill) => {
                  const isMatched = hasSkill(skill);
                  return (
                    <Badge
                      key={skill}
                      className={`text-xs ${
                        isMatched
                          ? 'border-0'
                          : 'border border-gray-300 text-gray-500 bg-white'
                      }`}
                      style={
                        isMatched
                          ? { backgroundColor: '#374151', color: 'white' }
                          : {}
                      }
                    >
                      {skill}
                    </Badge>
                  );
                })}
              </div>

              {/* Match count on the right */}
              <span className="text-xs ml-2 flex-shrink-0">
                {job.skills.required.filter(skill => hasSkill(skill)).length}/{job.skills.required.length}
              </span>
            </div>
          </div>
        );

      case "Skills Gap":
        return (
          <div className="space-y-1">
            {job.gapAnalysis ? (
              <>
                <div className="text-xs">
                  <span className="text-green-600 font-medium">
                    {job.gapAnalysis.strengths.length} Strengths
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-orange-600 font-medium">
                    {job.gapAnalysis.gaps.length} Areas to improve
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {job.gapAnalysis.suggestions.length} AI suggestions
                </div>
              </>
            ) : (
              <div className="text-xs text-muted-foreground">Analysis pending</div>
            )}
          </div>
        );

      case "AI Insights":
        return (
          <div className="space-y-1">
            {job.aiQuestions ? (
              <div className="text-xs text-blue-600 font-medium">
                {job.aiQuestions.length} Questions Ready
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">Questions pending</div>
            )}
            {job.gapAnalysis?.suggestions ? (
              <div className="text-xs text-purple-600 font-medium">
                {job.gapAnalysis.suggestions.length} AI Tips
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">Tips pending</div>
            )}
          </div>
        );

      case "Key Preparation Points":
        return (
          <div className="space-y-1">
            {job.elevatorPitch ? (
              <>
                <div className="text-xs text-green-600 font-medium">
                  Pitch Ready ({job.elevatorPitch.timeframe})
                </div>
                <div className="text-xs text-muted-foreground">
                  {job.elevatorPitch.keyPoints.length} key points
                </div>
              </>
            ) : (
              <div className="text-xs text-muted-foreground">Pitch pending</div>
            )}
          </div>
        );

      default:
        return <div className="text-xs text-gray-500">-</div>;
    }
  };


  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="grid bg-muted/50 border-b border-border" style={{ gridTemplateColumns: `200px repeat(${jobs.length}, minmax(250px, 1fr))` }}>
        <div className="px-4 py-4 border-r border-border">
          <div className="font-semibold text-sm">Student Profile vs Jobs</div>
        </div>
        {jobs.map((job) => (
          <div key={job.id} className="px-4 py-4 border-r border-border last:border-r-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Building className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div className="font-semibold text-sm">{job.title}</div>
                <div className="text-xs text-muted-foreground">{job.company}</div>
              </div>
            </div>
            {job.matchScore !== undefined && (
              <div className="mt-2">
                <Progress value={job.matchScore} className="h-2" />
                <div className="text-xs text-center mt-1 font-medium">{job.matchScore}% Match</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Table Body */}
      {activeDimensions.map((dimension) => (
        <div
          key={dimension}
          className={`grid border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors cursor-pointer ${
            highlightedRow === dimension ? 'bg-accent/20' : ''
          }`}
          style={{ gridTemplateColumns: `200px repeat(${jobs.length}, minmax(250px, 1fr))` }}
          onClick={() => onRowClick(dimension)}
        >
          <div className="px-4 py-3 border-r border-border bg-muted/20 flex items-center">
            <span className="text-sm font-medium">{dimension}</span>
          </div>
          {jobs.map((job) => (
            <div key={job.id} className="border-r border-border last:border-r-0">
              <div className="px-4 py-3">
                {renderDimensionCell(dimension, job)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}