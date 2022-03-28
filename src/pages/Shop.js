import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import MenuItem from "@mui/material/MenuItem";

const Shop = () => {
  const { products } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const map = filteredProducts.map((product) => {
    return (
      products.length && (
        <Grid item key={product.id}>
          <ProductCard
            id={product.id}
            title={product.title}
            img={product.image}
            price={product.price}
            alt={product.title}
            description={product.description}
            rating={product.rating.rate}
          ></ProductCard>
        </Grid>
      )
    );
  });

  const handleSearch = (e) => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleCategorySearch = (e) => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.category.toLowerCase() === e.target.value.toLowerCase()
      )
    );
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <Container sx={{ marginTop: 4 }}>
      {products.length ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
            <TextField
              label="Search"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => handleSearch(e)}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              // value={""}
              onChange={handleCategorySearch}
              helperText="Filter by category"
            >
              <MenuItem value={"electronics"}>Electronics</MenuItem>
              <MenuItem value={"jewelery"}>Jewelery</MenuItem>
              <MenuItem value={"men's clothing"}>Men's clothing</MenuItem>
              <MenuItem value={"women's clothing"}>Women's clothing</MenuItem>
            </TextField>
          </Box>
          <Grid container spacing={3}>
            {map}
          </Grid>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!filteredProducts.length && (
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
          <Typography variant="h5">No search match</Typography>
          <Typography variant="caption">Please try again</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Shop;
