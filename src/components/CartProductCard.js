import React from "react";
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
import { deleteProductFromCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartProductCard = ({ id, img, title, price, description }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteFromCart = (uniqueId) => {
    dispatch(deleteProductFromCart(uniqueId));
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={title} src={img} />
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                ${price}
              </Typography>
              <Button onClick={handleClickOpen}>Detail</Button>
            </React.Fragment>
          }
        />
        <Button onClick={() => deleteFromCart(id)}>
          <DeleteIcon />
        </Button>
      </ListItem>
      <Divider variant="inset" component="li" />

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
    </>
  );
};

export default CartProductCard;
