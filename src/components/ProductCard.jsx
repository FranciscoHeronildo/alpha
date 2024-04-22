import { Card, CardContent, Typography } from "@mui/material";

const ProductCard = ({ name, price }) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Preço: R${price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
