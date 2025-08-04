import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Quizzes from "./pages/Quizzes";
import DashBoard from "./pages/DashBoard";
import { Dashboard } from "./components/dashboardUi";

const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
