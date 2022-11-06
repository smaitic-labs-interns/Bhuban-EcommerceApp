import React from "react";
import {
  AddProductContainer,
  AddProductFormWrapper,
  AddProductFormContainer,
  AddProductImageWrapper,
  AddProductWrapper,
} from "../styles/addProductStyle";

import {
  Link,
  Grid,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";

import addProduct from "../../../public/images/addProduct.png";

export default function AddProduct() {
  const handleSubmit = () => {
    alert("Value received");
  };
  return (
    <AddProductWrapper>
      <AddProductContainer>
        <AddProductImageWrapper>
          <img src={addProduct} />
        </AddProductImageWrapper>
        <AddProductFormWrapper>
          <AddProductFormContainer component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="brand"
              label="Product Brand"
              name="brand"
              autoComplete="brand"
              //   value={values.email}
              //   onChange={handleChange}
              //   onBlur={handleBlur}
              //   error={errors.email && Boolean(errors.email)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="category"
              label="category"
              type="text"
              id="category"
              autoComplete="category"
              //   value={values.password}
              //   onChange={handleChange}
              //   onBlur={handleBlur}
              //   error={errors.password && Boolean(errors.password)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="model"
              label="model"
              type="text"
              id="model"
              autoComplete="model"
              //   value={values.password}
              //   onChange={handleChange}
              //   onBlur={handleBlur}
              //   error={errors.password && Boolean(errors.password)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="price in paisa"
              type="number"
              id="price"
              autoComplete="price"
              //   value={values.password}
              //   onChange={handleChange}
              //   onBlur={handleBlur}
              //   error={errors.password && Boolean(errors.password)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="quantity"
              label="quantity"
              type="text"
              id="quantity"
              autoComplete="quantity"
              //   value={values.password}
              //   onChange={handleChange}
              //   onBlur={handleBlur}
              //   error={errors.password && Boolean(errors.password)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              type="textarea"
              id="description"
              autoComplete="description"
              //   value={values.password}
              //   onChange={handleChange}
              //   onBlur={handleBlur}
              //   error={errors.password && Boolean(errors.password)}
            />
            <TextareaAutosize
              aria-label="minimum height"
              minRows={10}
              placeholder="Product Description"
              style={{ width: "100%" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "green" }}>
              Add Product
            </Button>
          </AddProductFormContainer>
        </AddProductFormWrapper>
      </AddProductContainer>
    </AddProductWrapper>
  );
}
