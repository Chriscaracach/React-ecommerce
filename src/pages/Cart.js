import React from "react";
import List from "@mui/material/List";
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
  return <List sx={{ width: "100%" }}>{map}</List>;
};

export default Cart;
