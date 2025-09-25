import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Plus, GripVertical, Settings } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PermanentDimensionSidebarProps {
  activeDimensions: string[];
  availableDimensions: string[];
  onToggleDimension: (dimension: string, enabled: boolean) => void;
  onAddDimension: (dimension: string) => void;
  onReorderDimensions: (dimensions: string[]) => void;
}

export function PermanentDimensionSidebar({
  activeDimensions,
  availableDimensions,
  onToggleDimension,
  onAddDimension,
  onReorderDimensions
}: PermanentDimensionSidebarProps) {
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
    <div className="w-80 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-sidebar-foreground">Dimension Management</h3>
            <p className="text-xs text-muted-foreground">Customize comparison view</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-sidebar-foreground">Available Dimensions</h4>
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
          
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
              {allDimensions.map((dimension) => {
                const isFixed = fixedDimensions.includes(dimension);
                const isActive = isFixed || activeDimensions.includes(dimension);
                
                return (
                  <div
                    key={dimension}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${ 
                      isActive 
                        ? 'bg-sidebar-accent border-sidebar-primary shadow-sm' 
                        : 'bg-sidebar border-sidebar-border hover:bg-sidebar-accent/50'
                    } ${!isFixed ? 'cursor-move' : ''}`}
                    draggable={!isFixed}
                    onDragStart={() => handleDragStart(dimension)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(dimension)}
                  >
                    {!isFixed && (
                      <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                    
                    <Checkbox
                      id={dimension}
                      checked={isActive}
                      disabled={isFixed}
                      onCheckedChange={(checked) => 
                        onToggleDimension(dimension, checked as boolean)
                      }
                      className="flex-shrink-0"
                    />
                    
                    <Label
                      htmlFor={dimension}
                      className={`flex-1 text-sm leading-tight cursor-pointer ${
                        isFixed ? 'text-muted-foreground' : 'text-sidebar-foreground'
                      }`}
                    >
                      {dimension}
                      {isFixed && (
                        <span className="text-xs text-muted-foreground ml-2 block">(Fixed)</span>
                      )}
                    </Label>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-6 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Fixed dimensions cannot be removed</p>
          <p>• Drag & drop to reorder dimensions</p>
          <p>• Use checkboxes to show/hide</p>
        </div>
      </div>
    </div>
  );
}