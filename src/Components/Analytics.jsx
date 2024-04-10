import React from "react";
import { Resizable } from 're-resizable';

const Analytics = () => {
  // Dummy data for analytics
  const apiCalls = 50;
  const addData = 30;
  const updateData = 20;

  return (
    <Resizable
  defaultSize={{ width: 400, height: 300 }} // Initial size of the component
  minHeight={200} // Minimum height when resizing
  minWidth={200} // Minimum width when resizing
  maxHeight={500} // Maximum height when resizing
  maxWidth={600} // Maximum width when resizing
>
  <div className="flex justify-center items-center h-screen bg-gray-100 p-6 mt-2 rounded-lg shadow-md">
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold text-black mb-4">API Analytics</h2>

      <div className="grid grid-cols-1 gap-6">
        {/* API Calls */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">API Calls</h3>
          <p className="text-gray-600">Total API calls: {apiCalls}</p>
        </div>
      </div>
    </div>
  </div>
</Resizable>

  );
};

export default Analytics;
