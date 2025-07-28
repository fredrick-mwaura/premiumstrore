import { Outlet } from "react-router-dom";
import Header from "../container/Header.jsx";
import Footer from "@/components/footer";

function LayoutClient() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      {/* Header (Fixed or Sticky) */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 p-3 w-full pb-16 md:pb-0">
        <Outlet /> {/* Dynamic Content (Pages) */}
      </main>
      <Footer />
    </div>
  );
}

export default LayoutClient;