import { Card, CardContent, Typography } from "@mui/material";

const ProductCard = ({ name, description, price, stock }) => {
  return (
    <Card>
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
      </CardContent>
    </Card>
  );
};

export default ProductCard;
