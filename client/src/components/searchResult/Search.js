
import { withRouter, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import NotFoundanimationData from "../../styles/animations/notFoundAnimation";
import ListPlacesCard from './listPlacesCard';
import FirstPlacesCard from './FirstPlacesCard';
import { actions } from '../../redux/Action';
import UserLocation from "../UserLocation";
import Icon from "../utilities/Icon";

import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/searchResult/listCategory.css";

function Search(){

    // const defaultAnimationOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: NotFoundanimationData,
    // };
    const { keyword } = useParams();
    const dispatch = useDispatch();
    const currentUserLocation = useSelector(state => state.location.currentUserLocation);
    const nearPlacesBySearch = useSelector(state => state.places.nearPlacesBySearch);
    const flagWhatToShow = useSelector(state => state.business.flagWhatToShow);

    useEffect(() => {
        let text = keyword
        if (currentUserLocation.lat !== "") {
            dispatch(actions.getPlacesBySearch({ text, currentUserLocation }))
        }
        // eslint-disable-next-line
    }, [currentUserLocation])

    return (
        <>
            { currentUserLocation.latitude === "" ? <UserLocation /> : ""}
            <div className='container-fluid marginSide'>
                <div className='row d-flex justify-content-end align-items-center'>
                    <div type='button' onClick={() => { dispatch(actions.setWhatToShow(1)) }} className='mt-3 ml-3 mb-xs-3 d-inline'><Icon name='menu'></Icon></div>
                    <div type='button' onClick={() => { dispatch(actions.setWhatToShow(0)) }} className='mt-3 mr-4 ml-3 mb-xs-3 d-inline'><Icon name='list'></Icon></div>
                </div>
            </div>

            <div className="container cardsPositionFixed scroll" >
                <div className="row mt-4 d-flex justify-content-center">

                    {nearPlacesBySearch !== undefined && nearPlacesBySearch.length > 0 ? nearPlacesBySearch.map((option, i) => (
                        flagWhatToShow ? <FirstPlacesCard key={i} item={option} /> :
                            <ListPlacesCard key={i} item={option} />
                    ))
                        : ""
                    }
                </div>
            </div>
        </>
    )
}

export default (withRouter(Search));