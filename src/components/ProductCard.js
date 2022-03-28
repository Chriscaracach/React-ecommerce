import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { Rating } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { sweetAlertSuccess } from "../services/sweetAlertServices";
import {
  addProductToCart,
  addQuantityDefault,
} from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ProductCard = ({ img, alt, title, description, id, price, rating }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addToCart = (uniqueId) => {
    let filteredProduct = products.filter((product) => {
      return product.id === uniqueId;
    });
    dispatch(addProductToCart(filteredProduct[0]));
    dispatch(addQuantityDefault(1));
    sweetAlertSuccess("Product added to cart");
  };

  return (
    <Card sx={{ width: 250, height: 350 }}>
      <CardMedia component="img" height="140" image={img} alt={alt} />
      <CardContent>
        <Typography variant="h6" component="div">
          {title.slice(0, 30) + "..."}
        </Typography>
        <Typography variant="p" component="p">
          ${price}
        </Typography>
        <Rating name="read-only" value={rating} size="small" readOnly />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => addToCart(id)}>
          <AddShoppingCartIcon />
        </Button>
        <Button variant="outlined" onClick={handleClickOpen}>
          Detail
        </Button>
      </CardActions>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item>
              <img src={img} alt={title} style={{ width: "200px" }} />
            </Grid>
            <Grid item>
              <DialogContentText id="alert-dialog-description">
                {description}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProductCard;
