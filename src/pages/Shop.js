import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { getProductsFromApi } from "../services/APIServices";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsFromApi(setProducts);
  }, []);

  const map = products.map((product) => {
    return (
      <Grid item>
        <ProductCard
          key={product.id}
          title={product.title}
          img={product.image}
          alt={product.title}
          description={product.description}
        ></ProductCard>
      </Grid>
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
