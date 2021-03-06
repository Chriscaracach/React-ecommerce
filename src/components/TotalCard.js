import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TotalCard = () => {
  const [total, setTotal] = useState(0);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    let prices = [];
    cart.forEach((element) => {
      prices.push(element.price * element.quantity);
    });
    setTotal(
      Math.round(prices.reduce((partialSum, a) => partialSum + a, 0) * 100) /
        100
    );
  }, [cart]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          minWidth: "150px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Total
            </Typography>
            <Typography variant="h5" component="div">
              ${total}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">
              <Link to="/pay" style={{ textDecoration: "none" }}>
                Pay
              </Link>
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default TotalCard;
