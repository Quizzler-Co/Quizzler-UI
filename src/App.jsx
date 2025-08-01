import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="text-2xl font-light underline">App</div>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
