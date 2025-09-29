import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Photo from "./pages/Photo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Setting from "./pages/Settings"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen min-w-screen justify-center overflow-hidden bg-white select-none">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/photo" element={<Photo />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/setting" element={<Setting />} />

        </Routes>
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
