import { withRouter, Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import StarRatings from 'react-star-ratings';
import { useDispatch } from 'react-redux';
import { Card } from "react-bootstrap";
import React from 'react';

import { actions } from '../../redux/Action';
import image from "../../images/image2.png";

function SecondPlacesCard(props) {

    const { item } = props
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
            <Card className="second-Product mt-1 mb-1 ml-2"  >
                <Link
                    onClick={() => {
                        dispatch(actions.setSelectedBusinessPlacesDetails(item))
                        window.open(`/place/${item.place_id}`, "_blank")
                    }}
                    className="ProductCard-searchA"
                >
                    {item.photos ?
                        <Card.Img
                            className="img-Second-Product"
                            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${item.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxwidth=480&maxheight=480`}
                        /> :
                        <Card.Img
                            className="img-Second-Product"
                            src={image}
                        />}
                    <Card.Body>
                        <p className="font-weight-bold title-wrapper-second_product  fontsTitle mb-2">{item.name}</p>
                        <div className="text-wrapper-second_product d-flex flex-column mb-3 justify-content-between">
                            <p className="fontsAddressCategoiesSecond">
                                <b> {t(`cards.address`)}</b>:  {item.vicinity}
                            </p>
                            <p className="fontsAddressCategoiesSecond">
                                <b>{t(`cards.categories`)}</b>: {item.types[0]}, {item.types[1]}
                            </p>

                            <label className='text-center mt-auto mb-auto mr-auto ml-2 text-center mt-2'> {item.rating !== undefined ?
                                <>  <StarRatings
                                    rating={item.rating}
                                    starDimension="3vh"
                                    starSpacing="0.2px"
                                    starRatedColor={`var(--first-color)`}
                                    numberOfStars={5}
                                />
                                    ( {item.user_ratings_total} )
                                </>
                                : ""
                            }
                            </label>
                        </div>
                    </Card.Body>
                </Link>
            </Card>
        </>
    )
}
export default (withRouter(SecondPlacesCard))
