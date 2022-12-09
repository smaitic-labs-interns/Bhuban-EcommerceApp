import React from "react";
import ProductList from "./Components/ProductList";
import { HomeWrapper, HomeContainer, BannerWrapper } from "./Styles/homeStyle";
import Carousel from "../../components/Carousel";
import { imgList } from "../../datas";

export default function Home() {
  return (
    <>
      <HomeWrapper>
        <HomeContainer>
          <BannerWrapper>
            <Carousel imgList={imgList} interval={3000} />
          </BannerWrapper>
          <ProductList></ProductList>
        </HomeContainer>
      </HomeWrapper>
    </>
  );
}
