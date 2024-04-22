import { useEffect, useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const allProducts = async () => {
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
    allProducts();
  }, []);

  const handleAddProduct = () => {};

  const handleEdit = (productId) => {
    console.log("Editar produto com ID:", productId);
  };

  const handleDelete = async (productId) => {
    try {
      await api.delete(`products/delete-product/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao excluir o produto");
    }
  };

  return (
    <div>
      <Navbar />
      <Box p={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProduct}
          style={{ position: "absolute", top: 90, left: 20 }}
        >
          Adicionar Produto
        </Button>
        <Box container spacing={2} style={{ marginTop: 50 }}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                name={product.name}
                description={product.description}
                price={product.price}
                stock={product.stock}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(product.id)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(product.id)}
              >
                Excluir
              </Button>
            </Grid>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
