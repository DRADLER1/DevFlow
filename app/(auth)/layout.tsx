import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex-center min-h-screen">{children}</main>;
};

export default Layout;
