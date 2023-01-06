import React from 'react';
import { RightContentWrapper } from 'Pages/Admin/styles/rightContentStyle';
import PropTypes from 'prop-types';

export default function RightContent({ children, ...res }) {
  return (
    <>
      <RightContentWrapper {...res}>{children}</RightContentWrapper>
    </>
  );
}

RightContent.propTypes = {
  children: PropTypes.any.isRequired,
};
