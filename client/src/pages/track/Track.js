import React, { useEffect, useState } from "react";
import {
  TrackWrapper,
  TrackContainer,
  TrackFormContainer,
  TrackFormInputWrapper,
  TrackFormSubmitBtnWrapper,
  TrackResultWrapper,
} from "./styles/trackStyle";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Select, MenuItem, TextField, InputLabel, Button } from "@mui/material";
import { track_order } from "../../redux/actions/orderActions";
import { Search } from "@mui/icons-material";
import Swal from "sweetalert2";
import TrackResult from "./Components/TrackResult";

export default function Track() {
  const dispatch = useDispatch();
  const trackOrder = useSelector((state) => state.trackOrder);

  const initialValues = {
    orderId: "",
    trackType: "",
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
      dispatch(
        track_order({
          orderId: values.orderId,
          track: values.trackType,
          action: "search",
        })
      );
    },
  });

  useEffect(() => {
    if (trackOrder.status === "failed") {
      Swal.fire({
        title: "Failed!",
        text: `${trackOrder.data}`,
        icon: "error",
        confirmButtonText: "ok",
      });
      dispatch(
        track_order({
          orderId: "",
          track: "",
          action: "clean",
        })
      );
    }
  }, [trackOrder]);

  return (
    <TrackWrapper>
      <TrackContainer>
        <TrackFormContainer component={"form"} onSubmit={handleSubmit}>
          <TrackFormInputWrapper>
            <TextField
              margin="normal"
              required
              fullWidth
              id="orderId"
              label="Order Id"
              name="orderId"
              autoComplete="orderId"
              value={values.orderId}
              onChange={handleChange}
              onBlur={handleBlur}
              //   error={errors.email && Boolean(errors.email)}
            />
          </TrackFormInputWrapper>
          <TrackFormInputWrapper>
            <InputLabel id="track-type-label">Select to Track</InputLabel>
            <Select
              fullWidth
              required
              labelId="track-type-label"
              id="trackType"
              name="trackType"
              value={values.trackType}
              label="Track Type"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value={"order"} selected>
                {"order"}
              </MenuItem>
              <MenuItem value={"refund"} selected>
                {"refund"}
              </MenuItem>
            </Select>
          </TrackFormInputWrapper>
          <TrackFormSubmitBtnWrapper>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "green", gap: "0.5rem" }}
            >
              <Search />
              Track
            </Button>
          </TrackFormSubmitBtnWrapper>
        </TrackFormContainer>

        <TrackResultWrapper>
          {trackOrder.status === "success" ? (
            <TrackResult result={trackOrder.data} />
          ) : (
            ""
          )}
        </TrackResultWrapper>
      </TrackContainer>
    </TrackWrapper>
  );
}
