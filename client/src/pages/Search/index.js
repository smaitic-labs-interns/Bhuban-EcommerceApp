import React, { useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import SearchList from 'pages/Search/Components/SearchList';
import {
  SearchWrapper,
  SearchBoxWrapper,
  SearchInputWrapper,
  SearchButtonWrapper,
  SearchButton,
} from 'pages/Search/Styles/searchStyle';
import { Search } from '@mui/icons-material';
import { search_product } from 'redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';

export default function SearchPage() {
  const products = useSelector((state) => state.searchProduct);
  const dispatch = useDispatch();
  const [allProduct, setAllProduct] = useState([]);

  const handleChange = (key) => {
    if (key && key !== '') {
      dispatch(search_product({ keyword: key, action: 'search' }));
    } else {
      dispatch(search_product({ keyword: key, action: 'clean' }));
    }
  };

  useMemo(() => {
    if (products.status === 'success') {
      setAllProduct(products.products);
    } else {
      setAllProduct([]);
    }
  }, [products]);

  return (
    <SearchWrapper>
      <SearchBoxWrapper>
        <SearchInputWrapper>
          <TextField
            fullWidth
            label='Enter Search Keyword'
            onChange={(e) => handleChange(e.target.value)}
          />
        </SearchInputWrapper>
        <SearchButtonWrapper>
          <SearchButton>
            <Search />
            Search
          </SearchButton>
        </SearchButtonWrapper>
      </SearchBoxWrapper>
      {allProduct.length !== 0 && <SearchList products={allProduct} />}
    </SearchWrapper>
  );
}
