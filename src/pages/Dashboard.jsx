import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("products/get-all-products");
      setProducts(response.data.data);
      toast.success(response.data.message + "!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao encontrar produtos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <Box p={2}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                name={product.name}
                description={product.description}
                price={product.price}
                stock={product.stock}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
export default Dashboard;
