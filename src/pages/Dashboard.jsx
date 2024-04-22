import { useEffect, useState } from "react";
import { Box, Grid, Button, Modal, TextField, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import { toast } from "react-toastify";

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
      const storageToken = localStorage.getItem("token");
      const auth = {
        headers: {
          Authorization: `Bearer ${storageToken}`,
        },
      };

      await api.post("products/create-product", newProductData, auth);
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
      const storageToken = localStorage.getItem("token");
      const auth = {
        headers: {
          Authorization: `Bearer ${storageToken}`,
        },
      };

      await api.put(
        `products/update-product/${editingProductId}`,
        editedProductData,
        auth
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
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {editingProductId ? "Editar Produto" : "Adicionar Produto"}
          </Typography>
          <TextField
            name="name"
            label="Nome do Produto"
            value={newProductData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Descrição"
            value={newProductData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="price"
            label="Preço"
            type="number"
            value={newProductData.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="stock"
            label="Estoque"
            type="number"
            value={newProductData.stock}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={
              editingProductId
                ? handleEditProductSubmit
                : handleAddProductSubmit
            }
          >
            {editingProductId ? "Salvar" : "Adicionar"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
