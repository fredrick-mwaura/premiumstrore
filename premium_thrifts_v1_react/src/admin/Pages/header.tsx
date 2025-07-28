import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
import DatePicker from '@/components/ui/Datepicker.tsx';
import ProfileDrop from './profile/profileDropdown'
import { useNavigate } from "react-router-dom";
import { MessageBubble } from "./Messages/messageBubble";
import { useTheme } from "../ThemeProvider";

const Header = ({isSidebarOpen, setIsSidebarOpen, className}) => {
  const { theme, setTheme } = useTheme();

  const  navigate = useNavigate();
  function home() {
    navigate("/admin");
  }

  const notification = () =>{
    navigate("/admin/notifications")
  }
  return (
    <header className="z-3 sticky top-0 flex h-16 items-center justify-between border-b bg-background px-4 shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="flex items-center gap-2">
          <div className="rounded-lg p-2 flex">
            <span className="text-lg font-bold rounded-lg  bg-purple-400 text-primary-foreground pr-2 pl-2" onClick={home}>Premium Thrifts</span> 
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="hidden flex-1 md:block md:max-w-md lg:max-w-lg mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products or orders..."
            className="w-full pl-10 bg-muted/50"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1  justify-center">
          <div className='hidden md:block'>
             <DatePicker />
          </div>
          {/* notifications-container */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-primary/10 cursor-pointer"
            onClick={notification}
          >
            <Bell className="h-5 w-5 text-primary" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center animate-in zoom-in">
                5
              </span>
          </Button>
          <MessageBubble/>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative hover:bg-primary/10 cursor-pointer mr-4 md:ml-8"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

        </div>

        <div className="hidden md:flex items-center gap-3 ml-2 border-l pl-4 md:i">
          <ProfileDrop/>
        </div>
      </div>
    </header>
  );
};

export default Header;