import React from "react";
import List from "@mui/material/List";
import { useSelector } from "react-redux";
import CartProductCard from "../components/CartProductCard";

const Cart = () => {
  const { cart } = useSelector((state) => state.products);

  const map = cart.map((product) => {
    return (
      <CartProductCard
        key={product[0].id}
        id={product[0].id}
        img={product[0].image}
        title={product[0].title}
        price={product[0].price}
        description={product[0].description}
      ></CartProductCard>
    );
  });
  return <List sx={{ width: "100%" }}>{map}</List>;
};

export default Cart;
