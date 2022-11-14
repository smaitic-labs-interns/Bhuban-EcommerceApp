import React, { useState, useEffect } from "react";
import {
  ProductContainer,
  ProductWrapper,
  ProductActionWrapper,
  AddProductButton,
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
} from "@mui/material";
import { RemoveRedEye, Edit, Delete } from "@mui/icons-material";
import { delete_product } from "../../../redux/actions/productActions";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/actions/productActions";

export default function Product() {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setAllProduct(products);
  }, [products]);

  // Actions
  const handleDelete = (id) => {
    alert(id);
    dispatch(delete_product(id));
  };
  return (
    <>
      <ProductWrapper>
        <ProductContainer>
          <ProductActionWrapper>
            <AddProductButton>
              <Typography>ADD PRODUCT</Typography>
            </AddProductButton>
            <RightSideButtonsWrapper>
              <Typography>Other Operations</Typography>
            </RightSideButtonsWrapper>
          </ProductActionWrapper>
          <DisplaySearchWrapper>
            <DisplayProductsWrapper>
              Display 10 Products per page
            </DisplayProductsWrapper>
            <SearchBarWrapper>
              <input type="text" />
              <input
                type="submit"
                placeholder="Enter Search Keyword"
                value={"Search"}
              />
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
                  {allProduct
                    ? allProduct.map((product) => {
                        const {
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
                          <TableRow>
                            <TableCell>
                              <input type="checkbox" />
                            </TableCell>
                            <TableCell>{id}</TableCell>
                            <TableCell>{category}</TableCell>
                            <TableCell>{model}</TableCell>
                            <TableCell>{brand}</TableCell>
                            <TableCell sx={{ color: "green" }}>
                              <RemoveRedEye />
                            </TableCell>
                            <TableCell sx={{ color: "blue" }}>
                              <Edit />
                            </TableCell>
                            <TableCell sx={{ color: "red" }}>
                              <Button
                                onClick={() => {
                                  handleDelete(id);
                                }}>
                                <Delete sx={{ color: "red" }} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : ""}
                </TableBody>
              </Table>
            </TableContainer>
          </TableWrapper>
        </ProductContainer>
      </ProductWrapper>
    </>
  );
}
