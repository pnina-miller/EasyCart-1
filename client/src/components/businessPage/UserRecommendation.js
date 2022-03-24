import React, { useState, useEffect } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import * as moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

import message from "../../images/messageltr.png";
import { actions } from '../../redux/Action';
import {loadMoreReccomandationService} from "../../services/business";

import '../../styles/businessPage/userRecommendation.css'



SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


function UserRecommendation(props) {

    const { edit, recomedation, flagSourceRecomendations, create,businessId } = props
    const dispatch = useDispatch()
    let [checkLoadMore, setcheckLoadMore] = useState(true)
    let [userRecommendsArr, setUserRecommendsArr] = useState([])
    let allUserRecommends;


    // allUserRecommends = useSelector(state => state.business?.CheckedBusinessDetails?.userRecommendation);
    let allUserEditRecommends = useSelector(state => state.business?.editBusiness?.userRecommendation);
    let editBusinessId = useSelector(state => state.business?.editBusiness?._id);

    useEffect(() => {
        if (flagSourceRecomendations && businessId) {
            dispatch(actions.getBusinessRecommendations({ businessId: businessId, numResults: allUserRecommends ? allUserRecommends.length : 0 }))
        }
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        if (edit && allUserEditRecommends) {
            setUserRecommendsArr(allUserEditRecommends)
        }
        else {
            if (!edit && recomedation) {
                setUserRecommendsArr(recomedation)
            }
        }// eslint-disable-next-line
    }, [recomedation, allUserEditRecommends])

    const loadMore = async () => {
        if (businessId && !edit) {
            let result=await loadMoreReccomandationService( businessId, userRecommendsArr?.length || 0)
            result && setUserRecommendsArr(oldArr=>[...oldArr, ...result])

        }
        else {
            if (editBusinessId && edit) {
                let show = await dispatch(actions.getBusinessRecommendations({ businessId: editBusinessId, numResults: allUserEditRecommends?.length, mode: "Edit" }));
                let flag = await show.payload === [] ? false : true
                setcheckLoadMore(flag);
            }
        }
    }

    async function deleteRecommendationById(id) {

        let config = {
            method: 'delete',
            url: `/recommendation/deleteRecommendationByBusiness/${id}`,
            headers: {}
        };
        await axios(config)
            .then(async function (response) {
                await dispatch(actions.deleteBusinessRecommendation(id));
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    return (
        <>
            {
                flagSourceRecomendations === true && create !== true && <Container>
                    {
                        userRecommendsArr?.map((item, index) => {
                            return (
                                <>
                                    <Row key={`businessrecommends${index}`} className='m-3'>

                                        <Col xs={12} sm={2} lg={1}>
                                            <div className='d-md-flex align-items-center justify-content-center'>
                                                <button className='btn' id={item._id} style={{ display: edit === true ? "block" : "none" }} onClick={(e) => deleteRecommendationById(e.target.id)}>X</button>
                                                {item.UserId?.galery === undefined ?
                                                    <img className='img-fluid rounded-circle imgSizes' src='https://www.w3schools.com/howto/img_avatar2.png' alt={message} /> :
                                                    <img className='img-fluid rounded-circle imgSizes' src={item.UserId?.galery} alt={message} />}
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={10}>
                                            <div>
                                                <label className='h2 font-weight-bold fs-5 text-capitalize'>{item.UserId?.userName} {item.UserId?.lastName}
                                                    <small className='text-secondary font-weight-bold ml-4'>
                                                        {moment(item.createdAt).format('YYYY/MM/DD')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </small>
                                                </label>
                                            </div>
                                            <div>
                                                {item.Recommendation}
                                            </div>

                                        </Col>
                                    </Row>
                                    <hr></hr>
                                </>

                            )
                        }
                        )}
                    <p className={!checkLoadMore ? "disabled" : "d-flex w-100 ml-5 mb-5"} onClick={() => loadMore()}>&gt;&nbsp;<div className="textDecoration">show more</div></p>
                </Container>

            }
            {
                flagSourceRecomendations === false && create !== true &&
                <Container>

                    {
                        recomedation?.map((item, index) => {
                            return (
                                <>
                                    <Row key={`googlerecommends${index}`} className='m-3'>

                                        <Col xs={12} sm={2} lg={1}>
                                            <div className='d-md-flex align-items-center justify-content-center'>
                                                {item.profile_photo_url === undefined ?
                                                    <img className='img-fluid rounded-circle imgSizes' src='https://www.w3schools.com/howto/img_avatar2.png' alt={message} /> :
                                                    <img className='img-fluid rounded-circle imgSizes' src={item.profile_photo_url} alt={message} />}
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={10}>
                                            <div>
                                                <label className='h2 font-weight-bold fs-5'>{item.author_name}
                                                    <small className='text-secondary font-weight-bold ml-4'>
                                                        {item.relative_time_description}
                                                    </small>
                                                </label>
                                            </div>
                                            <div >{item.text}
                                                {item.rating !== undefined ?
                                                    " raiting : " + item.rating : ""}
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                </>
                            )
                        })
                    }
                </Container>
            }
        </>
    );
}
export default UserRecommendation



