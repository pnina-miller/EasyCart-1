import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container } from "react-bootstrap";
import "../styles/homePage/searchSection.css";

import { actions } from "../redux/Action";
import Icon from '../components/utilities/Icon'
function SearchBusinessesByCategory() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.mainCategories.category !== undefined && state.mainCategories.category);
    const subCategories = useSelector((state) => state.category.subCategories);
    // const placesByLocation = useSelector(state => state.places.placesByLocation);

    useEffect(() => {
        dispatch(actions.getMainCategories());
        dispatch(actions.getAllCategories());
    }, [dispatch])



    return (

        <Container className="mt-5">
            <br></br><br></br><br></br>
            <Row> <h3 className="text-decoration-underline"><u>Main Categories:</u></h3></Row>
            <Row >

                {categories !== undefined && categories.length > 0
                    ? categories.map((category, i) =>
                        category.mainCategoryName !== undefined ? (
                            <Col className="svgIconsColor">
                                <Link
                                    onClick={() =>
                                        dispatch(actions.setSelectedText({ value: category.mainCategoryName, db: "mainCategory", icon: category.icons }))}
                                    to={`/${category.mainCategoryName}`}>
                                    <p></p>
                                    {category.icons !== undefined &&
                                        <Icon name={category.icons} />}
                                    <h6 className="text-capitalize">
                                        {category.mainCategoryName}
                                    </h6>

                                </Link>
                                {/* {category.categories &&
                                    <>
                                        {category.categories.map(c => (
                                            <Link to={`/${c.categoryName}`}>
                                                
                                                <div className="dbOptions"><Icon name="category"></Icon>{c.categoryName}</div>
                                            </Link>
                                        ))}
                                    </>
                                } */}


                            </Col>
                        ) : (
                            ""
                        )
                    )
                    : ""}
            </Row>
            <br></br><br></br>
            <Row><h3 className="text-decoration-underline"><u>Sub Categories:</u></h3></Row>
            <br></br>
            <Row>
                {subCategories &&
                    subCategories.map((category, i) =>
                        category.categoryName !== undefined && (
                            <Col className="svgIconsColor">
                                <Link
                                    className="text-lowercase"
                                    onClick={() =>
                                    dispatch(actions.setSelectedText({ value: category.categoryName, db: "cetegoty", icon: "category" }))}
                                    to={`/${category.categoryName}`}>
                                <p></p>
                                <Icon name="category" />
                                <h6 className="text-capitalize">
                                    {category.categoryName}
                                </h6>

                                </Link>
                            </Col>
                        )
                    )}
            </Row>
        </Container >
    )
}
export default SearchBusinessesByCategory