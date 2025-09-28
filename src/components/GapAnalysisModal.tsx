import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { TrendingUp, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { Job } from "../types/job";

interface GapAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

export function GapAnalysisModal({ isOpen, onClose, job }: GapAnalysisModalProps) {
  if (!job.gapAnalysis) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl sm:max-w-4xl max-h-[85vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-secondary">
            Skills Gap Analysis
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>{job.title} at {job.company}</span>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Strengths Section */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-secondary">Your Strengths</h3>
              </div>
              <div className="space-y-2">
                {job.gapAnalysis.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gaps Section */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-secondary">Areas to Improve</h3>
              </div>
              <div className="space-y-2">
                {job.gapAnalysis.gaps.map((gap, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{gap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions Section */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-secondary">AI Recommendations</h3>
              </div>
              <div className="space-y-2">
                {job.gapAnalysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Requirements Reference */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="text-sm font-semibold text-secondary">Job Requirements Reference</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.required.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs bg-accent/20 text-accent-foreground hover:bg-accent/30"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Preferred Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.preferred.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}