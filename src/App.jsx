import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/dashboardUi";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { BlogForm, QuizForm, UserForm } from "./pages/forms";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Quizzes from "./pages/Quizzes";

const App = () => {
  return (
    <>
      <Routes>
        {/* Admin Routes */}
        {/* Form routes without NavBar and Footer */}
        <Route path="/quiz-form" element={<QuizForm />} />
        <Route path="/blog-form" element={<BlogForm />} />
        {/* Admin form routes for users */}
        <Route path="/admin/forms/user" element={<UserForm />} />
        {/* Main app routes with NavBar and Footer */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Dashboard />} />
              </Routes>
              <Footer />
            </div>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
};

export default App;
