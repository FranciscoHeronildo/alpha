import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductModal from "../components/Modal/ProductModal";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProductData, setEditedProductData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const allProducts = async () => {
    try {
      const response = await api.get("products/get-all-products");
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Falha ao encontrar produtos");
    }
  };

  useEffect(() => {
    allProducts();
  }, []);

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData({
      ...newProductData,
      [name]: value,
    });
  };

  const handleAddProductSubmit = async () => {
    try {
      await api.post("products/create-product", newProductData);
      setIsModalOpen(false);
      toast.success("Produto adicionado com sucesso!");
      allProducts();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao adicionar o produto");
    }
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

  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setEditedProductData({
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
        stock: productToEdit.stock,
      });
      setEditingProductId(productId);
      setIsModalOpen(true);
    } else {
      console.error("Produto não encontrado para edição");
    }
  };

  const handleEditProductSubmit = async () => {
    try {
      await api.put(
        `products/update-product/${editingProductId}`,
        editedProductData
      );
      setIsModalOpen(false);
      toast.success("Produto atualizado com sucesso!");
      allProducts();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao atualizar o produto");
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
                onEdit={() => handleEdit(product.id)}
                onDelete={() => handleDelete(product.id)}
              />
            </Grid>
          ))}
        </Box>
      </Box>
      <ProductModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        editingProductId={editingProductId}
        newProductData={newProductData}
        handleInputChange={handleInputChange}
        handleAddProductSubmit={handleAddProductSubmit}
        handleEditProductSubmit={handleEditProductSubmit}
      />
    </div>
  );
};

export default Dashboard;
