import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Skeleton from "react-loading-skeleton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

import ff from '../../images/img7.jpg'
import Icon from "../utilities/Icon"
import FavoritesIcon from "../utilities/FavoritesIcon"
import Share from '../Share'
import '../../styles/homePage/carouselSection.css'

function CarouselSection(props) {

    const { arrBusiness, btnOrderShow } = props

    const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
        return (
            <div className="carousel-button-group position-absolute w-100 d-flex justify-content-end custonBtnCarousel" >
                <div className="cursor-arrow mr-2" onClick={() => previous()}>
                    <Icon name="prevArrow" />
                </div>
                <div className="cursor-arrow" onClick={() => next()}>
                    <Icon name="nextArrow" />
                </div>
            </div>
        );
    };

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1500 },
            items: 6,
        },
        desktopB: {
            breakpoint: { max: 1500, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 500 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 500, min: 0 },
            items: 1
        }
    };

    return (
        <>
            <Container fluid className="padding-sides-carousel">
                <Row>
                    <Col>
                        <div className="h2 w-100 d-flex mb-5  pl-3 pl-md-0 text-category-title"><b>What</b>&nbsp;your <div className="text-secondary">&nbsp;favorite menu?</div></div>
                    </Col>
                </Row>
                <Row>
                    <Container fluid>
                        <Row>
                            <Col className="displayOrder">
                                {
                                    arrBusiness?.length > 0 ?
                                        <Carousel arrows={false} responsive={responsive} renderButtonGroupOutside={true} customButtonGroup={<ButtonGroup />}>
                                            {
                                                arrBusiness.map((item, index) => (
                                                    <Col key={`cardCrousel${index}`}
                                                        className="m-auto pl-md-2 pr-md-2 p-5 col-lg">
                                                        <Card className="card-pointer m-auto grow-width ">
                                                            <Link className="cancelLinkStyle" onClick={() => window.open(`/${item.keyWords}`, "_blank")}>
                                                                <div className="pickgradient">
                                                                    <Card.Img className="top-border img-card img-carousel-card" variant="top" src={ item.galery[0] || ff} />
                                                                </div>
                                                            </Link>
                                                            <div className="w-100 d-flex">
                                                                <div className=" svgWrapperCarousel wrapperFavorite">
                                                                    <FavoritesIcon
                                                                        business={item}
                                                                    />
                                                                </div>
                                                                <div className="wrapperShare svgWrapperCarousel">
                                                                    <Share
                                                                        {...props}
                                                                        url={window.location.href}
                                                                        title={"My esayCart:)"}
                                                                    ><Icon name='shareLink' />
                                                                    </Share>
                                                                </div>
                                                                <div className="wrapperOrderDish">
                                                                    <button className={btnOrderShow ? "btn-order-dish mb-2" : "d-none"}>Order Dish</button>
                                                                </div>
                                                            </div>
                                                            <Link className="cancelLinkStyle" onClick={() => window.open(`/${item.keyWords}`, "_blank")}>
                                                                <Card.Body className="p-0">
                                                                    <Card.Text className="cancelLinkStyle">
                                                                        <div className="font-bold">{item.businessName}</div>
                                                                        <div style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{item?.description}</div>
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Link>
                                                        </Card>
                                                    </Col>
                                                ))}
                                        </Carousel> :
                                        <Carousel arrows={false} responsive={responsive} renderButtonGroupOutside={true} customButtonGroup={<ButtonGroup />}>
                                            {
                                                Array.from({ length: 6 }, (item, index) =>
                                                    <Col className="p-0">
                                                        <Card className="ml-2 mr-2 loadCardCarousel">
                                                            <Card.Body className="skelatonCarousel">
                                                                <Skeleton
                                                                    className="w-100 h-100 p-0"
                                                                />
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>)
                                            }
                                        </Carousel>
                                }
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        </>
    )
}

export default CarouselSection;
