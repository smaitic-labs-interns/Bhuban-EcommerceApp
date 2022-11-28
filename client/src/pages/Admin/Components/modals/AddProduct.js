import React, { useState, useEffect } from "react";
import {
  AddProductContainer,
  AddProductFormWrapper,
  AddProductFormContainer,
  PreviewImageWrapper,
  AddProductImageWrapper,
  AddProductWrapper,
  AddProductFormInputWrapper,
  AddProductButtonWrapper,
} from "../../styles/modals/addProductStyle";

import { useFormik } from "formik";

import { TextField, Box, Modal, Button, TextareaAutosize } from "@mui/material";
import addProduct from "../../../../public/images/addProduct.png";
import { add_product } from "../../../../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { PlusOne } from "@mui/icons-material";

export default function AddProduct() {
  const addProduct = useSelector((state) => state.addProduct);
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");
  const login = useSelector((state) => state.login);
  const userId = login.isLogined ? login.userId : null;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const initialValues = {
    brand: "",
    category: "",
    model: "",
    name: "",
    price: "",
    quantity: "",
    description: "",
  };

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    // validationSchema: loginSchema, // for data validation
    onSubmit: (values) => {
      const formData = new FormData();
      var i = 1;
      Array.from(image).map((item) => {
        console.log(item);
        formData.append(`image${index}`, item);
        i++;
      });
      formData.append("brand", values.brand);
      formData.append("category", values.category);
      formData.append("model", values.model);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      formData.append("description", values.description);
      formData.append("addedBy", userId);
      dispatch(add_product({ value: formData, action: "add" }));
    },
  });

  // useEffect(() => {
  //   if (login.isLogined && login.loading === false) {
  //     navigateToProfile();
  //   } else if (login.isLogined === false && login.loading === false) {
  //     toast.error("Invalid login Details");
  //   }
  // }, [login]);
  let index = 0;

  useEffect(() => {
    if (addProduct.status === "success") {
      Swal.fire({
        title: "Success!",
        text: `${addProduct.message}`,
        icon: "success",
      });
      dispatch(add_product({ value: {}, action: "clean" }));
    } else if (addProduct.status === "failed") {
      Swal.fire({
        title: "Error!",
        text: `${addProduct.message}`,
        icon: "error",
      });
    }
  }, [addProduct]);

  return (
    <AddProductWrapper>
      <AddProductContainer>
        <AddProductImageWrapper>
          <img src={addProduct} />
        </AddProductImageWrapper>
        <AddProductFormWrapper>
          <AddProductFormContainer component="form" onSubmit={handleSubmit}>
            <Box>
              <input
                onChange={(e) => {
                  setImage(e.target.files);
                }}
                type="file"
                name="pImage"
                id="pImage"
                multiple
              />
              <PreviewImageWrapper>
                {Array.from(image).map((item) => {
                  index++;
                  return (
                    <img
                      key={index}
                      src={item ? URL.createObjectURL(item) : null}
                      alt=""
                    />
                  );
                })}
              </PreviewImageWrapper>
            </Box>
            <AddProductFormInputWrapper>
              <TextField
                margin="normal"
                required
                fullWidth
                id="brand"
                label="Product Brand"
                name="brand"
                autoComplete="brand"
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                //   error={errors.email && Boolean(errors.email)}
              />
            </AddProductFormInputWrapper>
            <AddProductFormInputWrapper>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Product Name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                //   error={errors.email && Boolean(errors.email)}
              />
            </AddProductFormInputWrapper>
            <AddProductFormInputWrapper>
              <TextField
                margin="normal"
                required
                fullWidth
                name="category"
                label="category"
                type="text"
                id="category"
                autoComplete="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                //   error={errors.password && Boolean(errors.password)}
              />
            </AddProductFormInputWrapper>
            <AddProductFormInputWrapper>
              <TextField
                margin="normal"
                required
                fullWidth
                name="model"
                label="model"
                type="text"
                id="model"
                autoComplete="model"
                value={values.model}
                onChange={handleChange}
                onBlur={handleBlur}
                //   error={errors.password && Boolean(errors.password)}
              />
            </AddProductFormInputWrapper>
            <AddProductFormInputWrapper>
              <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                label="price in paisa"
                type="number"
                id="price"
                autoComplete="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                //   error={errors.password && Boolean(errors.password)}
              />
            </AddProductFormInputWrapper>
            <AddProductFormInputWrapper>
              <TextField
                margin="normal"
                required
                fullWidth
                name="quantity"
                label="quantity"
                type="text"
                id="quantity"
                autoComplete="quantity"
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                //   error={errors.password && Boolean(errors.password)}
              />
            </AddProductFormInputWrapper>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={10}
              placeholder="Product Description"
              style={{ width: "100%" }}
              id={"description"}
              name={"description"}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <AddProductButtonWrapper>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, background: "green" }}
              >
                Add Product
              </Button>
            </AddProductButtonWrapper>
          </AddProductFormContainer>
        </AddProductFormWrapper>
      </AddProductContainer>
    </AddProductWrapper>
  );
}
