import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import {
  RemoveOutlined,
  Add,
  Update,
  Cancel,
  Edit,
  Save,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import {
  fetch_user_Cart,
  update_user_cart,
} from "../../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { RemoveRedEye, Close } from "@mui/icons-material";
import {
  ViewOrderModalWrapper,
  CloseButtonWrapper,
  ContentTitle,
  ContentTable,
} from "../styles/viewOrderModalStyle";
import { useFormik } from "formik";
import {
  FormWrapper,
  FormContainer,
  OrderFormInputWrapper,
  PlaceOrderButtonWrapper,
} from "../styles/editAddressModuleStyle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditAddressModel({ data }) {
  //   const updateCart = usesSelector((state) => state.updateCart);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const userId = login.isLogined ? login.userId : null;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const initialValues = {
    // userId: userId,
    country: "",
    province: "",
    city: "",
    ward: "",
    tole: "",
    houseNo: "",
    shipmentType: "",
    paymentType: "",
  };

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    // validationSchema: loginSchema, // for data validation
    onSubmit: (values) => {
      //   dispatch(place_order({ ...values, action: "add" }));
    },
  });

  return (
    <div>
      <Button variant="outlined" color="info" onClick={handleOpen}>
        <Edit />
        Edit
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseButtonWrapper onClick={() => setOpen(false)}>
            <Close />
          </CloseButtonWrapper>
          <FormWrapper>
            <FormContainer component={"form"} onSubmit={handleSubmit}>
              <OrderFormInputWrapper>
                <InputLabel id="country-label">Select Country</InputLabel>
                <Select
                  fullWidth
                  labelId="country-label"
                  id="country"
                  name="country"
                  value={values.country}
                  label="Country Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value={"Not Available"}>{"Not Available"}</MenuItem>
                </Select>
              </OrderFormInputWrapper>

              <OrderFormInputWrapper>
                <InputLabel id="province-label">
                  Select Provience/state
                </InputLabel>
                <Select
                  fullWidth
                  labelId="province-label"
                  id="province"
                  name="province"
                  value={values.province}
                  label="Select Provience/state"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value={"Not Available"}>{"Not Available"}</MenuItem>
                </Select>
              </OrderFormInputWrapper>

              <OrderFormInputWrapper>
                <InputLabel id="city-label">Select City/Local-level</InputLabel>
                <Select
                  fullWidth
                  labelId="city-label"
                  id="city"
                  name="city"
                  value={values.city}
                  label="Select City / local-level"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="Nepal">{"Kathmandu"}</MenuItem>
                  <MenuItem value={"India"}>{"Bhaktapur"}</MenuItem>
                  <MenuItem value={"Pakistan"}>{"Dhapakhel"}</MenuItem>
                </Select>
              </OrderFormInputWrapper>

              <OrderFormInputWrapper>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="tole"
                  label="tole"
                  name="tole"
                  autoComplete="tole"
                  value={values.tole}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  //   error={errors.email && Boolean(errors.email)}
                />
              </OrderFormInputWrapper>

              <OrderFormInputWrapper>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ward"
                  label="ward"
                  name="ward"
                  autoComplete="ward"
                  value={values.ward}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  //   error={errors.email && Boolean(errors.email)}
                />
              </OrderFormInputWrapper>

              <OrderFormInputWrapper>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="houseNo"
                  label="houseNo"
                  name="houseNo"
                  autoComplete="houseNo"
                  value={values.houseNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  //   error={errors.email && Boolean(errors.email)}
                />
              </OrderFormInputWrapper>

              <PlaceOrderButtonWrapper>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpen(false)}
                >
                  <Cancel />
                  &nbsp; Cancel
                </Button>
                <Button variant="contained" color="success">
                  <Save />
                  &nbsp; Update
                </Button>
              </PlaceOrderButtonWrapper>
            </FormContainer>
          </FormWrapper>
        </Box>
      </Modal>
    </div>
  );
}
