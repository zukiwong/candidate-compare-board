import { useState } from "react";
import { Button } from "./ui/button";
import { 
  LayoutDashboard, 
  Search, 
  Users, 
  Building, 
  Calendar,
  LogOut
} from "lucide-react";
import logo from "figma:asset/e2d8b480c5a427d4be92cf3c3dde8a8779106e90.png";
import avatar from "../assets/avatar.png";

export function MainSidebar() {
  const [activeTab, setActiveTab] = useState("candidates");

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "search", label: "Job search", icon: Search },
    { id: "candidates", label: "Candidates", icon: Users },
    { id: "organisations", label: "Organisations", icon: Building },
    { id: "events", label: "Events", icon: Calendar },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 flex-shrink-0">
        <img src={logo} alt="Summer of Tech" className="h-10 w-auto" />
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
              activeTab === item.id
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-900">ONE New Zealand</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-gray-600 hover:text-gray-900 p-0 h-auto"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log out
        </Button>
      </div>
    </div>
  );
}