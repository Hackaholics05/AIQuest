import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import { TagsInput } from "react-tag-input-component";
import { selectUser } from "../../feature/userSlice";
import { useNavigate } from "react-router-dom";

const AskQuestion = () => {
  const user = useSelector(selectUser);
  const history = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);

  const handleQuill = (value) => {
    setBody(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 h-[75vh]">
      <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-md">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Ask a public question</h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-lg font-medium" htmlFor="title">
              Title
            </label>
            <small className="text-sm text-gray-600 block">
              Be specific and imagine you’re asking a question to another person
            </small>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="e.g Is there an R function for finding the index of an element in a vector?"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium" htmlFor="body">
              Body
            </label>
            <small className="text-sm text-gray-600 block">
              Include all the information someone would need to answer your question
            </small>
            <ReactQuill
              value={body}
              onChange={handleQuill}
              className="w-full border border-gray-300 rounded-md shadow-sm"
              theme="snow"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium" htmlFor="tags">
              Tags
            </label>
            <small className="text-sm text-gray-600 block">
              Add up to 5 tags to describe what your question is about
            </small>
            <TagsInput
              value={tag}
              onChange={setTag}
              name="tags"
              placeHolder="press enter to add new tag"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add your question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;