import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/header";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import { useDispatch } from "react-redux";
import { getProducts } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Shop></Shop>} />
        <Route path="/cart" element={<Cart></Cart>} />
      </Routes>
    </div>
  );
}

export default App;
