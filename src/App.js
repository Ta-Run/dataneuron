import React,{useState} from "react";
import Main from "./Components/Main";
import Sidebar from "./Components/Sidebar";
import Analytics from "./Components/Analytics";

const App = () => {
    // State to track the size of each resizable component
  const [size1, setSize1] = useState({ width: 300, height: 200 });
  const [size2, setSize2] = useState({ width: 300, height: 200 });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleResize = (id, width, height) => {
    if (id === "component1") {
      setSize1({ width, height });
    } else if (id === "component2") {
      setSize2({ width, height });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-screen">
      {/* <div>
        <Sidebar id="component1" onResize={handleResize} onCategoryClick={handleCategoryClick}/>
        
      </div>
      <div>
        <Main size={size1} selectedCategory={selectedCategory}/>
      </div>
      <div>
        <Analytics size={size2} />
      </div> */}
    </div>
  );
};

export default App;
