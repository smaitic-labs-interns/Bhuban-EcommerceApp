import React, { useState, useEffect, useMemo } from 'react';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  Box,
  TextField,
} from '@mui/material';
import {
  ProductContainer,
  ProductWrapper,
  ProductActionWrapper,
  OpenCloseBtnWrapper,
  OpenAddProductButton,
  CloseAddProductButton,
  AddProductCntntWrapper,
  DisplaySearchWrapper,
  DisplayProductsWrapper,
  SearchBarWrapper,
  TableWrapper,
} from 'Pages/Admin/styles/productStyle';

import { Delete, Add, Search, Close } from '@mui/icons-material';
import { delete_product, fetch_limited_product, search_product } from 'Actions/productActions';

import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import AddProduct from 'Pages/Admin/Components/modals/AddProduct';
import ViewProduct from 'Pages/Admin/Components/modals/ViewProduct';
import EditProduct from 'Pages/Admin/Components/modals/EditProduct';
import { isEmpty } from 'Utils';

export default function Product() {
  const limitedProduct = useSelector((state) => state.limitedProduct);
  const deleteProduct = useSelector((state) => state.deleteProduct);
  const searchProduct = useSelector((state) => state.searchProduct);
  const dispatch = useDispatch();

  const [noOfProduct, setNoOfProduct] = useState(5);
  const [searchKey, setSearchKey] = useState('');
  const [addProductForm, setaddProductForm] = useState(false);
  const [product, setProduct] = useState({
    all: [],
    next: {},
    previous: {},
  });

  let currentPage =
    !isEmpty(product.next) && !isEmpty(product.previous)
      ? product.next.page - 1
      : !isEmpty(product.next)
      ? product.next.page - 1
      : !isEmpty(product.previous)
      ? product.previous.page + 1
      : 1;

  useEffect(() => {
    dispatch(fetch_limited_product({ page: 1, limit: noOfProduct, action: 'fetch' }));
  }, [noOfProduct, dispatch]);

  const handleDelete = (id) => {
    if (id && id !== ' ') {
      Swal.fire({
        title: 'Do you want to remove this product?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(delete_product({ productId: id, action: 'delete' }));
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
  };

  const handlePage = (page) => {
    dispatch(fetch_limited_product({ page: page, limit: noOfProduct, action: 'fetch' }));
  };

  const handleSearch = () => {
    if (searchKey && searchKey !== '') {
      dispatch(search_product({ keyword: searchKey, action: 'search' }));
    }
  };

  useEffect(() => {
    if (deleteProduct.status === 'success') {
      Swal.fire({
        title: 'Success!',
        text: `${deleteProduct.message}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      dispatch(
        fetch_limited_product({
          page: currentPage,
          limit: noOfProduct,
          action: 'fetch',
        }),
      );
    } else if (deleteProduct.status === 'failed') {
      Swal.fire({
        title: 'Error!',
        text: `${deleteProduct.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    if (deleteProduct.status !== null) {
      dispatch(
        delete_product({
          productId: '',
          action: 'clean',
        }),
      );
    }
  }, [deleteProduct, dispatch, noOfProduct, currentPage]);

  useEffect(() => {
    dispatch(
      fetch_limited_product({
        page: currentPage,
        limit: noOfProduct,
        action: 'fetch',
      }),
    );
  }, [noOfProduct, dispatch, currentPage]);

  useEffect(() => {
    setProduct((product) => ({
      ...product,
      all: limitedProduct.all,
      next: limitedProduct.next,
      previous: limitedProduct.previous,
    }));
  }, [limitedProduct]);

  useMemo(() => {
    if (searchProduct.status === 'success') {
      setProduct((product) => ({
        ...product,
        all: searchProduct.products,
        next: {},
        previous: {},
      }));
    } else if (searchProduct.status === 'failed') {
      Swal.fire({
        title: 'Error!',
        text: `${searchProduct.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } else if (searchProduct.status !== null) {
      dispatch(search_product({ keyword: '', action: 'clean' }));
    }
  }, [searchProduct, dispatch]);

  return (
    <>
      <ProductWrapper>
        <ProductContainer>
          <ProductActionWrapper>
            <OpenCloseBtnWrapper>
              <OpenAddProductButton
                sx={{ display: addProductForm ? 'none' : 'flex' }}
                key={1}
                onClick={() => setaddProductForm((addProductForm) => !addProductForm)}
              >
                <Add /> {' Add product '}
              </OpenAddProductButton>
              <CloseAddProductButton
                sx={{ display: addProductForm ? 'flex' : 'none' }}
                key={2}
                onClick={() => setaddProductForm((addProductForm) => !addProductForm)}
              >
                <Close /> {' Close '}
              </CloseAddProductButton>
            </OpenCloseBtnWrapper>

            {addProductForm ? (
              <AddProductCntntWrapper>
                <AddProduct />
              </AddProductCntntWrapper>
            ) : (
              ''
            )}
          </ProductActionWrapper>
          <DisplaySearchWrapper>
            <DisplayProductsWrapper>
              Display
              <Select
                sx={{ height: '1.5rem', margin: '0.5rem' }}
                id='noOfProduct'
                name='noOfProduct'
                value={noOfProduct}
                label='Shipment Type'
                onChange={(e) => {
                  setNoOfProduct(e.target.value);
                }}
              >
                <MenuItem value={5}>{5}</MenuItem>
                <MenuItem value={10}>{10}</MenuItem>
                <MenuItem value={20}>{20}</MenuItem>
                <MenuItem value={50}>{50}</MenuItem>
                <MenuItem value={100}>{100}</MenuItem>
              </Select>
              Products per page
            </DisplayProductsWrapper>
            <SearchBarWrapper>
              <TextField
                fullWidth
                label='Enter keyword to search'
                name='searchKeyword'
                id='searchkeyword'
                sx={{ background: '#fff' }}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <Button
                variant='contained'
                color='info'
                sx={{ padding: '1rem 1.5rem' }}
                onClick={() => handleSearch()}
              >
                <Search /> {' Search '}
              </Button>
            </SearchBarWrapper>
          </DisplaySearchWrapper>
          <TableWrapper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Actions</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.all.length !== 0 ? (
                    product.all.map((product) => {
                      let { id, category, model, brand, quantity } = product;
                      return (
                        <TableRow key={id}>
                          <TableCell>
                            <input type='checkbox' />
                          </TableCell>
                          <TableCell>{id}</TableCell>
                          <TableCell>{category}</TableCell>
                          <TableCell>{model}</TableCell>
                          <TableCell>{brand}</TableCell>
                          <TableCell>{quantity}</TableCell>
                          <TableCell>
                            <ViewProduct product={product} />
                          </TableCell>
                          <TableCell>
                            <EditProduct product={product} />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant='outlined'
                              color='error'
                              onClick={() => {
                                handleDelete(id);
                              }}
                            >
                              <Delete sx={{ color: 'red' }} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell>No Product Found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TableWrapper>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              border: 'solid green 2px',
              margin: '2rem',
              justifyContent: 'space-between',
              padding: '1rem',
            }}
          >
            <Button
              variant='outlined'
              color='primary'
              disabled={isEmpty(product.previous)}
              onClick={() => handlePage(product.previous.page)}
            >
              Previous
            </Button>
            <Box>
              <Typography>{`Page: ${currentPage}`}</Typography>
            </Box>
            <Button
              variant='outlined'
              color='success'
              disabled={isEmpty(product.next)}
              onClick={() => handlePage(product.next.page)}
            >
              Next
            </Button>
          </Box>
        </ProductContainer>
      </ProductWrapper>
    </>
  );
}
