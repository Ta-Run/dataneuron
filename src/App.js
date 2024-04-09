import Component from "./Components/Component";
import Component1 from "./Components/Component1";
import Component2 from "./Components/Component2";


const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" ,height:"100vh" }}>
      <Component/>
      <Component1 />
      <Component2/>
      
    </div>
  );
};

export default App;
