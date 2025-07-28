import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { MenuItem as MenuItemType } from "./sidebar";

interface MenuItemProps {
  item: MenuItemType;
  isCollapsed: boolean;
}

export const MenuItem = ({ item, isCollapsed }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.subMenus) {
      setIsOpen(!isOpen);
    } else {
      navigate(`/admin/${item.id}`);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "flex items-center w-full p-2 transition-colors rounded-lg hover:bg-gray-100/50",
          "hover:text-gray-900"
        )}
      >
        <div className="flex items-center gap-4">
          <item.icon className="w-5 h-5" />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
              {item.subMenus && (
                <ChevronRight
                  className={cn(
                    "w-4 h-4 transition-transform",
                    isOpen && "transform rotate-90"
                  )}
                />
              )}
            </>
          )}
        </div>
        
      </button>
      {!isCollapsed && item.subMenus && isOpen && (
        <div className="mt-1 ml-4 space-y-1">
          {item.subMenus.map((subItem) => (
            <button
              key={subItem.id}
              // to avoid full page refresh
              onClick={() => navigate(`/admin/${subItem.id}`)}
              className="flex items-center w-full p-2 transition-colors rounded-lg hover:bg-gray-100/50 group"
            >
              <subItem.icon className="w-4 h-4 mr-3" />
              <span className="text-sm font-medium">{subItem.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
