import React from "react";
import { Resizable } from 're-resizable';

const Analytics = () => {
  // Dummy data for analytics
  const apiCalls = 50;
  const addData = 30;
  const updateData = 20;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">API Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* API Calls */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">API Calls</h3>
          <p className="text-gray-600">Total API calls: {apiCalls}</p>
        </div>

        {/* Add and Update Data */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Add and Update Data</h3>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Add data: {addData}</p>
            <p className="text-gray-600">Update data: {updateData}</p>
          </div>
          <div className="h-8 bg-gray-300 rounded-full">
            <div className="h-full bg-green-500" style={{ width: `${(addData / (addData + updateData)) * 100}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
