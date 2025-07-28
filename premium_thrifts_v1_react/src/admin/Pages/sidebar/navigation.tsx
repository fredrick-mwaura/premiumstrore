import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { MenuItem } from './menuItems';
import { menuItems, bottomMenuItems } from './arrayMenu';
import { SidebarProps } from './sidebar';
import ProfileDrop from '../profile/profileDropdown';

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(!isOpen);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverTriggered, setHoverTriggered] = useState(false);

  useEffect(() => {
    setIsCollapsed(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [setIsOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
      setIsOpen(!isOpen);
    }
  };


const openside = () => {
  if (!isOpen) { 
    setIsCollapsed(false);
    setIsOpen(true);
    setHoverTriggered(true); 
  }
};

const closeSide = () => {
  if (hoverTriggered) { 
    setIsCollapsed(true);
    setIsOpen(false);
    setHoverTriggered(false); 
  }
};

  return (
    <div className='h-[100%]'>
      {/* Mobile*/}
      <button
        onClick={toggleSidebar}
        className={cn(
          "fixed top-4 right-2 z-50",
          "p-2 rounded-lg bg-background shadow-md",
          "md:hidden" 
        )}
      >
        {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </button>


      {/* Sidebar */}
      <div
        onMouseEnter={openside}
        onMouseLeave={closeSide}
        className={cn(
          "fixed top-0 left-0 bottom-0 z-40 border-r shadow-sm transition-all duration-300 ease-in-out",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : isCollapsed ? "w-16" : "w-64",
          "bg-background text-foreground"
        )}>
        
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center h-16 px-4 border-b">
            {!isCollapsed && <span className="text-lg font-semibold">Dashboard</span>}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100/50 ml-auto hidden sm:block"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-2">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} isCollapsed={isCollapsed && !isMobile} />
              ))}
            </nav>
          </div>

          {/* Bottom Items */}
          <div className="p-2 border-t">
            <nav className="space-y-1">
              {bottomMenuItems.map((item) => (
                <MenuItem key={item.id} item={item} isCollapsed={isCollapsed && !isMobile} />
              ))}

              {/* <div className="hidden md:flex items-center gap-3 ml-2 border-l pl-4 md:i">
                <ProfileDrop/>
              </div> */}
            </nav>
          </div>
          <hr />
        {/* <div className="hidden md:flex items-center gap-3 mt-2  pl-4 md:i">
         <ProfileDrop/>
        </div> */}
        </div>        
      </div>
    </div>
  );
}
