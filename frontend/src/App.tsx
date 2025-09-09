import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Photo from "./pages/Photo";
import Outfits from "./pages/Outfits";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen min-w-screen justify-center bg-gradient-to-t from-zinc-900 via-zinc-900/95 to-zinc-900/90 px-3 py-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/photo" element={<Photo />}></Route>
          <Route path="/outfits" element={<Outfits />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
