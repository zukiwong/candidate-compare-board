import { X } from "lucide-react";
import { Button } from "./ui/button";

interface DimensionRowProps {
  label: string;
  isRemovable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

export function DimensionRow({ label, isRemovable = false, onRemove, children }: DimensionRowProps) {
  return (
    <div className="border-b border-border py-4 first:pt-0 last:border-b-0">
      <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{label}</span>
          {isRemovable && onRemove && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 hover:opacity-100 transition-opacity"
              onClick={onRemove}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}