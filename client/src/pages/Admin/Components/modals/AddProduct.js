import React, { useState, useEffect } from 'react';
import {
  AddProductContainer,
  AddProductFormWrapper,
  AddProductFormContainer,
  AddProductFormSelectImageWrapper,
  PreviewImageWrapper,
  AddProductImageWrapper,
  AddProductWrapper,
  AddProductFormInputWrapper,
  AddProductButtonWrapper,
} from '../../styles/modals/addProductStyle';

import { useFormik } from 'formik';

import { TextField, Button } from '@mui/material';
import addProductImage from 'public/images/addProduct.png';
import { add_product, fetch_limited_product } from 'redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { addProductRules } from 'validation';
import Swal from 'sweetalert2';

export default function AddProduct() {
  const addProduct = useSelector((state) => state.addProduct);
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const login = useSelector((state) => state.login);
  const userId = login.isLogined ? login.userId : null;

  const initialValues = {
    brand: '',
    category: '',
    model: '',
    name: '',
    price: '',
    quantity: '',
    description: '',
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: addProductRules,
    onSubmit: (values) => {
      const formData = new FormData();
      Array.from(image).map((item) => {
        formData.append(`image${index}`, item);
      });
      formData.append('brand', values.brand);
      formData.append('category', values.category);
      formData.append('model', values.model);
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('quantity', values.quantity);
      formData.append('description', values.description);
      formData.append('addedBy', userId);
      dispatch(add_product({ value: formData, action: 'add' }));
    },
  });

  let index = 0;

  useEffect(() => {
    if (addProduct.status === 'success') {
      Swal.fire({
        title: 'Success!',
        text: `${addProduct.message}`,
        icon: 'success',
      });
      dispatch(
        fetch_limited_product({
          page: 1,
          limit: 5,
          action: 'fetch',
        }),
      );
    } else if (addProduct.status === 'failed') {
      Swal.fire({
        title: 'Error!',
        text: `${addProduct.message}`,
        icon: 'error',
      });
    }

    if (addProduct.status !== null) {
      dispatch(add_product({ value: {}, action: 'clean' }));
    }
  }, [addProduct, dispatch]);

  return (
    <AddProductWrapper>
      <AddProductContainer>
        <AddProductImageWrapper>
          <img src={addProductImage} alt='product' />
        </AddProductImageWrapper>
        <AddProductFormWrapper>
          <AddProductFormContainer component='form' noValidate onSubmit={handleSubmit}>
            <AddProductFormSelectImageWrapper>
              <input
                onChange={(e) => {
                  setImage(e.target.files);
                }}
                type='file'
                name='pImage'
                id='pImage'
                multiple
              />
              <PreviewImageWrapper>
                {Array.from(image).map((item) => {
                  index++;
                  return <img key={index} src={item ? URL.createObjectURL(item) : null} alt='' />;
                })}
              </PreviewImageWrapper>
            </AddProductFormSelectImageWrapper>
            <AddProductFormInputWrapper>
              <TextField
                fullWidth
                required
                autoComplete='brand'
                name='brand'
                id='brand'
                label='Product Brand'
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.brand && Boolean(errors.brand)}
                helperText={touched.brand && errors.brand}
              />
            </AddProductFormInputWrapper>
            <AddProductFormInputWrapper>
              <TextField
                fullWidth
                required
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
                fullWidth
                required
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
                fullWidth
                required
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
                fullWidth
                required
                name='price'
                label='price (Mrp.)'
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
                fullWidth
                required
                name='quantity'
                label='quantity'
                type='number'
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
              minRows={10}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
            <AddProductButtonWrapper>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, background: 'green' }}>
                Add Product
              </Button>
            </AddProductButtonWrapper>
          </AddProductFormContainer>
        </AddProductFormWrapper>
      </AddProductContainer>
    </AddProductWrapper>
  );
}
