import { useState, useMemo, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { ComparisonTable } from "./components/ComparisonTable";
import { CandidateCard } from "./components/CandidateCard";
import { MainSidebar } from "./components/MainSidebar";
import { DimensionFilterSidebar } from "./components/DimensionFilterSidebar";
import { JDImportModal } from "./components/JDImportModal";
import { FileText, Users, Search, UserCheck, X, RefreshCw } from "lucide-react";
import { availableDimensions as initialAvailableDimensions } from "./components/mockData";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
// import { apiService } from "./services/api"; // Moved to JDImportModal
import { Candidate } from "./types/candidate";
import { transformBackendCandidates } from "./utils/dataTransform";

export default function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDimensions, setActiveDimensions] = useState([
    "Project Experience",
    "Education",
    "Work Experience",
    "Location / Availability",
    "Candidate Links",
    "Soft Skills"
  ]);
  const [availableDimensions, setAvailableDimensions] = useState<string[]>(initialAvailableDimensions);
  const [highlightedRow, setHighlightedRow] = useState<string>("");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [isJDImportOpen, setIsJDImportOpen] = useState(false);
  const [hasJD, setHasJD] = useState(false);

  // Initialize data
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check JD status
      try {
        const jdStatusResponse = await fetch('http://localhost:3002/api/jd/status');
        if (jdStatusResponse.ok) {
          const jdStatusResult = await jdStatusResponse.json();
          setHasJD(jdStatusResult.data.hasJD);
        }
      } catch (jdError) {
        console.log('无法获取JD状态，默认为false');
        setHasJD(false);
      }

      // Check if there is candidate data
      const candidatesResponse = await fetch('http://localhost:3002/api/candidates');

      if (candidatesResponse.ok) {
        const candidatesResult = await candidatesResponse.json();
        const rawCandidatesData = candidatesResult.data.candidates;

        if (rawCandidatesData && rawCandidatesData.length > 0) {
          // Convert data format
          const transformedCandidates = transformBackendCandidates(rawCandidatesData);
          setCandidates(transformedCandidates);
          toast.success("Candidates loaded successfully");
        } else {
          // If there is no candidate data, try importing sample data
          try {
            const importResponse = await fetch('http://localhost:3002/api/candidates/import', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (importResponse.ok) {
              // Reacquire candidate data
              const newCandidatesResponse = await fetch('http://localhost:3002/api/candidates');
              if (newCandidatesResponse.ok) {
                const newCandidatesResult = await newCandidatesResponse.json();
                const newRawCandidatesData = newCandidatesResult.data.candidates;

                if (newRawCandidatesData && newRawCandidatesData.length > 0) {
                  const transformedCandidates = transformBackendCandidates(newRawCandidatesData);
                  setCandidates(transformedCandidates);
                  toast.success("Sample candidates loaded successfully");
                } else {
                  setCandidates([]);
                  toast.info("No candidate data available");
                }
              }
            } else {
              setCandidates([]);
              toast.info("No candidate data available");
            }
          } catch (importError) {
            setCandidates([]);
            toast.info("No candidate data available");
          }
        }
      } else {
        setCandidates([]);
        toast.error("Failed to connect to backend server");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Initialization of data failed:', err);
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshData = () => {
    initializeData();
  };


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
      // Add to the list of available dimensions
      setAvailableDimensions([...availableDimensions, dimension]);
      // Add to the active dimension list
      setActiveDimensions([...activeDimensions, dimension]);
      toast.success(`"${dimension}" added to comparison`);
    }
  };

  const handleReorderDimensions = (dimensions: string[]) => {
    setActiveDimensions(dimensions);
  };

  const handleRowClick = (dimension: string) => {
    setHighlightedRow(dimension === highlightedRow ? "" : dimension);
  };

  const handleImportJD = () => {
    setIsJDImportOpen(true);
  };

  const handleJDImported = () => {
    // 重新加载候选人数据和JD状态
    initializeData();
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

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefreshData}
                  disabled={loading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh Data
                </Button>

                <Button variant="outline" size="sm" onClick={handleImportJD}>
                  <FileText className="w-4 h-4 mr-2" />
                  Import JD
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 space-y-8">

            {/* Loading status */}
            {loading && (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 mx-auto text-muted-foreground mb-4 animate-spin" />
                <div className="text-lg font-medium text-secondary mb-2">Loading Data...</div>
                <div className="text-sm text-muted-foreground">Initializing candidates and matching analysis</div>
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="text-red-500 mb-4">
                    <X className="w-8 h-8 mx-auto" />
                  </div>
                  <div className="text-lg font-medium text-secondary mb-2">Loading Failed</div>
                  <div className="text-sm text-muted-foreground mb-4">{error}</div>
                  <Button onClick={handleRefreshData} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </div>
              </div>
            )}

            {/* Show message if no results */}
            {!loading && !error && filteredCandidates.length === 0 && searchQuery && (
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
            {!loading && !error && filteredCandidates.length > 0 && (
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
                      hasJD={hasJD}
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
            {!loading && !error && filteredCandidates.length > 0 && (
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
                      hasJDData={hasJD}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* JD Import Modal */}
      <JDImportModal
        isOpen={isJDImportOpen}
        onClose={() => setIsJDImportOpen(false)}
        onJDImported={handleJDImported}
      />
    </div>
  );
}