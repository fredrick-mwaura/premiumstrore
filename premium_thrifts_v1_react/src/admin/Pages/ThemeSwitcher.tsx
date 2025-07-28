// src/components/ThemeSwitcher.tsx

import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust path if needed
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Adjust path if needed

const ThemeSwitcher = () => {
  const { mode, setMode } = useColorScheme(); // Get theme state

  if (!mode) return null;

  // Cycle through themes when button is clicked
  const toggleTheme = () => {
    const nextTheme = mode === "light" ? "dark" : mode === "dark" ? "system" : "light";
    setMode(nextTheme as "light" | "dark" | "system");
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Toggle Button - Cycles Through Themes */}
      <Button onClick={toggleTheme} variant="outline" className="flex items-center space-x-2">
        {mode === "light" && <Sun className="h-5 w-5 text-yellow-500" />}
        {mode === "dark" && <Moon className="h-5 w-5 text-gray-100" />}
        {mode === "system" && <Monitor className="h-5 w-5 text-blue-500" />}
      </Button>

      {/* Dropdown Theme Selector */}
      <Select value={mode} onValueChange={(value) => setMode(value as "light" | "dark" | "system")}>
        <SelectTrigger className="w-[160px] flex items-center justify-between">
          <SelectValue>{mode.charAt(0).toUpperCase() + mode.slice(1)}</SelectValue>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-yellow-500" /> <span>Light</span>
            </div>
          </SelectItem>
          <SelectItem value="dark">
            <div className="flex items-center space-x-2">
              <Moon className="h-4 w-4 text-gray-200" /> <span>Dark</span>
            </div>
          </SelectItem>
          <SelectItem value="system">
            <div className="flex items-center space-x-2">
              <Monitor className="h-4 w-4 text-blue-500" /> <span>System</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSwitcher;
