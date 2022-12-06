import React, { useState, useEffect } from "react";
import {
  ProductContainer,
  ProductWrapper,
  ProductActionWrapper,
  AddProductButton,
  AddProductCntntWrapper,
  RightSideButtonsWrapper,
  DisplaySearchWrapper,
  DisplayProductsWrapper,
  SearchBarWrapper,
  TableWrapper,
} from "../styles/productStyle";
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
} from "@mui/material";

import { Delete, Add, Search } from "@mui/icons-material";
import { delete_product } from "../../../redux/actions/productActions";

import { useDispatch, useSelector } from "react-redux";
import { fetch_limited_product } from "../../../redux/actions/productActions";
import Swal from "sweetalert2";
import AddProduct from "./modals/AddProduct";
import ViewProduct from "./modals/ViewProduct";
import EditProduct from "./modals/EditProduct";
import { isEmpty } from "../../../utils";

export default function Product() {
  const limitedProduct = useSelector((state) => state.limitedProduct);
  const deleteProduct = useSelector((state) => state.deleteProduct);
  const dispatch = useDispatch();

  const [noOfProduct, setNoOfProduct] = useState(5);
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
    dispatch(
      fetch_limited_product({ page: 1, limit: noOfProduct, action: "fetch" })
    );
  }, []);

  const handleDelete = (id) => {
    if (id && id !== " ") {
      Swal.fire({
        title: "Do you want to remove this product?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(delete_product({ productId: id, action: "delete" }));
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  const handlePage = (page) => {
    dispatch(
      fetch_limited_product({ page: page, limit: noOfProduct, action: "fetch" })
    );
  };

  useEffect(() => {
    if (deleteProduct.status === "success") {
      Swal.fire({
        title: "Success!",
        text: `${deleteProduct.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch(
        fetch_limited_product({
          page: currentPage,
          limit: noOfProduct,
          action: "fetch",
        })
      );
    } else if (deleteProduct.status === "failed") {
      Swal.fire({
        title: "Error!",
        text: `${deleteProduct.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    if (deleteProduct.status !== null) {
      dispatch(
        delete_product({
          productId: "",
          action: "clean",
        })
      );
    }
  }, [deleteProduct]);

  useEffect(() => {
    setProduct((product) => ({
      ...product,
      all: limitedProduct.all,
      next: limitedProduct.next,
      previous: limitedProduct.previous,
    }));
  }, [limitedProduct]);

  useEffect(() => {
    dispatch(
      fetch_limited_product({
        page: currentPage,
        limit: noOfProduct,
        action: "fetch",
      })
    );
  }, [noOfProduct]);
  return (
    <>
      <ProductWrapper>
        <ProductContainer>
          <ProductActionWrapper>
            <AddProductButton
              onClick={() =>
                setaddProductForm((addProductForm) => !addProductForm)
              }
            >
              <Add /> {" Add product "}
            </AddProductButton>
            {addProductForm ? (
              <AddProductCntntWrapper>
                <AddProduct />
              </AddProductCntntWrapper>
            ) : (
              ""
            )}
          </ProductActionWrapper>
          <DisplaySearchWrapper>
            <DisplayProductsWrapper>
              Display
              <Select
                sx={{ height: "1.5rem", margin: "0.5rem" }}
                id="noOfProduct"
                name="noOfProduct"
                value={noOfProduct}
                label="Shipment Type"
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
                label="Enter keyword to search"
                name="searchKeyword"
                id="searchkeyword"
                sx={{ background: "#fff" }}
              />
              <Button
                variant="contained"
                color="info"
                sx={{ padding: "1rem 1.5rem" }}
              >
                <Search /> {" Search "}
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
                    <TableCell></TableCell>
                    <TableCell>Actions</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.all.length !== 0 ? (
                    product.all.map((product) => {
                      let {
                        id,
                        category,
                        model,
                        brand,
                        description,
                        price,
                        quantity,
                        rating,
                        images,
                      } = product;
                      return (
                        <TableRow key={id}>
                          <TableCell>
                            <input type="checkbox" />
                          </TableCell>
                          <TableCell>{id}</TableCell>
                          <TableCell>{category}</TableCell>
                          <TableCell>{model}</TableCell>
                          <TableCell>{brand}</TableCell>
                          <TableCell>
                            <ViewProduct product={product} />
                          </TableCell>
                          <TableCell>
                            <EditProduct product={product} />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                handleDelete(id);
                              }}
                            >
                              <Delete sx={{ color: "red" }} />
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
              display: "flex",
              alignItems: "center",
              width: "100%",
              border: "solid green 2px",
              margin: "2rem",
              justifyContent: "space-between",
              padding: "1rem",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              disabled={isEmpty(product.previous)}
              onClick={() => handlePage(product.previous.page)}
            >
              Previous
            </Button>
            <Box>
              <Typography>{`Page: ${currentPage}`}</Typography>
            </Box>
            <Button
              variant="outlined"
              color="success"
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
