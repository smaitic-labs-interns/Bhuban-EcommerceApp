import React from 'react';
import { Dashboard } from '@mui/icons-material';
import { Typography } from '@mui/material';
import {
  CardWrapper,
  CardContainer,
  LeftContent,
  RightIcon,
  MoreInfo,
} from 'pages/Admin/styles/cards/cardStyle';
import PropTypes from 'prop-types';

export default function Card({ data = {} }) {
  const bgStyle = {
    background: `${data.bgColor} !important`,
  };
  return (
    <CardWrapper sx={data.bgColor ? bgStyle : ''}>
      <CardContainer>
        <LeftContent>
          <Typography>{data.count}</Typography>
          <Typography>{data.title}</Typography>
        </LeftContent>
        <RightIcon>{data.icon ? data.icon : <Dashboard />}</RightIcon>
      </CardContainer>
      <MoreInfo>
        <Typography>{data.desc}</Typography>
      </MoreInfo>
    </CardWrapper>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
};
