import React, { useEffect, useState } from "react";
import { Button, TextField, Autocomplete, Typography } from "@mui/material";
import SearchList from "./Components/SearchList";
import {
  SearchWrapper,
  SearchBoxWrapper,
  SearchInputWrapper,
  SearchButtonWrapper,
  SearchButton,
} from "./Styles/searchStyle";
import { Search } from "@mui/icons-material";
import { search_product } from "../../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";

export default function SearchPage() {
  const products = useSelector((state) => state.searchProduct);
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [allProduct, setAllProduct] = useState([]);
  const [productName, setProductsName] = useState([]);
  const [callSearch, setCallSearch] = useState(false);

  const handleChange = (key) => {
    if (key && key !== "") {
      dispatch(search_product({ keyword: key, action: "search" }));
    }
  };

  const handleSearch = () => {
    setCallSearch(true);
    dispatch(search_product({ keyword: keyword, action: "clean" }));
    if (keyword && keyword !== "") {
      console.log("KeyWord: ", keyword);
      dispatch(search_product({ keyword: keyword, action: "search" }));
    }
  };

  useEffect(() => {
    if (products.status === "success") {
      let labels = [];
      for (var prdct of products.products) {
        labels.push(prdct.model);
      }
      setProductsName(labels);
    }
  }, [products]);

  useEffect(() => {
    if (products.status === "success" && callSearch === true) {
      setAllProduct(products.products);
    }
  }, [callSearch, products]);
  return (
    <SearchWrapper>
      <SearchBoxWrapper>
        <SearchInputWrapper>
          <Autocomplete
            onChange={(event, value) => setKeyword(value)}
            disablePortal
            id="combo-box-demo"
            options={productName}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Movie"
                onChange={(e) => handleChange(e.target.value)}
              />
            )}
          />
        </SearchInputWrapper>
        <SearchButtonWrapper>
          <SearchButton onClick={() => handleSearch()}>
            <Search />
            Search
          </SearchButton>
        </SearchButtonWrapper>
      </SearchBoxWrapper>
      {allProduct.length !== 0 ? (
        <SearchList products={allProduct} />
      ) : callSearch === true ? (
        <Typography>NO Product Found</Typography>
      ) : (
        ""
      )}
    </SearchWrapper>
  );
}
