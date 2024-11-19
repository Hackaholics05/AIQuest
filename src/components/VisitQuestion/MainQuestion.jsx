import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import ReactQuill from "react-quill";
import Editor from "react-quill";
import axios from "axios";
import ReactHtmlParser from "html-react-parser";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";
import { stringAvatar } from "../../lib/Avatar";


const MainQuestion = () => {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: ["#ff0000", "#00ff00", "#0000ff", "#220055"] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: false,
    },
  };

  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  const [questionData, setQuestionData] = useState();
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector(selectUser);

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleSubmit = async () => {
    const body = {
      question_id: id,
      answer: answer,
      user: user,
    };
  };

  const handleComment = async () => {
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        user: user,
      };
    }
  };

  return (
    <div className="flex flex-col p-8 flex-[0.75]">
      <div className="flex flex-col w-full ">
        <div className="flex w-full items-center justify-between mb-2.5">
          <h2 className="text-2xl font-semibold">{questionData?.title}</h2>
          <Link to="/add-question">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Ask Question</button>
          </Link>
        </div>
        <div className="flex w-full mb-4">
          <div className="flex items-center text-sm">
            <p>
              Asked <span className="text-gray-800">{new Date(questionData?.created_at).toLocaleString()}</span>
            </p>
            <p>
              Active <span className="text-gray-800">today</span>
            </p>
            <p>
              Viewed <span className="text-gray-800">43 times</span>
            </p>
          </div>
        </div>

        <div className="flex w-full py-5 border-b border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row justify-between w-full">
            <div className="flex mr-7">
              <div className="flex flex-col items-center text-sm space-y-2">
                <p className="text-xl">▲</p>
                <p className="text-xl">0</p>
                <p className="text-xl">▼</p>
                <FaBookmark className="text-gray-400" />
                <FaHistory className="text-gray-400" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="mb-4">
                <p>{questionData?.body ? ReactHtmlParser(questionData.body) : "No content available"}</p>

              </div>
              <div className="flex flex-col ml-auto">
                <small className="text-gray-500 mr-2">
                  Asked {new Date(questionData?.created_at).toLocaleString()}
                </small>
                <div className="flex items-center">
                  <Avatar {...stringAvatar(questionData?.user?.displayName)} />
                  <p className="text-sm font-semibold">
                    {questionData?.user?.displayName || "Aayush"}
                  </p>
                </div>
              </div>

              <div className="my-2 w-[90%] ml-auto">
                <div className="flex flex-col text-sm py-2 border-y border-gray-200">
                  {questionData?.comments?.map((_qd) => (
                    <p key={_qd._id} className="text-sm mb-2">
                      {_qd.comment} <span className="text-gray-500">- {_qd.user?.displayName || "Aayush"}</span>
                      <small className="text-gray-400 ml-2">{new Date(_qd.created_at).toLocaleString()}</small>
                    </p>
                  ))}
                </div>
                <button
                  onClick={() => setShow(!show)}
                  className="text-blue-500 text-sm"
                >
                  Add a comment
                </button>
                {show && (
                  <div className="mt-4">
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add your comment..."
                      rows={4}
                    />
                    <button
                      onClick={handleComment}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Add Comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Answer</h3>
          <ReactQuill
            value={answer}
            onChange={handleQuill}
            modules={Editor.modules}
            className="react-quill mb-4"
            theme="snow"
            style={{ height: "200px", width: "50vw" }}
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 mt-48 lg:mt-16 bg-green-500 text-white rounded-md w-[50vw]"
          >
            Post your answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainQuestion;
