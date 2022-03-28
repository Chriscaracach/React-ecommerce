import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { sweetAlertSuccess } from "../services/sweetAlertServices";
import {
  modifyQuantity,
  deleteProductFromCart,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartProductCard = ({ id, img, title, price, description }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const productQuantity = cart.filter((product) => product.id === id)[0]
    .quantity;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuantity = (amount) => {
    dispatch(modifyQuantity({ productId: id, amount: amount }));
  };

  const deleteFromCart = (uniqueId) => {
    dispatch(deleteProductFromCart(uniqueId));
    sweetAlertSuccess("Product removed from cart");
  };

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={title} src={img} />
        </ListItemAvatar>
        <TextField
          id="outlined-number"
          label="Quantity"
          type="number"
          size="small"
          inputProps={{ min: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "70px" }}
          defaultValue="1"
          onChange={(e) => handleQuantity(e.target.value)}
        />
        <ListItemText
          primary={title}
          secondary={
            <React.Fragment>
              <Button onClick={handleClickOpen}>Detail</Button>
            </React.Fragment>
          }
        />

        <Typography
          sx={{ display: "inline" }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          ${price * productQuantity}
        </Typography>

        <Button onClick={() => deleteFromCart(id)}>
          <DeleteIcon />
        </Button>
      </ListItem>

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
      <Divider variant="inset" component="li" />
    </>
  );
};

export default CartProductCard;
