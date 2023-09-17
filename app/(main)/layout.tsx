import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RootLayout from "../layout";
// This is what controls the redirect when the user has more than 1 server and deletes
// a server 

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    
    <div className="h-full">
      <div
        className="md:flex h-full w-[72px]
            z-30 flex-col fixed inset-y-0"
        >
        
        <NavigationSidebar/>

        </div>
      <main className="md:pl-[72px] h-full">
        {children}
        </main>
    </div>
  );
};

export default MainLayout;
