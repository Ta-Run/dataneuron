import React from "react";

const Main = () => {
  return (
    <div className="bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Card 1</h3>
          <p className="text-gray-600">Some content for Card 1...</p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Card 2</h3>
          <p className="text-gray-600">Some content for Card 2...</p>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Card 3</h3>
          <p className="text-gray-600">Some content for Card 3...</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
