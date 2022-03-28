import React from "react";
import List from "@mui/material/List";
import { useSelector } from "react-redux";
import CartProductCard from "../components/CartProductCard";
import TotalCard from "../components/TotalCard";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  const map = cart.map((product) => {
    return (
      <CartProductCard
        key={product.id}
        id={product.id}
        img={product.image}
        title={product.title}
        price={product.price}
        description={product.description}
      ></CartProductCard>
    );
  });
  return (
    <>
      {map.length ? (
        <>
          <List sx={{ width: "100%" }}>{map}</List>
          <TotalCard></TotalCard>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <ErrorIcon fontSize="large" />
          <Typography variant="h5">Your cart is empty</Typography>
          <Typography variant="caption">
            Go back and add some products..
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Cart;
