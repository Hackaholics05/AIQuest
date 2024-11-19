import React from "react";
import { FilterList } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Questions from "./Questions";

// const Main = () => {
const Main = ({ questions }) => {

  return (
    <div className="flex flex-col p-4 flex-[0.75] md:flex-[0.6]">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-normal text-xl text-gray-800">All Questions</h2>
          <Link to="/add-question">
            <button className="px-4 py-2 bg-blue-500 text-white border border-blue-200 rounded-md cursor-pointer hover:bg-blue-600">
              Ask Question
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-between text-lg text-gray-800 pb-3 border-b border-gray-300 mt-2">
          <p>{questions.length} questions</p>
          <div className="flex items-center space-x-5">
            <div className="flex border border-gray-600 rounded-md">
              <Link to="/" className="px-2 py-1 text-sm border-r border-gray-600">
                Newest
              </Link>
              <Link to="/" className="px-2 py-1 text-sm border-r border-gray-600">
                Active
              </Link>
              <Link to="/" className="px-2 py-1 text-sm">
                More
              </Link>
            </div>
            <div className="flex items-center px-2 py-1 bg-blue-50 border border-blue-500 rounded-md text-blue-600 cursor-pointer">
              <FilterList className="text-lg mr-1" />
              <p className="text-sm">Filter</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full mt-4">
          {questions?.map((_q, index) => (
            <div
              key={index}
              className="flex flex-col py-4 border-b border-gray-200 w-full"
            >
              <Questions data={_q} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;


