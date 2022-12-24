import React from 'react';
import ProductList from 'Pages/Home/Components/ProductList';
import { HomeWrapper, HomeContainer, BannerWrapper } from 'Pages/Home/styles/homeStyle';
import Carousel from 'Components/Carousel';
import { imgList } from 'Datas';
import CustomModal from 'components/Modals';

export default function Home() {
  return (
    <>
      <HomeWrapper>
        <HomeContainer>
          <BannerWrapper>
            <Carousel imgList={imgList} interval={3000} />
          </BannerWrapper>
          <CustomModal />
          <ProductList />
        </HomeContainer>
      </HomeWrapper>
    </>
  );
}
