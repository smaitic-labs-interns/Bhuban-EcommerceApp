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
  DisplaySearchWrapper,
  DisplayProductsWrapper,
  SearchBarWrapper,
  TableWrapper,
} from 'Pages/Admin/styles/productStyle';

import { Delete, Search } from '@mui/icons-material';
import { fetch_one_user, fetch_limited_user, remove_user } from 'redux/actions/userActions';

import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { isEmpty } from 'Utils';
import UpdateRole from './modals/UpdateRole';

export default function User() {
  const limitedUser = useSelector((state) => state.limitedUser);
  const removeUser = useSelector((state) => state.removeUser);
  const singleUser = useSelector((state) => state.singleUser);
  const dispatch = useDispatch();

  const [noOfUser, setNoOfUser] = useState(5);
  const [searchId, setSearchId] = useState('');
  const [user, setUser] = useState({
    all: [],
    next: {},
    previous: {},
  });

  let currentPage =
    !isEmpty(user.next) && !isEmpty(user.previous)
      ? user.next.page - 1
      : !isEmpty(user.next)
      ? user.next.page - 1
      : !isEmpty(user.previous)
      ? user.previous.page + 1
      : 1;

  useEffect(() => {
    dispatch(fetch_limited_user({ page: 1, limit: noOfUser, action: 'fetch' }));
  }, [noOfUser, dispatch]);

  const handleDelete = (id) => {
    if (id && id !== ' ') {
      Swal.fire({
        title: 'Do you want to remove this user?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(remove_user({ userId: id, action: 'delete' }));
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
  };

  const handlePage = (page) => {
    dispatch(fetch_limited_user({ page: page, limit: noOfUser, action: 'fetch' }));
  };

  const handleSearch = () => {
    if (searchId && searchId !== '') {
      dispatch(fetch_one_user({ userId: searchId, action: 'search' }));
    }
  };

  useEffect(() => {
    if (removeUser.status === 'success') {
      Swal.fire({
        title: 'Success!',
        text: `${removeUser.message}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      dispatch(
        fetch_limited_user({
          page: currentPage,
          limit: noOfUser,
          action: 'fetch',
        }),
      );
    } else if (removeUser.status === 'failed') {
      Swal.fire({
        title: 'Error!',
        text: `${removeUser.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    if (removeUser.status !== null) {
      dispatch(
        remove_user({
          userId: '',
          action: 'clean',
        }),
      );
    }
  }, [removeUser, dispatch, noOfUser, currentPage]);

  useEffect(() => {
    dispatch(
      fetch_limited_user({
        page: currentPage,
        limit: noOfUser,
        action: 'fetch',
      }),
    );
  }, [noOfUser, dispatch, currentPage]);

  useEffect(() => {
    setUser((user) => ({
      ...user,
      all: limitedUser.all,
      next: limitedUser.next,
      previous: limitedUser.previous,
    }));
  }, [limitedUser]);

  useMemo(() => {
    if (singleUser.status === 'success') {
      setUser((product) => ({
        ...product,
        all: singleUser.data,
        next: {},
        previous: {},
      }));
    } else if (singleUser.status === 'failed') {
      Swal.fire({
        title: 'Error!',
        text: `${singleUser.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } else if (singleUser.status !== null) {
      dispatch(fetch_one_user({ userId: '', action: 'clean' }));
    }
  }, [singleUser, dispatch]);

  return (
    <>
      <ProductWrapper>
        <ProductContainer>
          <DisplaySearchWrapper>
            <DisplayProductsWrapper>
              Display
              <Select
                sx={{ height: '1.5rem', margin: '0.5rem' }}
                id='noOfProduct'
                name='noOfProduct'
                value={noOfUser}
                label='Shipment Type'
                onChange={(e) => {
                  setNoOfUser(e.target.value);
                }}
              >
                <MenuItem value={5}>{5}</MenuItem>
                <MenuItem value={10}>{10}</MenuItem>
                <MenuItem value={20}>{20}</MenuItem>
                <MenuItem value={50}>{50}</MenuItem>
                <MenuItem value={100}>{100}</MenuItem>
              </Select>
              Users per page
            </DisplayProductsWrapper>
            <SearchBarWrapper>
              <TextField
                fullWidth
                label='Enter Id to search'
                name='searchId'
                id='searchId'
                sx={{ background: '#fff' }}
                onChange={(e) => setSearchId(e.target.value)}
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
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Registered At</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user?.all?.length !== 0 ? (
                    user?.all?.map((oneUser) => {
                      let { id, firstname, middlename, lastname, email, address, role, createdat } =
                        oneUser;
                      let fullName = `${firstname ? firstname : ''} ${
                        firstname ? middlename : ''
                      } ${firstname ? lastname : ''}`;
                      return (
                        <TableRow key={id}>
                          <TableCell>
                            <input type='checkbox' />
                          </TableCell>
                          <TableCell>{id}</TableCell>
                          <TableCell>{fullName}</TableCell>
                          <TableCell>{email}</TableCell>
                          <TableCell>{address}</TableCell>
                          <TableCell>{role}</TableCell>
                          <TableCell>{createdat}</TableCell>
                          <TableCell>
                            <UpdateRole user={oneUser} />
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
                      <TableCell>No User Found</TableCell>
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
              disabled={isEmpty(user?.previous)}
              onClick={() => handlePage(user?.previous?.page)}
            >
              Previous
            </Button>
            <Box>
              <Typography>{`Page: ${currentPage}`}</Typography>
            </Box>
            <Button
              variant='outlined'
              color='success'
              disabled={isEmpty(user?.next)}
              onClick={() => handlePage(user?.next?.page)}
            >
              Next
            </Button>
          </Box>
        </ProductContainer>
      </ProductWrapper>
    </>
  );
}
