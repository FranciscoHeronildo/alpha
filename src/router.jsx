import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  );
}

export default Router;
