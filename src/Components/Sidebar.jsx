import React, { useState, useEffect } from "react";
import { Resizable } from 're-resizable';
import axios from 'axios';

const Sidebar = ({ onResize, onCategoryClick }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getCategories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="h-screen">
      <Resizable
         defaultSize={{ width: 300, height: 200 }}
         minWidth={100}
         minHeight={100}
         maxHeight={500}
         maxWidth={500}
         onResize={(e, direction, ref, d) => {
           onResize(ref.offsetWidth, ref.offsetHeight);
         }}
      >
        <div className="flex h-screen bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="flex-shrink-0 bg-gray-800 text-white w-72 py-4 px-2 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category} className="flex items-center justify-center rounded-lg border border-gray-300 shadow-md py-2 px-4" onClick={() => onCategoryClick(category)} style={{ cursor: 'pointer' }}>
                  <span className="text-lg font-semibold">{category}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Resizable>
    </div>
  );
};

export default Sidebar;
