import { useState } from "react";
import LandingPage from "./Landing";
import AIPhysioIntake from "./Intake";

export default function App() {
  const path = window.location.pathname;
  if (path === "/assessment") return <AIPhysioIntake />;
  return <LandingPage />;
}