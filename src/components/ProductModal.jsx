import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const ProductModal = ({
  isModalOpen,
  handleModalClose,
  editingProductId,
  newProductData,
  handleInputChange,
  handleAddProductSubmit,
  handleEditProductSubmit,
}) => {
  return (
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
            editingProductId ? handleEditProductSubmit : handleAddProductSubmit
          }
        >
          {editingProductId ? "Salvar" : "Adicionar"}
        </Button>
      </Box>
    </Modal>
  );
};

export default ProductModal;
