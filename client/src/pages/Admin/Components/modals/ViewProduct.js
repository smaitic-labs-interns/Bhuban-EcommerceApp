import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Modal,
  TextField,
  Typography,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  Edit,
  RemoveOutlined,
  Add,
  Update,
  Cancel,
  Close,
  RemoveRedEye,
} from "@mui/icons-material";
import {
  ViewProductWrapper,
  CloseButtonWrapper,
  ImageWrapper,
  ImageContainer,
  ImageControlsWrapper,
  ImageControlsLeftArrowWrapper,
  ImageControlsImageWrapper,
  ImageControlsRightArrowWrapper,
  ProductContentWrapper,
  CustomTableRow,
  CustomTableCell,
} from "../../styles/modals/viewProductStyle";

export default function ViewProduct({ product }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);s

  const {
    id,
    category,
    model,
    name,
    brand,
    description,
    price,
    quantity,
    rating,
    images,
  } = product;

  // for displaying Images
  const [target, setTarget] = useState(1);
  let index = 0;
  const handleNext = () => {
    if (target < index) {
      setTarget(target + 1);
    }
  };

  const handlePrevious = () => {
    if (target > 1) {
      setTarget(target - 1);
    }
  };

  const imageStyle = {
    display: "flex",
    justifyContent: "center",
    "& > img": {
      width: "100%",
      height: "100%",
      ObjectFit: "contain",
    },
  };

  return (
    <div>
      <Button variant="outlined" color="success" onClick={handleOpen}>
        <RemoveRedEye />
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ViewProductWrapper>
          <CloseButtonWrapper>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </Button>
          </CloseButtonWrapper>
          <ImageWrapper>
            <ImageContainer>
              {images
                ? images.map((item) => {
                    index++;
                    return (
                      <Box
                        key={item.id}
                        sx={target === index ? imageStyle : { display: "none" }}
                      >
                        <img
                          src={`${process.env.REACT_APP_BACKEND_ENDPOINT}${item.imageurl}`}
                          alt={item.alttext}
                        />
                      </Box>
                    );
                  })
                : ""}
            </ImageContainer>
            <ImageControlsWrapper>
              <ImageControlsLeftArrowWrapper>
                <Button variant="contained" onClick={handlePrevious}>
                  {" << "}
                </Button>
              </ImageControlsLeftArrowWrapper>
              <ImageControlsImageWrapper>
                <Typography>{`${target} of ${index}`}</Typography>
              </ImageControlsImageWrapper>
              <ImageControlsRightArrowWrapper>
                <Button variant="contained" onClick={handleNext}>
                  {" >> "}
                </Button>
              </ImageControlsRightArrowWrapper>
            </ImageControlsWrapper>
          </ImageWrapper>
          <ProductContentWrapper>
            <Table>
              <CustomTableRow>
                <CustomTableCell>Id: </CustomTableCell>
                <TableCell>{id}</TableCell>
              </CustomTableRow>
              <CustomTableRow>
                <CustomTableCell>Category: </CustomTableCell>
                <TableCell>{category}</TableCell>
              </CustomTableRow>
              <CustomTableRow>
                <CustomTableCell>Model: </CustomTableCell>
                <TableCell>{model}</TableCell>
              </CustomTableRow>
              <CustomTableRow>
                <CustomTableCell>Name: </CustomTableCell>
                <TableCell>{name}</TableCell>
              </CustomTableRow>
              <CustomTableRow>
                <CustomTableCell>Brand: </CustomTableCell>
                <TableCell>{brand}</TableCell>
              </CustomTableRow>
              <CustomTableRow>
                <CustomTableCell>Price: </CustomTableCell>
                <TableCell>{price}</TableCell>
              </CustomTableRow>
              <CustomTableRow>
                <CustomTableCell>Quantity: </CustomTableCell>
                <TableCell>{quantity}</TableCell>
              </CustomTableRow>
              <CustomTableRow>
                <CustomTableCell>Rating: </CustomTableCell>
                <TableCell>{rating}</TableCell>
              </CustomTableRow>
              <CustomTableRow>
                <CustomTableCell>Description: </CustomTableCell>
                <TableCell>{description}</TableCell>
              </CustomTableRow>
            </Table>
          </ProductContentWrapper>
          <CloseButtonWrapper>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </Button>
          </CloseButtonWrapper>
        </ViewProductWrapper>
      </Modal>
    </div>
  );
}
