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

import {
  RemoveRedEye,
  Edit,
  Delete,
  PersonAddAltSharp,
  Add,
  Search,
} from "@mui/icons-material";
import { delete_product } from "../../../redux/actions/productActions";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/actions/productActions";
import Swal from "sweetalert2";
import AddProduct from "./modals/AddProduct";
import ViewProduct from "./modals/ViewProduct";
import EditProduct from "./modals/EditProduct";

export default function Product() {
  const products = useSelector((state) => state.allProducts.products);
  const deleteProduct = useSelector((state) => state.deleteProduct);
  const dispatch = useDispatch();
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [noOfProduct, setNoOfProduct] = useState(5);
  const [addProductForm, setaddProductForm] = useState(false);

  useEffect(() => {
    setAllProduct(products);
  }, [products]);

  // Actions
  const handleView = (id) => {
    alert(id);
  };

  const handleEdit = (id) => {
    alert(id);
  };

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

  let productList = [];

  const handleNextPage = () => {
    if (currentPage * noOfProduct < allProduct.length) {
      setCurrentPage(currentPage + 1);
      setPage(noOfProduct * currentPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage < allProduct.length / noOfProduct) {
      setCurrentPage(currentPage - 1);
      setPage(page - noOfProduct);
    }
  };

  for (let i = page; i < noOfProduct * currentPage; i++) {
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
    } = allProduct[i] ? allProduct[i] : [];

    if (i < allProduct.length) {
      productList.push(
        <TableRow>
          <TableCell>
            <input type="checkbox" />
          </TableCell>
          <TableCell>{id}</TableCell>
          <TableCell>{category}</TableCell>
          <TableCell>{model}</TableCell>
          <TableCell>{brand}</TableCell>
          <TableCell>
            <ViewProduct product={allProduct[i]} />
          </TableCell>
          <TableCell>
            <EditProduct product={allProduct[i]} />
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
    }
  }

  useEffect(() => {
    if (deleteProduct.status === "success") {
      Swal.fire({
        title: "Success!",
        text: `${deleteProduct.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch(fetchProducts());
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
                <TableBody>{productList}</TableBody>
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
              onClick={() => handlePreviousPage()}
            >
              Previous
            </Button>
            <Box>
              <Typography>
                {currentPage} of page {allProduct.length / noOfProduct}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="success"
              onClick={() => handleNextPage()}
            >
              Next
            </Button>
          </Box>
        </ProductContainer>
      </ProductWrapper>
    </>
  );
}
