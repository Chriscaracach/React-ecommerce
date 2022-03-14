import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Shop = () => {
  const { products } = useSelector((state) => state.products);

  const map = products.map((product) => {
    return products.length ? (
      <Grid item>
        <ProductCard
          key={product.id}
          title={product.title}
          img={product.image}
          alt={product.title}
          description={product.description}
        ></ProductCard>
      </Grid>
    ) : (
      <p>Cargando</p>
    );
  });

  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container spacing={3}>
        {map}
      </Grid>
    </Container>
  );
};

export default Shop;
