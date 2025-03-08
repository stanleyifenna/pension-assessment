import React, { useState, useEffect, ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [matches, setMatches] = useState<boolean>(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <Header />
      <div className="flex">
        {matches ? (
          <div className="w-full h-full">
            <div className="bg-gray-200 p-4 max-h-fit ml-[0px]">{children}</div>
          </div>
        ) : (
          <>
            <Sidebar />
            <div className="w-full h-full">
              <div className="bg-gray-200 p-4 max-h-fit xl:ml-[300px] ml-[300px]">
                {children}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Layout;