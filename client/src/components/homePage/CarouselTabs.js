import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { actions } from "../../redux/Action";
import { useDispatch } from "react-redux";
import Icon from "../utilities/Icon";

import img7 from "../../images/Cake.png";
import img6 from "../../images/gril.png";
import garden from "../../images/garden.png";
import kitchen from "../../images/kitchen.png";
import room from "../../images/style.png";
import pool from "../../images/pool.png";
import home from "../../images/home.png";
import "../../styles/carouselTabs.scss";
import { CSSTransition } from "react-transition-group";

function Carousel({ items }) {
  const [direction, setDirection] = useState();
  const [active, setActive] = useState(0);
  const [intervalId, setIntervalId] = useState();
  const [itemsView, setItemsView] = useState(<>loading</>);
  const generateItems = () => {
    var jsxItems = [];
    var level;
    //   for (var i = this.state.active - 2; i < this.state.active + 3; i++)
    for (var i = active - 4; i < active + 5; i++) {
      var index = i;
      if (i < 0) {
        index = items.length + i;
      } else if (i >= items.length) {
        index = i % items.length;
      }
      level = active - i;
      // alert('level'+level)
      items[index] &&
        jsxItems.push(
          <Item index={index} key={index} id={items[index]} level={level} />
        );
    }
    return <>{jsxItems}</>;
  };

  const moveLeft = () => {
    setActive((oldActive) =>
      oldActive - 1 < 0 ? items.length - 1 : oldActive - 1
    );
    setDirection("left");
  };

  const moveRight = () => {
    setActive(oldActive=>(oldActive + 1) % items.length);
    setDirection("right");
  };
  useEffect(() => {
    setItemsView(generateItems());
    // eslint-disable-next-line
  }, [active]);

  useEffect(() => {
    if (items.length > 0 && !intervalId)
      setIntervalId(setInterval(moveLeft, 3000));
    setItemsView(generateItems());
    // eslint-disable-next-line
  }, [items]);

  return (
    <>
      <div id="carousel" className="mt-5 noselect">
        <div className="carousel-button-group position-absolute w-100 d-flex justify-content-end custonBtnCarousel">
          <div className="cursor-arrow mr-2" onClick={moveRight}>
            <Icon name="prevArrow" />
          </div>
          <div className="cursor-arrow" onClick={moveLeft}>
            <Icon name="nextArrow" />
          </div>
        </div>
        <CSSTransition transitionName={direction}>{itemsView}</CSSTransition>
      </div>
    </>
  );
}

function Item(props) {
  const { level, id, index } = props;
  const dispatch = useDispatch();

  const categories = id.categories;
  const items = [
    pool,
    room,
    kitchen,
    img7,
    home,
    img6,
    pool,
    room,
    kitchen,
    home,
    img7,
    img6,
    home,
    img7,
    img6,
    home,
    img7,
    img6,
    pool,
    room,
    kitchen,
    home,
    img7,
    img6,
    garden,
    pool,
    room,
    kitchen,
    home,
    img7,
    img6,
    garden,
    home,
    img7,
    img6,
    garden,
    home,
    pool,
    room,
    kitchen,
    img7,
    img6,
    home,
    img7,
    img6,
    home,
    img7,
    img6,
    home,
  ];
  const className = "item level" + level;
  return (
    <>
      <div
        className={className}
        style={{ backgroundImage: `url(${items[index]})` }}
      >
        <div className="business-item">
          <div className="div-mainCategoryName">
            <Link
              onClick={() => {
                dispatch(
                  actions.setSelectedText({
                    value: id.mainCategoryName,
                    db: "mainCategory",
                    icon: id.icons,
                    id: id._id,
                  })
                );
              }}
              to={{
                pathname: `/${id.mainCategoryName}`,
                state: { db: "mainCategory", id: id._id },
              }}
              className='category-name-link cancelLinkStyle'
            >
              {id.mainCategoryName}
            </Link>
          </div>
          <div className="business-names-container">
            {categories?.map((catagory) =>
              catagory.business?.map((arrBusiness, i) => (
                <p
                  onClick={() =>
                    window.open(`/${arrBusiness.keyWords}`, "_blank")
                  }
                  key={i}
                  className="p-of-business"
                >
                  {arrBusiness?.businessName}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const MainCarousel=({ mainCategories }) => (
  <Carousel items={mainCategories || []} active={0} />
);
export default MainCarousel;