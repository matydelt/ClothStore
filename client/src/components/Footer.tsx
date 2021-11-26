import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Logo from "../assets/images/zyro-image.png";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">ClothStore</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = () => {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor={(theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800]
        }
        position="absolute"
        bottom={0}
        width="100%"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5} flexWrap="nowrap">
            <Grid item xs={12} sm={4}>
              <Typography component="h1" variant="h5" fontWeight="bold">
                ClothStore{" "}
                {/* <img
                  src={Logo}
                  alt="ClothStore Logo"
                  style={{ width: "175px", maxHeight: "auto" }}
                /> */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h1" variant="h6" fontWeight="500">
                Categorias
              </Typography>
              <Box>
                <Link color="inherit">Hombre</Link>
              </Box>
              <Box>
                <Link color="inherit">Mujer</Link>
              </Box>
              <Box>
                <Link color="inherit">Niños</Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h1" variant="h6" fontWeight="500">
                Generos
              </Typography>
              <Box>
                <Link color="inherit">Hombre</Link>
              </Box>
              <Box>
                <Link color="inherit">Mujer</Link>
              </Box>
              <Box>
                <Link color="inherit">Niños</Link>
              </Box>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
