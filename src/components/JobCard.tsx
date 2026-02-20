import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import {
  Building,
  MapPin,
  DollarSign,
  Calendar,
  Target,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { Job } from "../types/job";
import { GapAnalysisModal } from "./GapAnalysisModal";
import { InterviewQuestionsModal } from "./InterviewQuestionsModal";
import { ElevatorPitchModal } from "./ElevatorPitchModal";

interface JobCardProps {
  job: Job;
  studentProfile: any;
  isSelected?: boolean;
  onSelectionChange?: (jobId: string, selected: boolean) => void;
  selectionDisabled?: boolean;
  showSelection?: boolean;
}

export function JobCard({
  job,
  isSelected = false,
  onSelectionChange,
  selectionDisabled = false,
  showSelection = false
}: JobCardProps) {
  const [gapAnalysisOpen, setGapAnalysisOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const [pitchOpen, setPitchOpen] = useState(false);

  const handleSelectionChange = (checked: boolean) => {
    if (onSelectionChange) {
      onSelectionChange(job.id, checked);
    }
  };

  return (
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
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
          <Building className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-secondary">{job.title}</h3>
          <div className="text-sm text-muted-foreground">{job.company}</div>
        </div>
      </div>

      {/* Profile Match Score */}
      {job.matchScore !== undefined && (
        <div className="space-y-3">
          <h5 className="text-sm font-semibold text-secondary">Profile Match</h5>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Overall Score</span>
              <span className="font-medium">{job.matchScore}%</span>
            </div>
            <Progress value={job.matchScore} className="h-2" />
          </div>
        </div>
      )}

      {/* Job Details */}
      <div className="space-y-3">
        <h5 className="text-sm font-semibold text-secondary">Job Details</h5>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{job.startDate}</span>
          </div>
        </div>
      </div>


      {/* Required Skills */}
      <div className="space-y-3">
        <h5 className="text-sm font-semibold text-secondary">Required Skills</h5>
        <div className="flex flex-wrap gap-2">
          {job.skills.required.slice(0, 6).map((skill) => (
            <Badge
              key={skill}
              className="text-xs border-0"
              style={{ backgroundColor: '#374151', color: 'white' }}
            >
              {skill}
            </Badge>
          ))}
          {job.skills.required.length > 6 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.required.length - 6} more
            </Badge>
          )}
        </div>
      </div>

      {/* AI Insights Preview */}
      <div className="space-y-4">
        <h5 className="text-sm font-semibold text-secondary">AI Preparation Insights</h5>

        <div className="space-y-3">
          {/* Gap Analysis Preview */}
          {job.gapAnalysis ? (
            <div
              className="bg-accent/50 p-3 rounded-md cursor-pointer hover:bg-accent/70 transition-colors"
              onClick={() => setGapAnalysisOpen(true)}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium">Gap Analysis Ready</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {job.gapAnalysis.strengths.length} strengths, {job.gapAnalysis.gaps.length} areas to improve
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Gap Analysis</span>
              </div>
              <p className="text-xs text-muted-foreground">Analysis pending</p>
            </div>
          )}

          {/* Interview Questions Preview */}
          {job.aiQuestions && job.aiQuestions.length > 0 ? (
            <div
              className="bg-accent/50 p-3 rounded-md cursor-pointer hover:bg-accent/70 transition-colors"
              onClick={() => setQuestionsOpen(true)}
            >
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Interview Questions Ready</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {job.aiQuestions.length} tailored questions prepared
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Interview Questions</span>
              </div>
              <p className="text-xs text-muted-foreground">Questions pending</p>
            </div>
          )}

          {/* Elevator Pitch Preview */}
          {job.elevatorPitch ? (
            <div
              className="bg-accent/50 p-3 rounded-md cursor-pointer hover:bg-accent/70 transition-colors"
              onClick={() => setPitchOpen(true)}
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Elevator Pitch Ready</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {job.elevatorPitch.keyPoints.length} key points for {job.elevatorPitch.timeframe}
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Elevator Pitch</span>
              </div>
              <p className="text-xs text-muted-foreground">Pitch pending</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-border">
        <Button variant="outline" size="sm" className="w-full" onClick={() => setGapAnalysisOpen(true)}>
          View Detailed Insights
        </Button>
      </div>

      {/* Modals */}
      <GapAnalysisModal
        isOpen={gapAnalysisOpen}
        onClose={() => setGapAnalysisOpen(false)}
        job={job}
      />
      <InterviewQuestionsModal
        isOpen={questionsOpen}
        onClose={() => setQuestionsOpen(false)}
        job={job}
      />
      <ElevatorPitchModal
        isOpen={pitchOpen}
        onClose={() => setPitchOpen(false)}
        job={job}
      />
    </div>
  );
}