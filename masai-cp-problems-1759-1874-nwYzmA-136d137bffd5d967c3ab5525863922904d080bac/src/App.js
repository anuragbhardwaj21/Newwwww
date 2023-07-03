import "./App.css";
import Navbar from './Components/Navbar'
import MainRoutes from "./Components/MainRoutes";

function App() {
  return (
    <div data-testid="student-management-system">
      <Navbar />
      <MainRoutes />
    </div>
  );
}

export default App;
