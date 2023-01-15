import React, { useMemo, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import SearchList from 'pages/Search/Components/SearchList';
import {
  SearchWrapper,
  SearchBoxWrapper,
  SearchInputWrapper,
  SearchButtonWrapper,
  SearchButton,
  SearchResultWrapper,
} from 'pages/Search/Styles/searchStyle';
import { Search } from '@mui/icons-material';
import { search_product } from 'redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';

export default function SearchPage() {
  const products = useSelector((state) => state.searchProduct);
  const dispatch = useDispatch();
  const [allProduct, setAllProduct] = useState({ message: '', products: [] });
  const [searchKey, setSearchKey] = useState('');

  const handleSearch = () => {
    if (searchKey && searchKey !== '') {
      dispatch(search_product({ keyword: searchKey, action: 'search' }));
    }
  };

  useMemo(() => {
    if (products.status === 'success') {
      setAllProduct((allProduct) => ({
        ...allProduct,
        message: products.message,
        products: products.products,
      }));
    } else if (products.status === 'failed') {
      setAllProduct((allProduct) => ({
        ...allProduct,
        message: products.message,
        products: [],
      }));
    }
    // if (products.status !== null) {
    //   dispatch(search_product({ keyword: '', action: 'clean' }));
    // }
  }, [products, dispatch]);

  return (
    <SearchWrapper>
      <SearchBoxWrapper>
        <SearchInputWrapper>
          <TextField
            fullWidth
            label='Enter Search Keyword'
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </SearchInputWrapper>
        <SearchButtonWrapper>
          <SearchButton onClick={() => handleSearch()}>
            <Search />
            Search
          </SearchButton>
        </SearchButtonWrapper>
      </SearchBoxWrapper>
      <SearchResultWrapper>
        {allProduct.message && <Typography>Search Result: {allProduct.message}</Typography>}
      </SearchResultWrapper>
      {allProduct.products.length !== 0 && <SearchList products={allProduct.products} />}
    </SearchWrapper>
  );
}
