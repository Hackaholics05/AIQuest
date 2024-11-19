import React from "react";
import MainQuestion from "./MainQuestion.jsx";
import SidebarComponent from "../Sidebar/Sidebar.jsx";

const Index = () => {
  return (
    <div className="min-w-fit flex min-h-[85vh]">
      <div className="flex w-full justify-center">
        <SidebarComponent />
        <MainQuestion />
      </div>
    </div>
  );
};

export default Index;
