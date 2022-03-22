import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const Pay = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
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
          }}
        >
          <Form>
            <Field
              name="name"
              type="text"
              render={() => (
                <TextField
                  required
                  id="standard-required"
                  label="Required"
                  helperText="Name"
                  variant="standard"
                />
              )}
            />

            <ErrorMessage
              name="name"
              render={(msg) => <div className="form__error">{msg}</div>}
            />
            <Field
              name="surname"
              type="text"
              render={() => (
                <TextField
                  required
                  id="standard-required"
                  label="Required"
                  helperText="Surname"
                  variant="standard"
                />
              )}
            />
            <ErrorMessage
              name="surname"
              render={(msg) => <div className="form__error">{msg}</div>}
            />
            <Field
              name="email"
              type="email"
              render={() => (
                <TextField
                  required
                  id="standard-required"
                  label="Required"
                  helperText="Email"
                  variant="standard"
                  type="email"
                />
              )}
            />
            <ErrorMessage
              name="email"
              render={(msg) => <div className="form__error">{msg}</div>}
            />
            <Field
              name="address"
              type="text"
              render={() => (
                <TextField
                  required
                  id="standard-required"
                  label="Required"
                  helperText="Address"
                  variant="standard"
                />
              )}
            />
            <ErrorMessage
              name="address"
              render={(msg) => <div className="form__error">{msg}</div>}
            />
            <Field
              name="payMethod"
              type="select"
              render={() => (
                <TextField
                  id="standard-select-currency"
                  select
                  label="Select"
                  value={""}
                  helperText="Select your pay method"
                  variant="standard"
                >
                  <MenuItem value="Mercado-Pago">Mercado Pago</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                </TextField>
              )}
            />
            <ErrorMessage
              name="address"
              render={(msg) => <div className="form__error">{msg}</div>}
            />
          </Form>
        </Formik>
      </Container>
    </Box>
  );
};

export default Pay;
