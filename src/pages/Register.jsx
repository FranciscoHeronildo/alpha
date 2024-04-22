import { Button, Box, TextField, Typography, Container } from "@mui/material";
import { TbAlpha } from "react-icons/tb";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const respose = await api.post("/auth/register", {
        name: data.get("name"),
        taxNumber: data.get("taxNumber"),
        mail: data.get("mail"),
        phone: data.get("phone"),
        password: data.get("password"),
      });
      navigate("/signin");
      toast.success(respose.data.message);
    } catch (e) {
      console.error(e);
      toast.error("Preencha todos os campos corretamente!");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        marginTop: "auto",
        marginBottom: "auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TbAlpha fontSize={60} />
      </Box>
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            autoComplete="current-name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="taxNumber"
            label="CPF ou CNPJ"
            name="taxNumber"
            autoComplete="current-taxNumber"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="mail"
            label="E-mail"
            name="mail"
            autoComplete="current-mail"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Telefone"
            type="phone"
            id="phone"
            autoComplete="current-phone"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
