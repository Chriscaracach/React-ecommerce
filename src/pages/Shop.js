import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";

const Shop = () => {
  const { products } = useSelector((state) => state.products);

  const map = products.map((product) => {
    return products.length ? (
      <Grid item key={product.id}>
        <ProductCard
          id={product.id}
          title={product.title}
          img={product.image}
          price={product.price}
          alt={product.title}
          description={product.description}
        ></ProductCard>
      </Grid>
    ) : null;
  });

  return (
    <Container sx={{ marginTop: 5 }}>
      {products.length ? (
        <Grid container spacing={3}>
          {map}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Shop;
