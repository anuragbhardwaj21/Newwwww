import "./App.css";
import CreateLecture from "./Components/CreateLecture"
import Pagination from "./Components/Pagination";
import ShowLectures from "./Components/ShowLectures";
const App = () => {
  return <div className="App">
    <h1>Course Platform</h1>
    {/* <CreateLecture /> */}
    <ShowLectures />
    <Pagination />
  </div>;
};

export default App;
