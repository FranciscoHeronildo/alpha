import { Card, CardContent, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
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
