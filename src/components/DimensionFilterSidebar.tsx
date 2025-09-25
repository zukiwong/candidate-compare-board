import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { 
  Plus, 
  GripVertical,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface DimensionFilterSidebarProps {
  activeDimensions: string[];
  availableDimensions: string[];
  onToggleDimension: (dimension: string, enabled: boolean) => void;
  onAddDimension: (dimension: string) => void;
  onReorderDimensions: (dimensions: string[]) => void;
}

export function DimensionFilterSidebar({
  activeDimensions,
  availableDimensions,
  onToggleDimension,
  onAddDimension,
  onReorderDimensions
}: DimensionFilterSidebarProps) {
  const [showActiveDimensions, setShowActiveDimensions] = useState(true);
  const [showAvailableDimensions, setShowAvailableDimensions] = useState(true);
  const [newDimension, setNewDimension] = useState("");
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleAddCustomDimension = () => {
    if (newDimension.trim()) {
      onAddDimension(newDimension.trim());
      setNewDimension("");
    }
  };

  const handleDragStart = (e: React.DragEvent, dimension: string) => {
    setDraggedItem(dimension);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (!draggedItem) return;

    const dragIndex = activeDimensions.indexOf(draggedItem);
    if (dragIndex === -1) return;

    // Create new array with reordered items
    const newDimensions = [...activeDimensions];
    const [removed] = newDimensions.splice(dragIndex, 1);
    newDimensions.splice(dropIndex, 0, removed);

    onReorderDimensions(newDimensions);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const inactiveDimensions = availableDimensions.filter(
    dim => !activeDimensions.includes(dim)
  );

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Manage Dimensions</h3>
        <p className="text-sm text-gray-600 mt-1">
          Customize your comparison view
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Active Dimensions */}
          <Collapsible open={showActiveDimensions} onOpenChange={setShowActiveDimensions}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                {showActiveDimensions ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <span className="text-sm font-medium text-gray-900">Active Dimensions</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {activeDimensions.length}
              </Badge>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-2 mt-2">
              {activeDimensions.map((dimension, index) => (
                <div
                  key={dimension}
                  draggable
                  onDragStart={(e) => handleDragStart(e, dimension)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                    draggedItem === dimension
                      ? "opacity-50 bg-blue-50 border border-blue-200"
                      : dragOverIndex === index
                      ? "bg-blue-50 border border-blue-200 border-dashed"
                      : "bg-gray-50"
                  }`}
                >
                  <GripVertical className="w-4 h-4 text-gray-400 cursor-grab hover:text-gray-600" />
                  <div className="flex-1">
                    <span className="text-sm text-gray-900">{dimension}</span>
                  </div>
                  <Switch
                    checked={true}
                    onCheckedChange={(checked) => onToggleDimension(dimension, checked)}
                    size="sm"
                  />
                </div>
              ))}
              
              {activeDimensions.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-4">
                  No active dimensions
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Available Dimensions */}
          <Collapsible open={showAvailableDimensions} onOpenChange={setShowAvailableDimensions}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                {showAvailableDimensions ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <span className="text-sm font-medium text-gray-900">Available Dimensions</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {inactiveDimensions.length}
              </Badge>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-2 mt-2">
              {inactiveDimensions.map((dimension) => (
                <div
                  key={dimension}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <span className="text-sm text-gray-700">{dimension}</span>
                  </div>
                  <Switch
                    checked={false}
                    onCheckedChange={(checked) => onToggleDimension(dimension, checked)}
                    size="sm"
                  />
                </div>
              ))}
              
              {inactiveDimensions.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-4">
                  All dimensions active
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Add Custom Dimension */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Add Custom Dimension</h4>
            <div className="space-y-3">
              <Input
                placeholder="Enter dimension name..."
                value={newDimension}
                onChange={(e) => setNewDimension(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddCustomDimension();
                  }
                }}
                className="text-sm"
              />
              <Button
                onClick={handleAddCustomDimension}
                disabled={!newDimension.trim()}
                size="sm"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Dimension
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 space-y-1">
          <div>Active: {activeDimensions.length}</div>
          <div>Available: {inactiveDimensions.length}</div>
        </div>
      </div>
    </div>
  );
}