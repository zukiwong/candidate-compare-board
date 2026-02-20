import { useState } from "react";
import App from "./App";
import StudentApp from "./StudentApp";

export type UserRole = "employer" | "student";

export default function AppRouter() {
  const [currentRole, setCurrentRole] = useState<UserRole>("student");

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
  };

  if (currentRole === "student") {
    return <StudentApp onRoleChange={handleRoleChange} />;
  }

  return <App onRoleChange={handleRoleChange} />;
}