import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { GapAnalysisCard } from "./GapAnalysisCard";
import { AIQuestionsCard } from "./AIQuestionsCard";
import { ElevatorPitchCard } from "./ElevatorPitchCard";
import {
  ArrowLeft,
  Target,
  MessageSquare,
  TrendingUp,
  User,
  Briefcase,
  GraduationCap,
  MapPin,
  Mail,
  Phone
} from "lucide-react";
import { Job } from "../types/job";

interface StudentInsightsPageProps {
  job: Job;
  studentProfile: any;
  onBack: () => void;
}

export function StudentInsightsPage({ job, studentProfile, onBack }: StudentInsightsPageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {job.title} at {job.company}
              </h1>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">{job.salary}</span>
                </div>
                {job.matchScore && (
                  <Badge variant="outline" className="text-sm">
                    <Target className="w-3 h-3 mr-1" />
                    {job.matchScore}% Match
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Student Profile Summary */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{studentProfile.name}</h2>
              <div className="flex items-center gap-1 text-gray-600 mt-1">
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm">
                  {studentProfile.education.degree} at {studentProfile.education.school}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{studentProfile.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{studentProfile.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="gaps" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Gap Analysis
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Interview Prep
            </TabsTrigger>
            <TabsTrigger value="pitch" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Elevator Pitch
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Job Summary */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Summary</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Role Purpose</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                      {job.description.purpose}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Start Date</h4>
                    <p className="text-sm text-gray-600 mt-1">{job.startDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Duration</h4>
                    <p className="text-sm text-gray-600 mt-1">{job.duration}</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preparation Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Profile Match</span>
                    <Badge variant="outline" className="text-xs">
                      {job.matchScore || 0}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Gap Analysis</span>
                    <Badge variant="outline" className="text-xs">
                      {job.gapAnalysis ? "Ready" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Interview Questions</span>
                    <Badge variant="outline" className="text-xs">
                      {job.aiQuestions?.length || 0} Ready
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Elevator Pitch</span>
                    <Badge variant="outline" className="text-xs">
                      {job.elevatorPitch ? "Ready" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Gap Analysis
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Practice Questions
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Practice Pitch
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gaps">
            <GapAnalysisCard job={job} studentProfile={studentProfile} />
          </TabsContent>

          <TabsContent value="questions">
            <AIQuestionsCard job={job} studentProfile={studentProfile} />
          </TabsContent>

          <TabsContent value="pitch">
            <ElevatorPitchCard job={job} studentProfile={studentProfile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}