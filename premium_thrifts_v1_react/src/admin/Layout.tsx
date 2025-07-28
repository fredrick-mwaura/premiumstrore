import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./Pages/header.tsx";
import Sidebar from "./Pages/sidebar/navigation.tsx";  
import { useState } from "react";
import DynamicBreadcrumbs from '../components/breadcrumb.tsx';
import Footer from "./Pages/footer";
import { Outlet } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const { theme } = useTheme();
  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>

        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300
            ${isSidebarOpen ? "md:ml-64" : "md:ml-16"}`} 
        >
          <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} className="z-10"/>
          <main className="flex-1 p-3 w-full z--1">
            <div className="py-2 hidden md:flex">
              <DynamicBreadcrumbs />
            </div>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
