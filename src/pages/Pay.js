import React, { useState } from "react";
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

import { useDispatch } from "react-redux";
import { addUserData } from "../features/userData/userDataSlice";

const Pay = () => {
  const [location, setLocation] = useState([]);
  const [progressOpen, setProgressOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLocation = (coordinates) => {
    setLocation(coordinates);
  };

  return (
    <Box autoComplete="off" textAlign="center" sx={{ p: 0 }}>
      <Typography variant="h3">Title</Typography>
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
              alert(JSON.stringify(sendValues, null, 2)); //TODO agregar productos comprados
              navigate("/");
            }, 1400);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Grid container sx={{ m: 2 }}>
                <Grid item align="center" md={6} sm={6} lg={4}>
                  {/* TODO Hacer Custom Fields, para no repetir tanto codigo */}
                  <Grid item md={6} sx={{ marginBottom: "10px" }}>
                    <Box height="100%" display="flex" justifyContent="center">
                      <Field
                        name="name"
                        type="text"
                        label="Name"
                        component={TextField}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={6} sx={{ marginBottom: "10px" }}>
                    <Field
                      name="surname"
                      type="text"
                      label="Surname"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item md={6} sx={{ marginBottom: "10px" }}>
                    <Field
                      name="email"
                      type="email"
                      label="Email"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item md={6} sx={{ marginBottom: "10px" }}>
                    <Field
                      name="address"
                      type="text"
                      label="Address"
                      component={TextField}
                    />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    align="center"
                    sx={{ marginBottom: "5px" }}
                  >
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
                <Grid item align="center" md={6} sm={6} lg={8}>
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
  );
};

export default Pay;
