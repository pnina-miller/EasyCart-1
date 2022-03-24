import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { actions } from "../../redux/Action";
import Icon from "../utilities/Icon";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import "../../styles/homePage/categoriesSection.css";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

 function CategoriesSection() {

  const dispatch = useDispatch();
  const categories = useSelector(
    (state) =>
      state.mainCategories.category !== undefined &&
      state.mainCategories.category
  );
  useEffect(() => {
    dispatch(actions.getMainCategories());
    // eslint-disable-next-line
  }, []);

  return (

    <Container className="mb-topb container-category">
      <Row className="d-flex justify-content-center">
        <Swiper
          navigation
          onSwiper={() => { }}
          onSlideChange={() => { }}
          loop
          breakpoints={{
            500: {
              slidesPerView: 2,
            },
            760: {
              slidesPerView: 4,
            },
            1000: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
            1500: {
              slidesPerView: 6,
            },
            2000: {
              slidesPerView: 7,
            },
          }}
        >
          {categories !== undefined && categories.length > 0
            ? categories.map((category, i) =>
              category.mainCategoryName !== undefined ? (
                <SwiperSlide key={i}>
                  <Col className="svgIconsColor">
                    <Link
                      onClick={() =>
                        dispatch(actions.setSelectedText({ value: category.mainCategoryName, db: "mainCategory", icon: category.icons,id:category._id  }))}
                      to={{ pathname: `/${category.mainCategoryName}`, state: { db: "mainCategory",id: category._id } }}>
                      {category.icons !== undefined &&
                        <Icon name={category.icons} />}
                      <h6 className="text-capitalize">
                        {category.mainCategoryName}
                      </h6>
                    </Link>
                  </Col>
                </SwiperSlide>
              ) : (
                ""
              )
            )
            : ""}
        </Swiper>
      </Row>
    </Container >
  );
}
export default CategoriesSection