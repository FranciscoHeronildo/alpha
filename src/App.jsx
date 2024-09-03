import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

// eslint-disable-next-line react/prop-types
const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed ? <Item /> : <Navigate to="/signin" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Private Item={Dashboard} />} />
        <Route path="/signin" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
