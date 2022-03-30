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
import { Pagination } from "@mui/material";
import TakingTooLong from "../components/TakingTooLong";

const Shop = () => {
  const { products } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(1);
  const [category, setCategory] = useState("");
  const [searchError, setSearchError] = useState(false);

  const map = filteredProducts
    .slice((page - 1) * 3, (page - 1) * 3 + 3)
    .map((product) => {
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
    setSearchError(false);
    console.log("antes ");
    console.log(filteredProducts);
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    //! este setFilteredProducts no funciona bien, cuando llega el if, todavía hay cosas de antes, correr y revisar
    console.log("despues ");
    console.log(filteredProducts);
    if (!filteredProducts) {
      setSearchError(true);
    }
  };

  const handleCategorySearch = (e) => {
    setPage(1);
    setFilteredProducts(
      products.filter(
        (product) =>
          product.category.toLowerCase() === e.target.value.toLowerCase()
      )
    );
    setCategory(e.target.value);
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    setPageAmount(Math.ceil(filteredProducts.length / 3));
  }, [filteredProducts]);

  return (
    <Container sx={{ marginTop: "100px" }}>
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
              onChange={handleCategorySearch}
              value={category}
              helperText="Filter by category"
            >
              <MenuItem value={"electronics"}>Electronics</MenuItem>
              <MenuItem value={"jewelery"}>Jewelery</MenuItem>
              <MenuItem value={"men's clothing"}>Men's clothing</MenuItem>
              <MenuItem value={"women's clothing"}>Women's clothing</MenuItem>
            </TextField>
          </Box>
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {map}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            m={4}
          >
            <Pagination
              count={pageAmount}
              page={page}
              onChange={handlePagination}
            />
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            height: "80vh",
          }}
        >
          <CircularProgress />
          <TakingTooLong />
        </Box>
      )}
      {searchError && (
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
