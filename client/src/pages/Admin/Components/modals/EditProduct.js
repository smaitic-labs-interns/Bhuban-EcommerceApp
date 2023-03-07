import React, { useState, useEffect } from 'react';
import {
  EditProductWrapper,
  CloseButtonWrapper,
  AddProductContainer,
  AddProductFormWrapper,
  AddProductFormContainer,
  AddProductImageWrapper,
  AddProductWrapper,
  AddProductFormInputWrapper,
  EditProductButtonWrapper,
} from '../../styles/modals/editProductStyle';

import { useFormik } from 'formik';

import { TextField, Modal, Button } from '@mui/material';
import addProductImage from 'public/images/addProduct.png';
import { update_product, fetch_limited_product } from 'redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Close, Edit, Save } from '@mui/icons-material';
import { addProductRules } from 'validation';

export default function EditProduct({ product }) {
  const updateProduct = useSelector((state) => state.updateProduct);
  const login = useSelector((state) => state.login);
  const userId = login.isLogined ? login.userId : null;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const initialValues = {
    category: product.category ? product.category : '',
    model: product.model ? product.model : '',
    brand: product.brand ? product.brand : '',
    name: product.name ? product.name : '',
    description: product.description ? product.description : '',
    price: product.price ? product.price : '',
    quantity: product.quantity ? product.quantity : '',
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: addProductRules,
    onSubmit: (values) => {
      dispatch(
        update_product({
          productId: product.id,
          userId: userId,
          data: values,
          action: 'update',
        }),
      );
    },
  });

  useEffect(() => {
    if (updateProduct.status === 'success') {
      setOpen(false);
      Swal.fire({
        title: 'Success!',
        text: `${updateProduct.message}`,
        icon: 'success',
      });
      dispatch(
        fetch_limited_product({
          page: 1,
          limit: 5,
          action: 'fetch',
        }),
      );
    } else if (updateProduct.status === 'failed') {
      Swal.fire({
        title: 'Error!',
        text: `${updateProduct.message}`,
        icon: 'error',
      });
    }

    if (updateProduct.status !== null) {
      dispatch(update_product({ productId: '', userId: '', data: {}, action: 'clean' }));
    }
  }, [updateProduct, dispatch]);

  return (
    <div>
      <Button variant='outlined' color='info' onClick={handleOpen}>
        <Edit />
      </Button>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <EditProductWrapper>
          <CloseButtonWrapper>
            <Button
              variant='outlined'
              color='error'
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
                <img src={addProductImage} alt='update product' />
              </AddProductImageWrapper>
              <AddProductFormWrapper>
                <AddProductFormContainer component='form' onSubmit={handleSubmit}>
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
                      required
                      fullWidth
                      id='brand'
                      label='Product Brand'
                      name='brand'
                      autoComplete='brand'
                      value={values.brand}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.brand && Boolean(errors.brand)}
                      helperText={touched.brand && errors.brand}
                    />
                  </AddProductFormInputWrapper>
                  <AddProductFormInputWrapper>
                    <TextField
                      required
                      fullWidth
                      id='name'
                      label='Product Name'
                      name='name'
                      autoComplete='name'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </AddProductFormInputWrapper>
                  <AddProductFormInputWrapper>
                    <TextField
                      required
                      fullWidth
                      name='category'
                      label='category'
                      type='text'
                      id='category'
                      autoComplete='category'
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.category && Boolean(errors.category)}
                      helperText={touched.category && errors.category}
                    />
                  </AddProductFormInputWrapper>
                  <AddProductFormInputWrapper>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='model'
                      label='model'
                      type='text'
                      id='model'
                      autoComplete='model'
                      value={values.model}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.model && Boolean(errors.model)}
                      helperText={touched.model && errors.model}
                    />
                  </AddProductFormInputWrapper>
                  <AddProductFormInputWrapper>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='price'
                      label='price (Mrp)'
                      type='number'
                      id='price'
                      autoComplete='price'
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.price && Boolean(errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </AddProductFormInputWrapper>
                  <AddProductFormInputWrapper>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='quantity'
                      label='quantity'
                      type='text'
                      id='quantity'
                      autoComplete='quantity'
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.quantity && Boolean(errors.quantity)}
                      helperText={touched.quantity && errors.quantity}
                    />
                  </AddProductFormInputWrapper>
                  <TextField
                    label='Product description'
                    fullWidth
                    required
                    id='description'
                    name='description'
                    autoComplete='description'
                    multiline
                    minRows={7}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  <EditProductButtonWrapper>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <Close />
                      Cancel
                    </Button>
                    <Button type='submit' variant='contained' color='success'>
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
