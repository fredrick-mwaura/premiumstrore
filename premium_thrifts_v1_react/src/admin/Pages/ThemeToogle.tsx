import { useColorScheme } from "@mui/material/styles";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button"; 
const ThemeToggle = () => {
  const { mode, setMode } = useColorScheme();

  // Cycle through themes: light → dark → system
  const toggleTheme = () => {
    const nextTheme = mode === "light" ? "dark" : mode === "dark" ? "system" : "light";
    setMode(nextTheme as "light" | "dark" | "system");
  };

  return (
    <Button onClick={toggleTheme} variant="outline" className="flex items-center space-x-2">
      {mode === "light" && <Sun className="h-5 w-5 text-yellow-500" />}
      {mode === "dark" && <Moon className="h-5 w-5 text-gray-200" />}
      {mode === "system" && <Monitor className="h-5 w-5 text-blue-500" />}
      <span className="capitalize">{mode}<Sun/></span>
    </Button>
  );
};

export default ThemeToggle;
