import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const ProductCard = ({ name, description, price, stock, onEdit, onDelete }) => {
  return (
    <Card sx={{ marginBottom: 1 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Descrição: {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Preço: R${price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Estoque: {stock} unidades
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onEdit}
            sx={{ marginBottom: "1px" }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={onDelete}
            sx={{ marginTop: "1px" }}
          >
            Excluir
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
