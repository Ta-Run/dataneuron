import Main from "./Components/Main";
import Sidebar from "./Components/Sidebar";
import Analytics from "./Components/Analytics";

const App = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[auto,1fr] h-screen">
      <Sidebar className="md:col-span-1" />
      <Main className="col-span-2" />
      <Analytics className="md:col-span-3" />
    </div>
  );
};

export default App;
