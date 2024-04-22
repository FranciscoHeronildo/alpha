import {
  Link,
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { TbAlpha } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await api.post("/auth/login", {
        taxNumber: data.get("taxNumber"),
        password: data.get("password"),
      });

      if (response.status === 201) {
        await signin(response.data.data.user, response.data.data.token);
        toast.success(response.data.message + "!");
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      toast.error("Dados não encontrados!");
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item>
              {" "}
              N&atilde;o tem uma conta?{" "}
              <Link href="/signup" variant="body2">
                {"Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
