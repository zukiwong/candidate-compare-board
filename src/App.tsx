import { useState, useMemo } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { ComparisonTable } from "./components/ComparisonTable";
import { CandidateCard } from "./components/CandidateCard";
import { MainSidebar } from "./components/MainSidebar";
import { DimensionFilterSidebar } from "./components/DimensionFilterSidebar";
import { Download, Users, Search, UserCheck, X } from "lucide-react";
import { mockCandidates, availableDimensions } from "./components/mockData";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [candidates] = useState(mockCandidates);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDimensions, setActiveDimensions] = useState([
    "Project Experience",
    "Education", 
    "Work Experience",
    "Location / Availability",
    "Candidate Links",
    "Soft Skills"
  ]);
  const [highlightedRow, setHighlightedRow] = useState<string>("");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [isCompareMode, setIsCompareMode] = useState(false);

  // Filter candidates based on search query
  const filteredCandidates = useMemo(() => {
    let result = candidates;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(candidate => 
        candidate.name.toLowerCase().includes(query) ||
        candidate.education.school.toLowerCase().includes(query) ||
        candidate.education.degree.toLowerCase().includes(query) ||
        candidate.location.current.toLowerCase().includes(query) ||
        candidate.topSkills.some(skill => skill.name.toLowerCase().includes(query)) ||
        candidate.workExperience.positions.some(work => 
          work.company.toLowerCase().includes(query) ||
          work.position.toLowerCase().includes(query)
        ) ||
        candidate.projects.some(project => project.title.toLowerCase().includes(query))
      );
    }
    
    // Apply compare mode filter
    if (isCompareMode && selectedCandidates.length > 0) {
      result = result.filter(candidate => selectedCandidates.includes(candidate.id));
    }
    
    return result;
  }, [candidates, searchQuery, isCompareMode, selectedCandidates]);

  // Separate filtered list for comparison table (max 5 candidates)
  const comparisonTableCandidates = useMemo(() => {
    if (isCompareMode) {
      // In compare mode, show only selected candidates (already limited to 5)
      return filteredCandidates;
    } else {
      // In normal mode, show selected candidates if any, otherwise empty
      if (selectedCandidates.length > 0) {
        return filteredCandidates.filter(candidate => selectedCandidates.includes(candidate.id));
      } else {
        return [];
      }
    }
  }, [filteredCandidates, isCompareMode, selectedCandidates]);

  // Create a derived selection state for visual display
  // In normal mode: candidates in comparison table appear selected
  // In compare mode: only actually selected candidates appear selected
  const displayedAsSelected = useMemo(() => {
    if (isCompareMode) {
      return selectedCandidates;
    } else {
      return comparisonTableCandidates.map(candidate => candidate.id);
    }
  }, [isCompareMode, selectedCandidates, comparisonTableCandidates]);

  const handleToggleDimension = (dimension: string, enabled: boolean) => {
    if (enabled && !activeDimensions.includes(dimension)) {
      setActiveDimensions([...activeDimensions, dimension]);
      toast.success(`${dimension} added to comparison`);
    } else if (!enabled && activeDimensions.includes(dimension)) {
      setActiveDimensions(activeDimensions.filter(d => d !== dimension));
      toast.success(`${dimension} removed from comparison`);
    }
  };

  const handleAddDimension = (dimension: string) => {
    if (!activeDimensions.includes(dimension) && !availableDimensions.includes(dimension)) {
      setActiveDimensions([...activeDimensions, dimension]);
    }
  };

  const handleReorderDimensions = (dimensions: string[]) => {
    setActiveDimensions(dimensions);
  };

  const handleRowClick = (dimension: string) => {
    setHighlightedRow(dimension === highlightedRow ? "" : dimension);
  };

  const handleExport = () => {
    toast.success("Export feature coming soon!");
  };

  const handleCandidateSelection = (candidateId: string, selected: boolean) => {
    if (selected) {
      if (selectedCandidates.length >= 5) {
        toast.error("Maximum 5 candidates can be selected for comparison");
        return;
      }
      setSelectedCandidates([...selectedCandidates, candidateId]);
      const candidate = candidates.find(c => c.id === candidateId);
      toast.success(`${candidate?.name} added to comparison`);
    } else {
      setSelectedCandidates(selectedCandidates.filter(id => id !== candidateId));
      const candidate = candidates.find(c => c.id === candidateId);
      toast.success(`${candidate?.name} removed from comparison`);
    }
  };

  const handleEnterCompareMode = () => {
    if (selectedCandidates.length === 0) {
      toast.error("Please select candidates to compare first");
      return;
    }
    setIsCompareMode(true);
    toast.success(`Comparing ${selectedCandidates.length} selected candidates`);
  };

  const handleExitCompareMode = () => {
    setIsCompareMode(false);
    toast.success("Returned to full candidate view");
  };

  const handleClearSelection = () => {
    setSelectedCandidates([]);
    setIsCompareMode(false);
    toast.success("Selection cleared");
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Toaster />
      
      {/* Main Navigation Sidebar */}
      <div className="flex-shrink-0">
        <MainSidebar />
      </div>
      
      {/* Secondary Sidebar - Dimension Management */}
      <div className="flex-shrink-0">
        <DimensionFilterSidebar
          activeDimensions={activeDimensions}
          availableDimensions={availableDimensions}
          onToggleDimension={handleToggleDimension}
          onAddDimension={handleAddDimension}
          onReorderDimensions={handleReorderDimensions}
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header with Search Bar */}
        <div className="bg-white border-b border-border shadow-sm flex-shrink-0">
          <div className="p-4">
            <div className="flex items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search list of organizations"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-6 pr-4 py-2 text-sm bg-transparent border-0 border-b border-gray-300 focus:border-gray-500 focus:outline-none transition-colors placeholder-gray-400"
                  />
                </div>
                {searchQuery && (
                  <div className="mt-2 flex items-center gap-3">
                    <p className="text-sm text-gray-600">
                      {filteredCandidates.length} result{filteredCandidates.length !== 1 ? 's' : ''} found
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSearchQuery("")}
                      className="text-primary hover:text-primary hover:bg-primary/5 h-auto p-1"
                    >
                      Clear search
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Right side controls */}
              <div className="flex items-center gap-3 ml-6">
                {/* Selection status */}
                {selectedCandidates.length > 0 && (
                  <Badge variant="outline" className="text-xs border-primary text-primary">
                    <UserCheck className="w-3 h-3 mr-1" />
                    {selectedCandidates.length}/5 Selected
                  </Badge>
                )}
                
                <Badge variant="secondary" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {isCompareMode ? `${filteredCandidates.length} Selected` : `${filteredCandidates.length} of ${candidates.length} Candidates`}
                </Badge>
                
                {/* Compare mode controls */}
                {selectedCandidates.length > 0 && !isCompareMode && (
                  <Button variant="default" size="sm" onClick={handleEnterCompareMode}>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Compare Selected
                  </Button>
                )}
                
                {isCompareMode && (
                  <Button variant="outline" size="sm" onClick={handleExitCompareMode}>
                    View All
                  </Button>
                )}
                
                {selectedCandidates.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={handleClearSelection}>
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                )}
                
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 space-y-8">

            {/* Show message if no results */}
            {filteredCandidates.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-2">No candidates found matching "{searchQuery}"</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              </div>
            )}

            {/* Top Section: Comparison Table */}
            {filteredCandidates.length > 0 && (
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-secondary">
                        {isCompareMode ? 'Selected Candidates Comparison' : 'Candidate Comparison Matrix'}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {isCompareMode 
                          ? `Comparing ${selectedCandidates.length} selected candidates side-by-side`
                          : comparisonTableCandidates.length > 0 
                            ? `Showing ${comparisonTableCandidates.length} selected candidates. Click on any row to highlight candidates with the strongest performance in that dimension.`
                            : 'Select candidates below to add them to the comparison matrix (max 5)'
                        }
                      </p>
                    </div>
                    
                    {isCompareMode && (
                      <Badge variant="default" className="text-xs">
                        Compare Mode
                      </Badge>
                    )}
                  </div>
                </div>
                
                {comparisonTableCandidates.length > 0 ? (
                  <div className="overflow-x-auto">
                    <ComparisonTable
                      candidates={comparisonTableCandidates}
                      activeDimensions={activeDimensions}
                      highlightedRow={highlightedRow}
                      onRowClick={handleRowClick}
                    />
                  </div>
                ) : (
                  <div className="border border-border rounded-lg p-8 text-center bg-card">
                    <div className="max-w-md mx-auto">
                      <div className="mb-4">
                        <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                        <h3 className="text-lg font-medium text-secondary mb-2">Ready to Compare Candidates</h3>
                        <p className="text-sm text-muted-foreground">
                          Select up to 5 candidates from the list below to see them compared side-by-side in this matrix.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <UserCheck className="w-4 h-4" />
                        <span>Use the checkboxes on candidate cards to select</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Section: Detailed Candidate Cards */}
            {filteredCandidates.length > 0 && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-secondary">
                        {isCompareMode ? 'Selected Candidate Details' : 'Detailed Candidate Profiles'}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {isCompareMode 
                          ? 'Detailed view of your selected candidates for comparison'
                          : 'Comprehensive overview of each candidate with AI-suggested follow-up questions'
                        }
                      </p>
                    </div>
                    
                    {!isCompareMode && (
                      <p className="text-xs text-muted-foreground">
                        Select candidates to compare (max 5)
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCandidates.map((candidate) => (
                    <CandidateCard 
                      key={candidate.id} 
                      candidate={candidate}
                      isSelected={selectedCandidates.includes(candidate.id)}
                      onSelectionChange={handleCandidateSelection}
                      selectionDisabled={!selectedCandidates.includes(candidate.id) && selectedCandidates.length >= 5}
                      showSelection={!isCompareMode}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}