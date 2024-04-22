import { BrowserRouter, Route, Routes } from "react-router-dom";
// import useAuth from "./hooks/useAuth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

// const Private = ({ Item }) => {
//   const { signed } = useAuth();

//   return signed > 0 ? <Item /> : <Login />;
// };

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<Private Item={Dashboard} />} />  */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
