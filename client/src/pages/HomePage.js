import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HemletComponent from "../components/utilities/hemlet";
import Logo from "../images/logo.png";
import Footer from "../components/Footer";
import SearchSection from "../components/homePage/HeaderSearch";
import SubCarousel from "../components/homePage/CarouselSection";
import actions from "../redux/Action";
import CarouselTabs from "../components/homePage/CarouselTabs";

import "../styles/homePage/homePage.css";
import { Container, Row } from "react-bootstrap";

export default function HomePage() {
  const seoTitle = "EasyCart";
  const seoDescription =
    "Main description content. this is going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords = ["Business", "EasyCart"];

  const dispatch = useDispatch();
  const AllPromotedBusiness = useSelector(
    (state) => state?.business?.AllPromotedBusiness || []
  );
  const mainCategories = useSelector((state) =>state.mainCategories.category);
  const [mainCategoriesStore, setMainCategoriesStore] = useState([]);
  const [mainCategoriesVacation, setMainCategoriesVacation] = useState([]);

  useEffect(() => {
    dispatch(actions.getPromotedBusinesses());
  }, [dispatch]);

  useEffect(() => {
    mainCategories?.forEach((category) => {
      if (category?.mainCategoryName === "store" && category.categories) {
        setMainCategoriesVacation(category.categories[0]?.business);
        setMainCategoriesStore(category.categories[1]?.business);
      }
    });
  }, [mainCategories]);

  return (
    <div>
      <HemletComponent
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        seoKeywords={seoKeywords}
        seoImage={seoImage}
      />

      <Container className="main-container">
        <Row className="back-color-search">
          <SearchSection/>
        </Row>
        <Row>
          <CarouselTabs  mainCategories={mainCategories}/>
        </Row>
        <Row>
          <SubCarousel arrBusiness={AllPromotedBusiness} btnOrderShow={true} />
        </Row>
        <Row>
          <SubCarousel
            arrBusiness={mainCategoriesVacation}
            btnOrderShow={false}
          />
        </Row>
        <Row>
          <SubCarousel arrBusiness={mainCategoriesStore} btnOrderShow={false} />
        </Row>
        {/*  <div ref={scrollUp}></div>
        <SearchSection />
       <section className="categories-section">
          <div className='mt-3'>
            <CategoriesSection /> 
          </div>
          {/* <h2 className="main-title mt-5 mb-5">{t("categories.categories")}</h2> 
        </section>
        <section>
          <div className="d-flex justify-content-center mt-5">
            <h4 className="mt-4  font-weight-bold">{t("top-businesses")}</h4>
          </div>
          <div
            style={{ position: "fixed", bottom: "0", right: "0", zIndex: "4" }}
          >
            <button
              className={`arrow-up-container ${show === true ? "d-block" : "d-none"
                }`}
              onClick={executeScroll}
            >
              <Icon name="arrowUp" />
            </button>
          </div>
           <TopBusinessesSection /> 
        </section>
        {/* <section>
          <div className='d-flex justify-content-center mt-5'>
            <h4 className='mt-4 main-title font-weight-bold'>{t("pricing.title")}</h4>
           </div>
          <Pricing /> 
        </section>*/}
        {/* <Accessibility /> */}
        <Footer />
      </Container>
    </div>
  );
}
