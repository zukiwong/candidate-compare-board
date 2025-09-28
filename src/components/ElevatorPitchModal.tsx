import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Target, Edit3, Save, X, Clock, Lightbulb } from "lucide-react";
import { Job } from "../types/job";
import { toast } from "sonner";

interface ElevatorPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

export function ElevatorPitchModal({ isOpen, onClose, job }: ElevatorPitchModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [customPitch, setCustomPitch] = useState("");
  const [savedCustomPitch, setSavedCustomPitch] = useState("");

  // Calculate dynamic height based on content
  const getTextareaStyle = () => {
    if (!customPitch.trim()) {
      return { minHeight: '150px' };
    }

    const lineCount = customPitch.split('\n').length;
    const charCount = customPitch.length;

    // Base height is 150px, add more height for longer content
    if (charCount > 2000 || lineCount > 15) {
      return { minHeight: '500px', maxHeight: '600px' };
    } else if (charCount > 1000 || lineCount > 8) {
      return { minHeight: '400px', maxHeight: '500px' };
    } else if (charCount > 300 || lineCount > 4) {
      return { minHeight: '350px', maxHeight: '400px' };
    }

    return { minHeight: '250px' };
  };

  if (!job.elevatorPitch) {
    return null;
  }

  const handleEditStart = () => {
    setIsEditing(true);
    setCustomPitch(savedCustomPitch || job.elevatorPitch?.keyPoints.join("\n\n") || "");
  };

  const handleEditSave = () => {
    setSavedCustomPitch(customPitch);
    setIsEditing(false);
    toast.success("Custom pitch saved!");
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setCustomPitch("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl sm:max-w-4xl max-h-[85vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-secondary">
            Elevator Pitch
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Target className="w-4 h-4" />
            <span>{job.title} at {job.company}</span>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Time Frame */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-secondary">
                  Recommended Duration: {job.elevatorPitch.timeframe}
                </span>
              </div>
              <p className="text-sm text-foreground">
                Keep your pitch concise and impactful. Focus on your unique value proposition and how you can contribute to the role.
              </p>
            </div>

            {/* AI-Generated Key Points */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="text-sm font-semibold text-secondary">AI-Generated Key Points</h3>
              <div className="space-y-3">
                {job.elevatorPitch.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Badge variant="outline" className="text-xs mt-0.5">
                      {index + 1}
                    </Badge>
                    <span className="text-sm text-foreground leading-relaxed flex-1">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Pitch Section */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-secondary">Your Custom Pitch</h3>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditStart}
                    className="h-8"
                  >
                    <Edit3 className="w-3 h-3 mr-1" />
                    {savedCustomPitch ? "Edit" : "Create Custom"}
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <Textarea
                    value={customPitch}
                    onChange={(e) => setCustomPitch(e.target.value)}
                    placeholder="Write your personalized elevator pitch here. You can use the AI-generated points as a starting point and customize them to match your style..."
                    className="resize-none transition-all duration-300 ease-in-out text-sm"
                    style={getTextareaStyle()}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleEditSave}
                      className="h-8"
                    >
                      <Save className="w-3 h-3 mr-1" />
                      Save Custom Pitch
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleEditCancel}
                      className="h-8"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/50 rounded-lg p-4 min-h-[120px]">
                  {savedCustomPitch ? (
                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{savedCustomPitch}</p>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-sm text-muted-foreground italic">
                        Create a custom pitch based on the AI suggestions above.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-semibold text-secondary">Elevator Pitch Tips</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">Start with a strong hook that captures attention</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">Clearly state what you do and what makes you unique</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">Connect your skills and experience to the specific role</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">End with a clear call to action or next step</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">Practice until it feels natural and conversational</span>
                </div>
              </div>
            </div>

            {/* Job Context */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="text-sm font-semibold text-secondary">Job Context</h3>
              <div className="space-y-3">
                <p className="text-sm text-foreground leading-relaxed">{job.description.purpose}</p>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Required Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
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
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}