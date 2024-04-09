import React, { useState, useEffect, useRef } from "react";
import { Resizable } from 're-resizable';

const Sidebar = () => {
  const [minWidth, maxWidth, defaultWidth] = [200, 500, 350];
  const [width, setWidth] = useState(parseInt(localStorage.getItem("sidebarWidth")) || defaultWidth);
  const isResized = useRef(false);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if (!isResized.current) {
        return;
      }
      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;
        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;
        return isWidthInRange ? newWidth : previousWidth;
      });
    });

    window.addEventListener("mouseup", () => {
      isResized.current = false;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarWidth", width);
  }, [width]);

  return (
    <div className="flex">
      <div className="bg-gray-800 text-white py-4 px-2" style={{ width: `${width / 16}rem` }}>
        {/* Your sidebar content goes here */}
        Sidebar
      </div>
      
      {/* Handle */}
      <div
        className="w-2 cursor-col-resize"
        onMouseDown={() => {
          isResized.current = true;
        }}
      />
      <div className="w-4 cursor-col-resize bg-blue-500" />
    </div>
  );
};

export default Sidebar;
