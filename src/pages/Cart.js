import React from "react";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import CartProductCard from "../components/CartProductCard";

const Cart = () => {
  const { cart } = useSelector((state) => state.products);

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
          {/* Este boton va a ser para pagar */}
          <Button variant="contained">Buy</Button>
        </>
      ) : (
        <p>Empty cart</p>
      )}
    </>
  );
};

export default Cart;
