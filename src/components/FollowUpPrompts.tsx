import { useState } from "react";
import { Lightbulb, Copy } from "lucide-react";
import { toast } from "sonner";

interface FollowUpPromptsProps {
  prompts: string[];
}

export function FollowUpPrompts({ prompts }: FollowUpPromptsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied to clipboard!");
  };

  // Show only first prompt by default, all when expanded
  const displayedPrompts = isExpanded ? prompts : prompts.slice(0, 1);
  const hasMorePrompts = prompts.length > 1;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          <h5 className="text-sm font-semibold text-secondary">AI Suggested Follow-ups</h5>
        </div>
        {hasMorePrompts && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {isExpanded ? 'Collapse' : `Show all (${prompts.length})`}
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {displayedPrompts.map((prompt, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-md border border-border hover:bg-accent/20 hover:border-primary/20 group cursor-pointer transition-all"
            onClick={() => handleCopyPrompt(prompt)}
          >
            <span className="text-primary font-medium mt-0.5">•</span>
            <span className="text-sm flex-1 leading-relaxed">{prompt}</span>
            <Copy className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
}