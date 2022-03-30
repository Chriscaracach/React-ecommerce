import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";

import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-mui";
import * as Yup from "yup";

import LeafletMap from "../components/LeafletMap";

import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "../features/userData/userDataSlice";
import { resetCart } from "../features/cart/cartSlice";

import { sweetAlertInfo } from "../services/sweetAlertServices";

const Pay = () => {
  const [location, setLocation] = useState([]);
  const [progressOpen, setProgressOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLocation = (coordinates) => {
    setLocation(coordinates);
  };

  useEffect(() => {
    if (!cart.length) {
      return navigate("/");
    }
  }, []); //eslint-disable-line

  return (
    <Container sx={{ marginTop: "100px" }}>
      <Box autoComplete="off" textAlign="center" sx={{ p: 0 }}>
        <Typography variant="h5">Please, enter your data</Typography>
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              address: "",
              payMethod: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Field required"),
              surname: Yup.string().required("Field required"),
              email: Yup.string()
                .email("Invalid email format")
                .required("Field required"),
              address: Yup.string().required("Field required"),
              payMethod: Yup.string().required("Field required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              let sendValues = { ...values, location };
              setProgressOpen(true);
              dispatch(addUserData(sendValues));
              setTimeout(() => {
                setProgressOpen(false);
                setSubmitting(false);
                console.log("Data to send");
                console.log(sendValues);
                console.log(cart);
                sweetAlertInfo(
                  "The purchase has been succesflly done, the data has been logged to the console"
                );
                dispatch(resetCart());
                navigate("/");
              }, 1400);
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Grid container sx={{ mt: 2 }}>
                  <Grid item md={6} xs={12} lg={4}>
                    <Grid item sx={{ marginBottom: "10px" }}>
                      <Field
                        name="name"
                        type="text"
                        label="Name"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item sx={{ marginBottom: "10px" }}>
                      <Field
                        name="surname"
                        type="text"
                        label="Surname"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item sx={{ marginBottom: "10px" }}>
                      <Field
                        name="email"
                        type="email"
                        label="Email"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item sx={{ marginBottom: "10px" }}>
                      <Field
                        name="address"
                        type="text"
                        label="Address"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item align="center" sx={{ marginBottom: "5px" }}>
                      <Field
                        name="payMethod"
                        type="select"
                        label="Pay Method"
                        component={Select}
                        formHelperText={{ children: "Select your pay method" }}
                      >
                        <MenuItem value="Mercado-Pago">Mercado Pago</MenuItem>
                        <MenuItem value="Cash">Cash</MenuItem>
                      </Field>
                    </Grid>
                  </Grid>
                  <Grid item md={6} sm={6} lg={8}>
                    <LeafletMap handleLocation={handleLocation}></LeafletMap>
                    <Box textAlign="center">
                      <Button
                        variant="contained"
                        onClick={submitForm}
                        disabled={isSubmitting}
                      >
                        Pay
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={progressOpen}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Container>
  );
};

export default Pay;
