import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsFromApi } from "../services/APIServices";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsFromApi(setProducts);
  }, []);

  const map = products.map((product) => {
    return (
      <ProductCard
        key={product.id}
        title={product.title}
        img={product.image}
        alt={product.title}
        description={product.description}
      ></ProductCard>
    );
  });

  return <div>{map}</div>;
};

export default Shop;
