import React, { useState, useEffect } from "react";
import {
  EditProductWrapper,
  CloseButtonWrapper,
  AddProductContainer,
  AddProductFormWrapper,
  AddProductFormContainer,
  PreviewImageWrapper,
  AddProductImageWrapper,
  AddProductWrapper,
  AddProductFormInputWrapper,
  EditProductButtonWrapper,
} from "../../styles/modals/editProductStyle";

import { useFormik } from "formik";

import { TextField, Box, Modal, Button, TextareaAutosize } from "@mui/material";
import addProduct from "../../../../public/images/addProduct.png";
import { add_product } from "../../../../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Close, Edit, Save } from "@mui/icons-material";
import { update_product } from "../../../../redux/actions/productActions";
import { fetchProducts } from "../../../../redux/actions/productActions";

export default function EditProduct({ product }) {
  const addProduct = useSelector((state) => state.addProduct);
  const updateProduct = useSelector((state) => state.updateProduct);
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const initialValues = {
    category: product.category ? product.category : "",
    model: product.model ? product.model : "",
    brand: product.brand ? product.brand : "",
    name: product.name ? product.name : "",
    description: product.description ? product.description : "",
    price: product.price ? product.price : "",
    quantity: product.quantity ? product.quantity : "",
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
      dispatch(
        update_product({
          productId: product.id,
          data: values,
          action: "update",
        })
      );
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
    if (updateProduct.status === "success") {
      setOpen(false);
      Swal.fire({
        title: "Success!",
        text: `${updateProduct.message}`,
        icon: "success",
      });
      dispatch(update_product({ productId: "", data: {}, action: "clean" }));
      dispatch(fetchProducts());
    } else if (updateProduct.status === "failed") {
      Swal.fire({
        title: "Error!",
        text: `${updateProduct.message}`,
        icon: "error",
      });
    }
  }, [updateProduct]);

  return (
    <div>
      <Button variant="outlined" color="info" onClick={handleOpen}>
        <Edit />
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditProductWrapper>
          <CloseButtonWrapper>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </Button>
          </CloseButtonWrapper>
          <AddProductWrapper>
            <AddProductContainer>
              <AddProductImageWrapper>
                <img src={addProduct} />
              </AddProductImageWrapper>
              <AddProductFormWrapper>
                <AddProductFormContainer
                  component="form"
                  onSubmit={handleSubmit}
                >
                  {/* <Box>
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
                  </Box> */}
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
                  <EditProductButtonWrapper>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <Close />
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="success">
                      <Save />
                      Update
                    </Button>
                  </EditProductButtonWrapper>
                </AddProductFormContainer>
              </AddProductFormWrapper>
            </AddProductContainer>
          </AddProductWrapper>
        </EditProductWrapper>
      </Modal>
    </div>
  );
}
