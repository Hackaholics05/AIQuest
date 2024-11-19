import React, { useEffect, useState } from "react";
import AppSidebar from "./Sidebar";
import Main from "./Main";
import axios from "axios";

const index = () => {
  const [questions, setQuestions] = useState([]);
  
  return (
    <div className="flex min-h-[70vh]">
      <div className="flex w-[70vw] justify-center">
        <AppSidebar />
        {/* <Main  /> */}
        <Main questions={questions} />
      </div>
    </div>
  );
};

export default index;
