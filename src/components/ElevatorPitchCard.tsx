import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  Target,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Edit3,
  CheckCircle,
  Mic,
  Volume2
} from "lucide-react";
import { Job } from "../types/job";
import { toast } from "sonner";

interface ElevatorPitchCardProps {
  job: Job;
  studentProfile: any;
}

export function ElevatorPitchCard({ job, studentProfile }: ElevatorPitchCardProps) {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [customPitch, setCustomPitch] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  if (!job.elevatorPitch) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-purple-500" />
            Elevator Pitch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Target className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">Elevator pitch is being prepared...</p>
            <Button variant="outline" size="sm" className="mt-3">
              Generate Pitch Points
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { keyPoints, timeframe } = job.elevatorPitch;
  const maxSeconds = timeframe === "5-10 minutes" ? 600 : 300; // 10 minutes or 5 minutes

  const startTimer = () => {
    setIsTimerRunning(true);
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev >= maxSeconds) {
          setIsTimerRunning(false);
          clearInterval(interval);
          toast.info("Time's up! Great practice session.");
          return maxSeconds;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyPitch = () => {
    const pitchText = keyPoints.join('\n\n');
    navigator.clipboard.writeText(pitchText);
    toast.success("Pitch points copied to clipboard!");
  };

  const handleSaveCustomPitch = () => {
    if (customPitch.trim()) {
      toast.success("Custom pitch saved successfully!");
      setIsEditing(false);
    }
  };

  const getTimerColor = () => {
    const progress = timerSeconds / maxSeconds;
    if (progress < 0.5) return "text-green-600";
    if (progress < 0.8) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5 text-purple-500" />
          Elevator Pitch - {job.title}
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {timeframe} self-introduction for {job.company}
          </p>
          <Badge variant="outline" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {timeframe}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer Section */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">Practice Timer</span>
            </div>
            <div className={`text-2xl font-bold ${getTimerColor()}`}>
              {formatTime(timerSeconds)}
            </div>
          </div>

          <div className="w-full bg-purple-200 rounded-full h-2 mb-3">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                timerSeconds / maxSeconds < 0.5 ? 'bg-green-500' :
                timerSeconds / maxSeconds < 0.8 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min((timerSeconds / maxSeconds) * 100, 100)}%` }}
            ></div>
          </div>

          <div className="flex gap-2">
            {!isTimerRunning ? (
              <Button onClick={startTimer} size="sm" variant="default">
                <Play className="w-4 h-4 mr-2" />
                Start Practice
              </Button>
            ) : (
              <Button onClick={pauseTimer} size="sm" variant="outline">
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            )}
            <Button onClick={resetTimer} size="sm" variant="ghost">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Key Points */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Key Points to Cover</h3>
            <Button variant="ghost" size="sm" onClick={handleCopyPitch}>
              <Copy className="w-4 h-4 mr-2" />
              Copy All
            </Button>
          </div>

          <div className="space-y-3">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 leading-relaxed">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Pitch Editor */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Your Custom Pitch</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={customPitch}
                onChange={(e) => setCustomPitch(e.target.value)}
                placeholder="Write your personalized elevator pitch here... Use the key points above as guidance."
                className="min-h-32"
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveCustomPitch} size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Pitch
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-blue-50 rounded-lg">
              {customPitch ? (
                <p className="text-sm text-blue-800 leading-relaxed">{customPitch}</p>
              ) : (
                <p className="text-sm text-blue-600 italic">
                  Click "Edit" to create your personalized pitch based on the key points above.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Practice Tips */}
        <div className="bg-amber-50 p-4 rounded-lg">
          <h4 className="font-medium text-amber-900 mb-2">🎯 Practice Tips</h4>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• Start strong with your name and current status</li>
            <li>• Connect your experience to their specific needs</li>
            <li>• Include 1-2 concrete achievements or projects</li>
            <li>• End with enthusiasm about the opportunity</li>
            <li>• Practice until it feels natural, not rehearsed</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="default" className="flex-1">
            <Mic className="w-4 h-4 mr-2" />
            Record Practice
          </Button>
          <Button variant="outline" className="flex-1">
            <Volume2 className="w-4 h-4 mr-2" />
            Listen to Example
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}