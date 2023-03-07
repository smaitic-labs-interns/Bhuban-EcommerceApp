import React, { useState, useEffect } from 'react';
import {
  BannerWrapper,
  BannerContainer,
  ImageWrapper,
  CircleWrapper,
  CircleContainer,
} from './carouselStyle';

import { Circle } from '@mui/icons-material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

export default function Carousel({ imgList, interval }) {
  const [target, setTarget] = useState(1);
  const handleClick = (index) => {
    setTarget(index);
  };

  useEffect(() => {
    const var2 = setInterval(() => {
      setTarget((target) => (target <= imgList.length - 1 ? target + 1 : 1));
    }, interval);
    return () => clearInterval(var2);
  }, [imgList, interval]);

  return (
    <BannerWrapper>
      <BannerContainer>
        {imgList &&
          imgList.map((image) => {
            return (
              <ImageWrapper
                key={image.id}
                onClick={() => handleClick(image.id)}
                sx={image.id === target ? { display: 'flex' } : { display: 'none' }}
              >
                <img
                  width={'100%'}
                  height={'400px'}
                  src={`${process.env.REACT_APP_BACKEND_ENDPOINT}${image.url}`}
                  alt='Banners'
                />
              </ImageWrapper>
            );
          })}
        <CircleWrapper>
          <CircleContainer>
            {imgList &&
              imgList.map((image) => {
                return (
                  <Box
                    key={image.id + imgList.length}
                    onClick={() => {
                      handleClick(image.id);
                    }}
                  >
                    <Circle sx={image.id === target ? { color: '#fff' } : { color: 'grey' }} />
                  </Box>
                );
              })}
          </CircleContainer>
        </CircleWrapper>
      </BannerContainer>
    </BannerWrapper>
  );
}

Carousel.propTypes = {
  imgList: PropTypes.array.isRequired,
  interval: PropTypes.number,
};
