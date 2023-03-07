import React from 'react';
import { Link } from '@mui/material';
import {
  FooterWrapper,
  FooterContainer,
  FooterContent,
  CopyRightTitle,
} from 'Layout/styles/footerStyle';

export default function Footer() {
  return (
    <>
      <FooterWrapper>
        <FooterContainer>
          <FooterContent>
            <CopyRightTitle>All Right Reserved &copy;</CopyRightTitle>
            <CopyRightTitle>
              {' Developed By '}
              <Link underline='none' color={'white'}>
                {' Bhuban '}
              </Link>
            </CopyRightTitle>
          </FooterContent>
        </FooterContainer>
      </FooterWrapper>
    </>
  );
}
