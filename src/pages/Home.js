import React from "react";
import { Link } from "react-router-dom";

const buttons = [
  { label: "Calculator", onClick: () => {}, to: "/Calculator" },
  {
    label: "Button 1",
    onClick: () => {
      alert("No Implementation");
    },
    to: "/",
  },
  {
    label: "Button 2",
    onClick: () => {
      alert("No Implementation");
    },
    to: "/",
  },
  {
    label: "Button 3",
    onClick: () => {
      alert("No Implementation");
    },
    to: "/",
  },
];

function Home() {
  return (
    <div className="w-full h-[100vh]">
      <div className=" p-2">
        <div className="flex flex-col items-center justify-center gap-y-5  mt-32 p-4">
          {buttons.map((button, index) => (
            <Link
              to={button.to}
              className="bg-emerald-700 rounded-lg w-1/2 md:w-1/5 h-1/2 text-lg font-bold p-2 text-center"
            >
              <button key={index} onClick={button.onClick}>
                {button.label}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
