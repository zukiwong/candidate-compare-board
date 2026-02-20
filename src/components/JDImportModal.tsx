import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Loader2, FileText, Sparkles, CheckCircle } from "lucide-react";
import { apiService } from "../services/api";
import { toast } from "sonner";

interface JDImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJDImported: () => void;
}

export function JDImportModal({ isOpen, onClose, onJDImported }: JDImportModalProps) {
  const [jdText, setJdText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [parsedJD, setParsedJD] = useState<any>(null);
  const [step, setStep] = useState<"input" | "parsing" | "result" | "importing">("input");
  const [importProgress, setImportProgress] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  const [isImporting, setIsImporting] = useState(false);

  // Calculate dynamic height based on content
  const getTextareaStyle = () => {
    if (!jdText.trim()) {
      return { minHeight: '250px' };
    }

    const lineCount = jdText.split('\n').length;
    const charCount = jdText.length;

    // Base height is 250px, add more height for longer content
    if (charCount > 2000 || lineCount > 15) {
      return { minHeight: '500px', maxHeight: '600px' };
    } else if (charCount > 1000 || lineCount > 8) {
      return { minHeight: '400px', maxHeight: '500px' };
    } else if (charCount > 300 || lineCount > 4) {
      return { minHeight: '350px', maxHeight: '400px' };
    }

    return { minHeight: '300px' };
  };

  const handleImport = async () => {
    if (!jdText.trim()) {
      toast.error("Please enter JD text");
      return;
    }

    setIsLoading(true);
    setStep("parsing");

    try {
      // 解析JD文本
      const parseResult = await apiService.parseJD(jdText);
      setParsedJD(parseResult.data);
      setStep("result");

      toast.success("JD parsed successfully!");
    } catch (error) {
      toast.error("Failed to parse JD");
      console.error("JD parsing error:", error);
      setStep("input");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to gradually increase progress
  const animateProgress = (fromValue: number, toValue: number, duration: number = 2000) => {
    return new Promise<void>((resolve) => {
      const startTime = Date.now();
      const startValue = fromValue;
      const totalChange = toValue - fromValue;

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Use easeInOut for smooth animation
        const easeProgress = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const currentValue = startValue + (totalChange * easeProgress);
        setProgressValue(Math.round(currentValue));

        if (progress < 1) {
          requestAnimationFrame(updateProgress);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(updateProgress);
    });
  };

  const handleConfirmAndMatch = async () => {
    setIsImporting(true);
    setStep("importing");
    setProgressValue(0);

    try {
      // Step 1: Import candidates
      setImportProgress("Importing candidate data...");
      await animateProgress(0, 20, 1000);
      await apiService.importCandidates();

      // Step 2: Calculate matches with AI - this takes the longest
      setImportProgress("Analyzing candidates and generating AI questions...");

      // Start AI analysis and animate progress simultaneously
      const aiAnalysisPromise = apiService.batchCalculateMatches();
      const progressAnimationPromise = animateProgress(20, 85, 3000); // Slower animation for AI analysis

      // Wait for both to complete
      await Promise.all([aiAnalysisPromise, progressAnimationPromise]);

      // Step 3: Success
      setImportProgress("Complete! Refreshing candidate data...");
      await animateProgress(85, 95, 800);

      // Small delay to ensure backend data is fully updated
      await new Promise(resolve => setTimeout(resolve, 500));
      await animateProgress(95, 100, 500);

      toast.success("JD imported and candidates matched successfully!");

      // Trigger data refresh in parent component
      onJDImported();
      handleClose();
    } catch (error) {
      toast.error("Failed to match candidates with JD");
      console.error("Matching error:", error);
      setStep("result"); // Go back to result step on error
      setIsImporting(false);
    } finally {
      setIsImporting(false);
      setImportProgress("");
      setProgressValue(0);
    }
  };

  const handleClose = () => {
    setJdText("");
    setParsedJD(null);
    setStep("input");
    setImportProgress("");
    setProgressValue(0);
    setIsImporting(false);
    onClose();
  };

  const renderInputStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Import Job Description
        </DialogTitle>
        <DialogDescription>
          Paste your job description text below and our AI will parse it into structured data for candidate matching.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Job Description Text
          </label>
          <Textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste your job description here..."
            className="resize-none transition-all duration-300 ease-in-out"
            style={getTextareaStyle()}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!jdText.trim() || isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Parse with AI
          </Button>
        </div>
      </div>
    </>
  );

  const renderParsingStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Parsing Job Description
        </DialogTitle>
        <DialogDescription>
          Our AI is analyzing your job description to extract key requirements and skills.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 text-center py-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div>
          <p className="text-lg font-medium">AI is analyzing your JD...</p>
          <p className="text-sm text-muted-foreground">
            Extracting skills, requirements, and key information
          </p>
        </div>
      </div>
    </>
  );

  const renderResultStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          JD Parsing Complete
        </DialogTitle>
        <DialogDescription>
          Review the parsed information below and confirm to import candidates and generate AI interview questions.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 min-w-0 overflow-hidden">
        {parsedJD && (
          <div className="space-y-4 min-w-0">
            <div>
              <h4 className="font-semibold mb-2">Position Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Title:</span>
                  <div className="font-medium">{parsedJD.title || "N/A"}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Company:</span>
                  <div className="font-medium">{parsedJD.company || "N/A"}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Location:</span>
                  <div className="font-medium">{parsedJD.location || "N/A"}</div>
                </div>
              </div>
            </div>

            {parsedJD.responsibilities && parsedJD.responsibilities.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Key Responsibilities</h4>
                <div className="space-y-2">
                  {parsedJD.responsibilities.slice(0, 4).map((responsibility: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 text-sm min-w-0">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground break-words min-w-0 flex-1">{responsibility}</p>
                    </div>
                  ))}
                  {parsedJD.responsibilities.length > 4 && (
                    <p className="text-xs text-muted-foreground pl-4">
                      +{parsedJD.responsibilities.length - 4} more responsibilities
                    </p>
                  )}
                </div>
              </div>
            )}

            {parsedJD.skills && parsedJD.skills.length > 0 && (
              <div className="min-w-0">
                <h4 className="font-semibold mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2 min-w-0">
                  {parsedJD.skills.slice(0, 10).map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {parsedJD.skills.length > 10 && (
                    <Badge variant="outline" className="text-xs">
                      +{parsedJD.skills.length - 10} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {parsedJD.softSkills && parsedJD.softSkills.length > 0 && (
              <div className="min-w-0">
                <h4 className="font-semibold mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-2 min-w-0">
                  {parsedJD.softSkills.slice(0, 8).map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {parsedJD.softSkills.length > 8 && (
                    <Badge variant="outline" className="text-xs">
                      +{parsedJD.softSkills.length - 8} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep("input")}>
            Back to Edit
          </Button>
          <Button
            onClick={handleConfirmAndMatch}
            disabled={isImporting}
            className="bg-primary hover:bg-primary/90"
          >
            {isImporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4 mr-2" />
            )}
            Import & Match Candidates
          </Button>
        </div>
      </div>
    </>
  );

  const renderImportingStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Importing & Matching
        </DialogTitle>
        <DialogDescription>
          Processing candidates and generating AI interview questions. This may take a few minutes.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-8">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-lg font-medium mb-4">{importProgress}</p>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progressValue}%</span>
            </div>
            <Progress value={progressValue} className="w-full" />
          </div>

          <p className="text-sm text-muted-foreground text-center">
            This process involves AI analysis for each candidate, which takes time to ensure quality results.
          </p>
        </div>
      </div>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto overflow-x-hidden w-full">
        {step === "input" && renderInputStep()}
        {step === "parsing" && renderParsingStep()}
        {step === "result" && renderResultStep()}
        {step === "importing" && renderImportingStep()}
      </DialogContent>
    </Dialog>
  );
}