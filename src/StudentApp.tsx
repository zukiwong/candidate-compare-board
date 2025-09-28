import { useState, useMemo, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { MainSidebar } from "./components/MainSidebar";
import { DimensionFilterSidebar } from "./components/DimensionFilterSidebar";
import { JobCard } from "./components/JobCard";
import { StudentJobTable } from "./components/StudentJobTable";
import { FileText, Users, Search, UserCheck, X, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { Job } from "./types/job";
import { UserRole } from "./AppRouter";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

interface StudentAppProps {
  onRoleChange: (role: UserRole) => void;
}

export default function StudentApp({ onRoleChange }: StudentAppProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [studentProfile, setStudentProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDimensions, setActiveDimensions] = useState([
    "Company & Role",
    "Requirements Match",
    "Skills Gap",
    "AI Insights",
    "Key Preparation Points"
  ]);
  const [availableDimensions, setAvailableDimensions] = useState<string[]>([
    "Company & Role",
    "Requirements Match",
    "Skills Gap",
    "AI Insights",
    "Key Preparation Points",
    "Salary & Benefits",
    "Team & Culture"
  ]);
  const [highlightedRow, setHighlightedRow] = useState<string>("");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [isCompareMode, setIsCompareMode] = useState(false);

  // Initialize data
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch student profile and jobs concurrently
      const [profileResponse, jobsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/student/profile`),
        fetch(`${API_BASE_URL}/student/jobs`)
      ]);

      if (profileResponse.ok && jobsResponse.ok) {
        const profileResult = await profileResponse.json();
        const jobsResult = await jobsResponse.json();

        setStudentProfile(profileResult.data);
        setJobs(jobsResult.data);
        toast.success("Student data loaded successfully");
      } else {
        throw new Error("Failed to fetch student data");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load student data';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Failed to initialize student data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshData = () => {
    initializeData();
  };

  // Filter jobs based on search query
  const filteredJobs = useMemo(() => {
    let result = jobs;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.skills.required.some(skill => skill.toLowerCase().includes(query)) ||
        job.skills.preferred.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Apply compare mode filter
    if (isCompareMode && selectedJobs.length > 0) {
      result = result.filter(job => selectedJobs.includes(job.id));
    }

    return result;
  }, [jobs, searchQuery, isCompareMode, selectedJobs]);

  // Separate filtered list for comparison table
  const comparisonTableJobs = useMemo(() => {
    if (isCompareMode) {
      return filteredJobs;
    } else {
      if (selectedJobs.length > 0) {
        return filteredJobs.filter(job => selectedJobs.includes(job.id));
      } else {
        return [];
      }
    }
  }, [filteredJobs, isCompareMode, selectedJobs]);

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
      setAvailableDimensions([...availableDimensions, dimension]);
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

  const handleJobSelection = (jobId: string, selected: boolean) => {
    if (selected) {
      if (selectedJobs.length >= 5) {
        toast.error("Maximum 5 jobs can be selected for comparison");
        return;
      }
      setSelectedJobs([...selectedJobs, jobId]);
      const job = jobs.find(j => j.id === jobId);
      toast.success(`${job?.title} added to comparison`);
    } else {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
      const job = jobs.find(j => j.id === jobId);
      toast.success(`${job?.title} removed from comparison`);
    }
  };

  const handleEnterCompareMode = () => {
    if (selectedJobs.length === 0) {
      toast.error("Please select jobs to compare first");
      return;
    }
    setIsCompareMode(true);
    toast.success(`Comparing ${selectedJobs.length} selected jobs`);
  };

  const handleExitCompareMode = () => {
    setIsCompareMode(false);
    toast.success("Returned to full job view");
  };

  const handleClearSelection = () => {
    setSelectedJobs([]);
    setIsCompareMode(false);
    toast.success("Selection cleared");
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Toaster />

      {/* Main Navigation Sidebar */}
      <div className="flex-shrink-0">
        <MainSidebar onRoleChange={onRoleChange} isStudentView={true} />
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
                    placeholder="Search applied jobs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-6 pr-4 py-2 text-sm bg-transparent border-0 border-b border-gray-300 focus:border-gray-500 focus:outline-none transition-colors placeholder-gray-400"
                  />
                </div>
                {searchQuery && (
                  <div className="mt-2 flex items-center gap-3">
                    <p className="text-sm text-gray-600">
                      {filteredJobs.length} result{filteredJobs.length !== 1 ? 's' : ''} found
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
                {selectedJobs.length > 0 && (
                  <Badge variant="outline" className="text-xs border-primary text-primary">
                    <UserCheck className="w-3 h-3 mr-1" />
                    {selectedJobs.length}/5 Selected
                  </Badge>
                )}

                <Badge variant="secondary" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {isCompareMode ? `${filteredJobs.length} Selected` : `${filteredJobs.length} Applied Jobs`}
                </Badge>

                {/* Compare mode controls */}
                {selectedJobs.length > 0 && !isCompareMode && (
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

                {selectedJobs.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={handleClearSelection}>
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                )}
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
                <div className="text-lg font-medium text-secondary mb-2">Loading Student Data...</div>
                <div className="text-sm text-muted-foreground">Fetching your applied jobs and profile information</div>
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
            {!loading && !error && filteredJobs.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-2">No jobs found matching "{searchQuery}"</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              </div>
            )}

            {/* Top Section: Job Comparison Table */}
            {!loading && !error && filteredJobs.length > 0 && studentProfile && (
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-secondary">
                        {isCompareMode ? 'Selected Jobs Comparison' : 'Job Match Analysis'}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {isCompareMode
                          ? `Comparing ${selectedJobs.length} selected jobs side-by-side`
                          : comparisonTableJobs.length > 0
                            ? `Showing ${comparisonTableJobs.length} selected jobs. Click on any row to highlight your strongest matches in that dimension.`
                            : 'Select jobs below to add them to the comparison matrix (max 5)'
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

                {comparisonTableJobs.length > 0 ? (
                  <div className="overflow-x-auto">
                    <StudentJobTable
                      jobs={comparisonTableJobs}
                      studentProfile={studentProfile}
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
                        <h3 className="text-lg font-medium text-secondary mb-2">Ready to Compare Jobs</h3>
                        <p className="text-sm text-muted-foreground">
                          Select up to 5 jobs from the list below to see them compared side-by-side with your profile.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <UserCheck className="w-4 h-4" />
                        <span>Use the checkboxes on job cards to select</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Section: Detailed Job Cards */}
            {!loading && !error && filteredJobs.length > 0 && studentProfile && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-secondary">
                        {isCompareMode ? 'Selected Job Details' : 'Applied Job Positions'}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {isCompareMode
                          ? 'Detailed view of your selected jobs for comparison'
                          : 'Comprehensive overview of each applied position with AI-powered insights and preparation tips'
                        }
                      </p>
                    </div>

                    {!isCompareMode && (
                      <p className="text-xs text-muted-foreground">
                        Select jobs to compare (max 5)
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      studentProfile={studentProfile}
                      isSelected={selectedJobs.includes(job.id)}
                      onSelectionChange={handleJobSelection}
                      selectionDisabled={!selectedJobs.includes(job.id) && selectedJobs.length >= 2}
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