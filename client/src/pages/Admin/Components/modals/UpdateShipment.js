import React, { useEffect, useState } from 'react';
import { Button, Box, Modal, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, Update, Cancel } from '@mui/icons-material';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { update_order_shipment, fetch_limited_order } from 'redux/actions/orderActions';

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

export default function UpdateShipment({ shipment, orderId }) {
  const updateOrderShipment = useSelector((state) => state.updateOrderShipment);
  const dispatch = useDispatch();
  const [open, setOpen3] = useState(false);
  const handleOpen = () => setOpen3(true);
  const [updsht, setUpdSht] = useState({ type: '', status: '' });

  const handleUpdateShipment = () => {
    if (updsht && (updsht.status !== '' || updsht.type !== '')) {
      if (updsht?.type.length === 0) {
        updsht.type = shipment.type;
      }

      dispatch(
        update_order_shipment({
          orderId: orderId,
          shipment: { type: updsht.type, status: updsht.status },
          action: 'update',
        }),
      );
    } else {
      setOpen3(false); //close module
      Swal.fire({
        title: 'Error!',
        text: 'Please select shipment Status',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  useEffect(() => {
    setOpen3(false);
    if (updateOrderShipment.status === 'success') {
      Swal.fire({
        title: 'Success!',
        text: `${updateOrderShipment.message}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      dispatch(fetch_limited_order({ page: 1, limit: 5, action: 'fetch' }));
    } else if (updateOrderShipment.status === 'failed') {
      Swal.fire({
        title: 'Error!',
        text: `${updateOrderShipment.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    if (updateOrderShipment.status !== null) {
      dispatch(
        update_order_shipment({
          orderId: '',
          shipment: {},
          action: 'clean',
        }),
      );
    }
  }, [updateOrderShipment]);

  const SHIPMENT_STATUS = [
    'pending',
    'pre-transit',
    'in-transit',
    'waiting-for-delivery',
    'out-of-delivery',
    'delivered',
    'returned',
    'replaced',
    'failed-attempt',
  ];
  const SHIPMENT_TYPES = [
    'International',
    'Outside Valley',
    'Inside Valley',
    'Outside-RingRoad',
    'Inside- RIngRoad',
  ];

  return (
    <>
      <Button variant='outlined' color='info' onClick={handleOpen}>
        <Edit />
        Edit
      </Button>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box component={'form'}>
            <Box>
              <InputLabel id='shipment-type-label'>Select Payment Method</InputLabel>
              <Select
                fullWidth
                labelId='shipment-type-label'
                id='shipmentType'
                name='shipmentType'
                label='Shipment Method'
                onChange={(e) => {
                  setUpdSht((updsht) => ({
                    ...updsht,
                    type: e.target.value,
                  }));
                }}
              >
                {SHIPMENT_TYPES.length !== 0 ? (
                  SHIPMENT_TYPES.map((shmt) => {
                    return (
                      <MenuItem key={shmt} value={shmt}>
                        {shmt}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value={'Not Available'}>{'Not Available'}</MenuItem>
                )}
              </Select>
            </Box>
            <Box>
              <InputLabel id='shipment-status-label'>Select Shipment Status</InputLabel>
              <Select
                fullWidth
                labelId='shipment-status-label'
                id='shipmentStatus'
                name='shipmentStatus'
                label='Shipment Method'
                onChange={(e) => {
                  setUpdSht((updsht) => ({
                    ...updsht,
                    status: e.target.value,
                  }));
                }}
              >
                {SHIPMENT_STATUS.length !== 0 ? (
                  SHIPMENT_STATUS.map((shmt) => {
                    return (
                      <MenuItem key={shmt} value={shmt}>
                        {shmt}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value={'Not Available'}>{'Not Available'}</MenuItem>
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

            <Button variant='contained' color='primary' onClick={handleUpdateShipment}>
              <Update />
              {' Update'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
