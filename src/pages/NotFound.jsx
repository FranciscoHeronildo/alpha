import { Box, Button, Typography } from "@mui/material";
import Image from "../assets/404.gif";

const NotFound = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h5" align="center" fontWeight="bold" color="#FDC840">
        Página não encontrada
      </Typography>
      <img
        src={Image}
        alt="404"
        style={{ maxWidth: "100%", height: "auto", marginTop: "26px" }}
      />
      <Button
        onClick={goBack}
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        Voltar
      </Button>
    </Box>
  );
};

export default NotFound;
