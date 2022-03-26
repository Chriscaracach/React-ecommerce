import React, { useState } from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-mui";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Container } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import LeafletMap from "../components/LeafletMap";

const Pay = () => {
  const [location, setLocation] = useState([]);

  const handleLocation = (coordinates) => {
    setLocation(coordinates);
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Container maxWidth="md">
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
          onSubmit={(values) => {
            console.log(values);
            //TODO Redirect
            //! Cuidado porque todos los campos quedan disabled cuando submiteás
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Grid container sx={{ m: 2 }}>
                <Grid item align="center" md={6}>
                  <Grid item md={6}>
                    <Field
                      name="name"
                      type="text"
                      label="Name"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Field
                      name="surname"
                      type="text"
                      label="Surname"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Field
                      name="email"
                      type="email"
                      label="Email"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Field
                      name="address"
                      type="text"
                      label="Address"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item md={12} align="center">
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
                <Grid item align="center" md={6}>
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
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Pay;
