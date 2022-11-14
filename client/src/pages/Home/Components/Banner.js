import React, { useState } from "react";
import {
  BannerWrapper,
  BannerContainer,
  ImageWrapper,
  CircleWrapper,
  CircleContainer,
} from "../Styles/bannerStyle";
import { Circle } from "@mui/icons-material";
import { Box } from "@mui/system";

export default function Banner() {
  const [target, setTarget] = useState(1);
  const imgList = [
    { id: 1, url: "img0.png" },
    { id: 2, url: "img1.jpg" },
    { id: 3, url: "img2.jpg" },
    { id: 4, url: "img3.jpg" },
    { id: 5, url: "img4.jpg" },
    { id: 6, url: "img5.jpg" },
    { id: 7, url: "img6.jpg" },
    { id: 8, url: "img7.jpg" },
    { id: 9, url: "img8.jpg" },
    { id: 10, url: "img9.jpg" },
    { id: 11, url: "img10.jpg" },
    { id: 12, url: "img11.jpg" },
    { id: 13, url: "img12.jpg" },
  ];
  //   let imageIndex = 0;
  //   var circleIndex = 0;

  const handleClick = (index) => {
    setTarget(index);
  };

  setInterval(function () {
    if (target <= imgList.length) {
      setTarget(target + 1);
    } else {
      setTarget(0);
    }
  }, 20000);
  return (
    <BannerWrapper>
      <BannerContainer>
        {imgList
          ? imgList.map((image) => {
              return (
                <>
                  <ImageWrapper
                    key={image.id}
                    onClick={() => handleClick(image.id)}
                    sx={
                      image.id === target
                        ? { display: "flex" }
                        : { display: "none" }
                    }>
                    <img
                      width={"100%"}
                      height={"400px"}
                      src={`${process.env.REACT_APP_BACKEND_ENDPOINT}/images/banner/${image.url}`}
                      alt="Banner Image"
                    />
                  </ImageWrapper>
                </>
              );
            })
          : ""}
        <CircleWrapper>
          <CircleContainer>
            {imgList
              ? imgList.map((image) => {
                  return (
                    <Box
                      key={image.id}
                      onClick={() => {
                        handleClick(image.id);
                      }}>
                      <Circle
                        sx={
                          image.id === target
                            ? { color: "#fff" }
                            : { color: "grey" }
                        }
                      />
                    </Box>
                  );
                })
              : ""}
          </CircleContainer>
        </CircleWrapper>
      </BannerContainer>
    </BannerWrapper>
  );
}
