import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import {
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  Lightbulb,
  ExternalLink
} from "lucide-react";
import { Job } from "../types/job";

interface GapAnalysisCardProps {
  job: Job;
  studentProfile: any;
}

export function GapAnalysisCard({ job, studentProfile }: GapAnalysisCardProps) {
  if (!job.gapAnalysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Gap Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">Gap analysis is being generated...</p>
            <Button variant="outline" size="sm" className="mt-3">
              Generate Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { strengths, gaps, suggestions } = job.gapAnalysis;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Gap Analysis - {job.title}
        </CardTitle>
        <p className="text-sm text-gray-600">
          AI-powered analysis of your profile vs. job requirements
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Match Score */}
        {job.matchScore && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Overall Match Score</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{job.matchScore}%</span>
            </div>
            <Progress value={job.matchScore} className="h-3" />
            <p className="text-sm text-blue-700 mt-2">
              {job.matchScore >= 80 ? "Excellent match!" :
               job.matchScore >= 60 ? "Good match with some areas to improve" :
               "Significant preparation needed"}
            </p>
          </div>
        )}

        {/* Your Strengths */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-green-700 mb-3">
            <CheckCircle className="w-5 h-5" />
            Your Strengths ({strengths.length})
          </h3>
          <div className="space-y-3">
            {strengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-green-800">{strength}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Areas to Improve */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-orange-700 mb-3">
            <AlertTriangle className="w-5 h-5" />
            Areas to Improve ({gaps.length})
          </h3>
          <div className="space-y-3">
            {gaps.map((gap, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-orange-800">{gap}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-700 mb-3">
            <Lightbulb className="w-5 h-5" />
            AI Improvement Suggestions ({suggestions.length})
          </h3>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <Lightbulb className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-purple-800">{suggestion}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Required vs Your Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.required.map((skill) => (
                  <Badge
                    key={skill}
                    variant={studentProfile.skills.programming.includes(skill) ||
                             studentProfile.skills.frameworks.includes(skill) ||
                             studentProfile.skills.tools.includes(skill) ?
                             "default" : "secondary"}
                    className="text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Your Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[...studentProfile.skills.programming, ...studentProfile.skills.frameworks]
                  .slice(0, 6)
                  .map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="default" className="flex-1">
            <Target className="w-4 h-4 mr-2" />
            Create Learning Plan
          </Button>
          <Button variant="outline" className="flex-1">
            <TrendingUp className="w-4 h-4 mr-2" />
            Track Progress
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}