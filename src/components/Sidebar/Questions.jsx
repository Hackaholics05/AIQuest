import React from "react";
import { Avatar } from "@mui/material";
import ReactHtmlParser from "html-react-parser";
import { Link } from "react-router-dom";
import { stringAvatar } from "../../lib/Avatar";

const Questions = ({ data }) => {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const tags = JSON.parse(data?.tags[0]);

  return (
    <div className="w-full py-5 border-b border-gray-200">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col items-center mr-8 text-gray-700 text-sm">
          <div className="mb-3 flex flex-col items-center">
            <p className="text-lg font-medium">0</p>
            <span>votes</span>
          </div>
          <div className="mb-3 flex flex-col items-center">
            <p className="text-lg font-medium">{data?.answerDetails?.length}</p>
            <span>answers</span>
          </div>
          <div className="flex flex-col items-center">
            <small>2 views</small>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <Link
            to={`/question?q=${data?._id}`}
            className="text-blue-600 hover:text-blue-800 text-lg font-medium mb-3"
          >
            {data.title}
          </Link>

          <div className="max-w-[90%] mb-3">
            <div className="text-gray-700">{ReactHtmlParser(truncate(data.body, 200))}</div>
          </div>

          <div className="flex flex-wrap">
            {tags.map((_tag, index) => (
              <p
                key={index}
                className="bg-blue-100 text-blue-700 text-xs rounded-md px-3 py-1 mr-2 mb-2"
              >
                {_tag}
              </p>
            ))}
          </div>

          <div className="flex justify-end items-center space-x-2 mt-4">
            <small className="text-gray-500">{data.create_at}</small>
            <div className="flex items-center">
              <Avatar {...stringAvatar(data?.user?.displayName)} className="w-8 h-8" />
              <p className="ml-2 text-blue-600 text-sm">
                {data?.user?.displayName || "Natalie Lee"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
