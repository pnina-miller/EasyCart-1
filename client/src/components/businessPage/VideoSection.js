import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { Modal, Button } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

import '../../styles/businessPage/gallery.css'

function BusinessVideo(props) {
    const checkedbusinessdetails = useSelector(state => state.business.CheckedBusinessDetails)
    const [flagUserImg, setFlagUserImg] = useState(false);
    const [flagAllImg, setFlagAllImg] = useState(true);
    const [flagMyImg, setFlagMyImg] = useState(false);
    const [cntMyVideo, setCntMyVideo] = useState(0);
    const [cntUserVideo, setCntUserVideo] = useState(0);

    useEffect(() => {
        if (checkedbusinessdetails.linkToVideo != undefined && checkedbusinessdetails.linkToVideo.length > 0)
            setCntMyVideo(checkedbusinessdetails.linkToVideo.length)
        if (checkedbusinessdetails.usersVideolink != undefined && checkedbusinessdetails.usersVideolink.length > 0)
            setCntUserVideo(checkedbusinessdetails.usersVideolink.length)
    }, [checkedbusinessdetails]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <h4>video</h4>
                <div>
                    <br />
                    <div>
                        <nav id="navigation" className="style-1">
                            <ul id="responsive">
                                <li className="m-2" onClick={() => { { setFlagAllImg(true) } { setFlagMyImg(false) } { setFlagUserImg(false) } }}><a >({cntUserVideo + cntMyVideo})All video</a>
                                </li>
                                <li className="m-2" onClick={() => { { setFlagUserImg(true) } { setFlagMyImg(false) } { setFlagAllImg(false) } }}><a>({cntUserVideo})Customers easyCart</a>
                                </li>
                                <li className="m-2" onClick={() => { { setFlagMyImg(true) } { setFlagUserImg(false) } { setFlagAllImg(false) } }}><a>({cntMyVideo}) Business owner photos</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="clearfix" />
                    </div>
                    <br /> <br /> <br />
                    <div className='container '>
                        <div className='row '>

                            {checkedbusinessdetails.linkToVideo != undefined && checkedbusinessdetails.linkToVideo.length > 0 && flagMyImg ?
                                checkedbusinessdetails.linkToVideo.map((video, i) => (
                                    <div key={i} className="col-md-12 col-lg-12 m-2">
                                        <div className="listing-item-container positionVideo justify-content-center align-items-end d-flex">
                                            <ReactPlayer url={video} />
                                        </div>
                                    </div>
                                ))
                                : ""
                            }
                            {checkedbusinessdetails.usersVideolink != undefined && checkedbusinessdetails.usersVideolink.length > 0 && flagUserImg ?
                                checkedbusinessdetails.usersVideolink.map((video, i) => (
                                    <div key={i} className="col-md-12 col-lg-12 m-2">
                                        <div className="listing-item-container positionVideo justify-content-center align-items-end d-flex">
                                            <ReactPlayer url={video} />
                                        </div>
                                    </div>
                                ))
                                : ""
                            }
                            {checkedbusinessdetails.usersVideolink != undefined && checkedbusinessdetails.usersVideolink.length > 0 && flagAllImg ?
                                checkedbusinessdetails.usersVideolink.map((video, i) => (
                                    <div key={i} className="col-md-12 col-lg-12 m-2">
                                        <div className="listing-item-container positionVideo justify-content-center align-items-end d-flex">
                                            <ReactPlayer url={video} className="player" />
                                        </div>
                                    </div>
                                ))
                                : ""
                            }
                            {checkedbusinessdetails.linkToVideo != undefined && checkedbusinessdetails.linkToVideo.length > 0 && flagAllImg ?
                                checkedbusinessdetails.linkToVideo.map((video, i) => (
                                    <div key={i} className="col-md-12 col-lg-12 m-2">
                                        <div className="listing-item-container positionVideo justify-content-center align-items-end d-flex">
                                            <ReactPlayer url={video} />
                                        </div>
                                    </div>
                                ))
                                : ""
                            }
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="clsBtn" onClick={props.onHide} >Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default (withRouter(BusinessVideo));