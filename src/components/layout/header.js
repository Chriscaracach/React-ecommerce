import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-commerce
          </Typography>
          <Button color="inherit">
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <ShoppingCartIcon fontSize="large" />
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
