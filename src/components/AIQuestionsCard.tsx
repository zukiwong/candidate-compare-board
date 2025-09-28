import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  MessageSquare,
  Brain,
  CheckCircle,
  Edit3,
  RefreshCw,
  Copy,
  BookOpen
} from "lucide-react";
import { Job } from "../types/job";
import { toast } from "sonner";

interface AIQuestionsCardProps {
  job: Job;
  studentProfile: any;
}

export function AIQuestionsCard({ job, studentProfile }: AIQuestionsCardProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  if (!job.aiQuestions || job.aiQuestions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="w-5 h-5 text-green-500" />
            AI Interview Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Brain className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">AI interview questions are being generated...</p>
            <Button variant="outline" size="sm" className="mt-3">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate Questions
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleQuestionSelect = (question: string) => {
    if (selectedQuestion === question) {
      setSelectedQuestion(null);
      setAnswer("");
    } else {
      setSelectedQuestion(question);
      setAnswer("");
    }
  };

  const handleAnswerSave = () => {
    if (selectedQuestion && answer.trim()) {
      setAnsweredQuestions(new Set([...answeredQuestions, selectedQuestion]));
      toast.success("Answer saved successfully!");
      setSelectedQuestion(null);
      setAnswer("");
    }
  };

  const handleCopyQuestion = (question: string) => {
    navigator.clipboard.writeText(question);
    toast.success("Question copied to clipboard!");
  };

  const getQuestionCategory = (question: string) => {
    if (question.toLowerCase().includes("technical") || question.toLowerCase().includes("code")) {
      return { label: "Technical", color: "bg-blue-100 text-blue-800" };
    } else if (question.toLowerCase().includes("experience") || question.toLowerCase().includes("project")) {
      return { label: "Experience", color: "bg-green-100 text-green-800" };
    } else if (question.toLowerCase().includes("behavioral") || question.toLowerCase().includes("team")) {
      return { label: "Behavioral", color: "bg-purple-100 text-purple-800" };
    } else {
      return { label: "General", color: "bg-gray-100 text-gray-800" };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare className="w-5 h-5 text-green-500" />
          AI Interview Questions - {job.title}
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            AI-generated questions tailored for this position
          </p>
          <Badge variant="outline" className="text-xs">
            {answeredQuestions.size}/{job.aiQuestions.length} Prepared
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Indicator */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-900">Preparation Progress</span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(answeredQuestions.size / job.aiQuestions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-green-700 mt-2">
            {answeredQuestions.size === job.aiQuestions.length
              ? "🎉 All questions prepared! You're ready for the interview."
              : `${job.aiQuestions.length - answeredQuestions.size} questions remaining`}
          </p>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {job.aiQuestions.map((question, index) => {
            const category = getQuestionCategory(question);
            const isAnswered = answeredQuestions.has(question);
            const isSelected = selectedQuestion === question;

            return (
              <div
                key={index}
                className={`border rounded-lg p-4 transition-all ${
                  isSelected ? "border-blue-300 bg-blue-50" :
                  isAnswered ? "border-green-300 bg-green-50" :
                  "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`text-xs ${category.color}`}>
                        {category.label}
                      </Badge>
                      {isAnswered && (
                        <Badge variant="outline" className="text-xs text-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Prepared
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {question}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyQuestion(question)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleQuestionSelect(question)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Answer Input */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prepare your answer:
                    </label>
                    <Textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Write your answer here... Include specific examples and achievements."
                      className="min-h-24 mb-3"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleAnswerSave} size="sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Save Answer
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedQuestion(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="default" className="flex-1">
            <Brain className="w-4 h-4 mr-2" />
            Generate More Questions
          </Button>
          <Button variant="outline" className="flex-1">
            <BookOpen className="w-4 h-4 mr-2" />
            Practice Mode
          </Button>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 Interview Preparation Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use the STAR method (Situation, Task, Action, Result) for behavioral questions</li>
            <li>• Prepare specific examples from your projects and experience</li>
            <li>• Practice your answers out loud to build confidence</li>
            <li>• Research the company and team beforehand</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}