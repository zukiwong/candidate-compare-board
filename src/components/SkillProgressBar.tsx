import { Progress } from "./ui/progress";

interface SkillProgressBarProps {
  percentage: number;
  showPercentage?: boolean;
}

export function SkillProgressBar({ percentage, showPercentage = true }: SkillProgressBarProps) {
  const getColorClass = (percent: number) => {
    if (percent >= 75) return "bg-primary text-white";
    if (percent >= 50) return "bg-accent text-accent-foreground";
    return "bg-secondary text-white";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <Progress value={percentage} className="h-2" />
      </div>
      {showPercentage && (
        <span className={`px-2 py-1 rounded text-white text-sm ${getColorClass(percentage)}`}>
          {percentage}%
        </span>
      )}
    </div>
  );
}