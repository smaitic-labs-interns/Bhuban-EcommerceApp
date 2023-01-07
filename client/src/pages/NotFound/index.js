import React from 'react';
import notFoundImg from 'public/images/404.jpg';
import { NotFoundWrapper, NotFoundContainer, NotFoundHelper } from './notFoundStyle';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <NotFoundWrapper>
        <NotFoundContainer>
          <NotFoundHelper>
            Invalid Route {document.URL} {'\n'}
            <Link to={'/'}>Visit Home</Link>
          </NotFoundHelper>
          <img src={notFoundImg} alt='Not Found' />
        </NotFoundContainer>
      </NotFoundWrapper>
    </>
  );
}
