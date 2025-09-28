import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { MessageSquare, Edit3, Save, X } from "lucide-react";
import { Job } from "../types/job";
import { toast } from "sonner";

interface InterviewQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

export function InterviewQuestionsModal({ isOpen, onClose, job }: InterviewQuestionsModalProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingAnswer, setEditingAnswer] = useState("");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  if (!job.aiQuestions) {
    return null;
  }

  const handleEditStart = (index: number) => {
    setEditingIndex(index);
    setEditingAnswer(answers[index] || "");
  };

  const handleEditSave = (index: number) => {
    setAnswers({ ...answers, [index]: editingAnswer });
    setEditingIndex(null);
    setEditingAnswer("");
    toast.success("Answer saved!");
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditingAnswer("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl sm:max-w-4xl max-h-[85vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-secondary">
            AI-Generated Interview Questions
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="w-4 h-4" />
            <span>{job.title} at {job.company}</span>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-foreground">
                These questions are tailored to your profile and this specific role. Practice your answers and be ready to provide specific examples from your experience.
              </p>
            </div>

            <div className="space-y-4">
              {job.aiQuestions.map((question, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className="text-xs px-2 py-1 rounded font-medium"
                          style={{ backgroundColor: '#6B7280', color: 'white', border: '1px solid #4B5563' }}
                        >
                          Q{index + 1}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-secondary">{question}</p>
                    </div>
                  </div>

                  {/* Answer Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-secondary">Your Answer:</span>
                      {editingIndex !== index && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => handleEditStart(index)}
                        >
                          <Edit3 className="w-3 h-3" />
                          {answers[index] ? "Edit" : "Add Answer"}
                        </Button>
                      )}
                    </div>

                    {editingIndex === index ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editingAnswer}
                          onChange={(e) => setEditingAnswer(e.target.value)}
                          placeholder="Write your answer here..."
                          className="min-h-[100px] text-sm"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleEditSave(index)}
                            className="h-8"
                          >
                            <Save className="w-3 h-3 mr-1" />
                            Save
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
                      <div className="bg-muted/50 rounded-md p-3 min-h-[60px] border-2 border-gray-400">
                        {answers[index] ? (
                          <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{answers[index]}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            {index === 0 ? 'Click "Add Answer" to write your response to this question.' : 'Click "Add Answer" to write your response.'}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Tips Section */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h4 className="text-sm font-semibold text-secondary">Interview Tips</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">Use the STAR method: Situation, Task, Action, Result</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">Prepare specific examples from your projects and experience</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">Research the company's recent projects and values</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">Prepare thoughtful questions to ask the interviewer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}