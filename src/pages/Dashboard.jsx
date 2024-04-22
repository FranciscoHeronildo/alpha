import { useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const allProdutc = async () => {
    try {
      const response = await api.get("products/get-all-products");
      console.log("first", response);
      toast.success(response.data.message + "!");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    allProdutc();
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
};
export default Dashboard;
