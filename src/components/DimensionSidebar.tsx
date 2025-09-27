import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Settings, Plus, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface DimensionSidebarProps {
  activeDimensions: string[];
  availableDimensions: string[];
  onToggleDimension: (dimension: string, enabled: boolean) => void;
  onAddDimension: (dimension: string) => void;
  onReorderDimensions: (dimensions: string[]) => void;
}

export function DimensionSidebar({
  activeDimensions,
  availableDimensions,
  onToggleDimension,
  onAddDimension,
  onReorderDimensions
}: DimensionSidebarProps) {
  const [isAddDimensionOpen, setIsAddDimensionOpen] = useState(false);
  const [newDimensionName, setNewDimensionName] = useState("");
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const fixedDimensions = ["Core Skill Match %", "Top 5 Skills (Self-Ranked)"];
  const allDimensions = [...fixedDimensions, ...availableDimensions];

  const handleAddDimension = () => {
    if (newDimensionName.trim() && !allDimensions.includes(newDimensionName.trim())) {
      onAddDimension(newDimensionName.trim());
      setNewDimensionName("");
      setIsAddDimensionOpen(false);
      toast.success("Dimension added successfully!");
    } else if (allDimensions.includes(newDimensionName.trim())) {
      toast.error("Dimension already exists!");
    }
  };

  const handleDragStart = (dimension: string) => {
    if (!fixedDimensions.includes(dimension)) {
      setDraggedItem(dimension);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetDimension: string) => {
    if (draggedItem && !fixedDimensions.includes(targetDimension) && draggedItem !== targetDimension) {
      const newOrder = [...activeDimensions];
      const draggedIndex = newOrder.indexOf(draggedItem);
      const targetIndex = newOrder.indexOf(targetDimension);
      
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedItem);
      
      onReorderDimensions(newOrder);
      toast.success("Dimensions reordered!");
    }
    setDraggedItem(null);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Manage Dimensions
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Dimension Management</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Available Dimensions</h4>
              <Dialog open={isAddDimensionOpen} onOpenChange={setIsAddDimensionOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Dimension</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dimension-name">Dimension Name</Label>
                      <Input
                        id="dimension-name"
                        value={newDimensionName}
                        onChange={(e) => setNewDimensionName(e.target.value)}
                        placeholder="Enter dimension name..."
                        onKeyDown={(e) => e.key === 'Enter' && handleAddDimension()}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddDimension} disabled={!newDimensionName.trim()}>
                        Add
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddDimensionOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {allDimensions.map((dimension) => {
                  const isFixed = fixedDimensions.includes(dimension);
                  const isActive = isFixed || activeDimensions.includes(dimension);
                  
                  return (
                    <div
                      key={dimension}
                      className={`flex items-center gap-3 p-3 rounded-md border ${
                        isActive ? 'bg-accent/20 border-accent' : 'bg-card border-border'
                      } ${!isFixed ? 'cursor-move' : ''}`}
                      draggable={!isFixed}
                      onDragStart={() => handleDragStart(dimension)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(dimension)}
                    >
                      {!isFixed && (
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                      )}
                      
                      <Checkbox
                        id={dimension}
                        checked={isActive}
                        disabled={isFixed}
                        onCheckedChange={(checked: boolean) =>
                          onToggleDimension(dimension, checked)
                        }
                      />
                      
                      <Label
                        htmlFor={dimension}
                        className={`flex-1 text-sm ${isFixed ? 'text-muted-foreground' : ''}`}
                      >
                        {dimension}
                        {isFixed && (
                          <span className="text-xs text-muted-foreground ml-2">(Fixed)</span>
                        )}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>• Fixed dimensions cannot be removed or reordered</p>
            <p>• Drag and drop to reorder optional dimensions</p>
            <p>• Use checkboxes to show/hide dimensions</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}