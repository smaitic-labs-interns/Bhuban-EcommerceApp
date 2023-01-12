import React, { useEffect, useState } from 'react';
import { Button, Box, Modal, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, Update, Cancel, SupervisedUserCircle } from '@mui/icons-material';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { fetch_limited_user, update_user_role } from 'redux/actions/userActions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UpdateRole({ user }) {
  const login = useSelector((state) => state.login);
  const userId = login.isLogined ? login.id : '';

  const updateUserRole = useSelector((state) => state.updateUserRole);
  const dispatch = useDispatch();

  const [open, setOpen3] = useState(false);
  const handleOpen = () => setOpen3(true);
  const [role, setRole] = useState('');

  const handleUpdateRole = () => {
    if (role && role !== '' && userId !== '') {
      dispatch(
        update_user_role({
          userId: user.id,
          role: role,
          updatedBy: userId,
          action: 'update',
        }),
      );
    } else {
      setOpen3(false); //close module
      Swal.fire({
        title: 'Error!',
        text: 'Please select User Role',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  useEffect(() => {
    setOpen3(false);
    if (updateUserRole.status === 'success') {
      Swal.fire({
        title: 'Success!',
        text: `${updateUserRole.message}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      dispatch(fetch_limited_user({ page: 1, limit: 5, action: 'fetch' }));
    } else if (updateUserRole.status === 'failed') {
      Swal.fire({
        title: 'Error!',
        text: `${updateUserRole.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    if (updateUserRole.status !== null) {
      dispatch(
        update_user_role({
          userId: '',
          role: '',
          updatedBy: '',
          action: 'clean',
        }),
      );
    }
  }, [updateUserRole, dispatch]);

  const USER_ROLE = ['superadmin', 'admin', 'editor', 'user'];

  return (
    <>
      <Button variant='outlined' color='info' onClick={handleOpen}>
        <Edit />
        <SupervisedUserCircle />
      </Button>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box component={'form'}>
            <Box>
              <InputLabel id='role-type-label'>Select User Role</InputLabel>
              <Select
                fullWidth
                labelId='role-type-label'
                id='updateRole'
                name='updateRole'
                label='Roles'
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                {USER_ROLE.length !== 0 ? (
                  USER_ROLE.map((rle) => {
                    return (
                      <MenuItem key={rle} value={rle}>
                        {rle}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value={'Not Role Available'}>{'Not Role Available'}</MenuItem>
                )}
              </Select>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '2rem 0',
              padding: '0 1rem',
            }}
          >
            <Button variant='contained' color='error' onClick={() => setOpen3(false)}>
              <Cancel />
              {' Cancel'}
            </Button>

            <Button variant='contained' color='primary' onClick={handleUpdateRole}>
              <Update />
              {' Update'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
