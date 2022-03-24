import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Skeleton from "react-loading-skeleton";

import Icon from '../utilities/Icon'

import "../../styles/businessPage/PhotosSection.css"
//check remove arrImages
function BusinessPhotos (props){
  const{setModalShow, businessImages}=props
 
    const [arrImages, setArrImages] = useState([])
    const [classChangeCol, setclassChangeCol] = useState('')
    let template = arrImages.length - 1
    let [paddingTopDiv, setpaddingTopDiv] = useState('')

    useEffect(() => {
        if (businessImages?.length > 0)
            setArrImages(businessImages)
        if (businessImages?.length === 1) {
            setclassChangeCol("col-lg-12")
            setpaddingTopDiv('')
        }
        else {
            setclassChangeCol('col-lg-6')
            setpaddingTopDiv('pt-2')
        }
        if (businessImages?.length === 2)
            setpaddingTopDiv('')

    }, [businessImages])



    return (
        <>
            {arrImages[0]!==undefined ?
                <>
                    <Container className={arrImages.length ? "justify-content-center minMaxHeight h-75 rowHeight" : "d-none"} >
                        <Row className="borderRadiuceRow  rowWidth changeHeight">
                            <Col xs={12} className={`p-0 pr-0 rowHeight ${classChangeCol}`} >
                                <div className="w-100 h-100  d-flex align-items-end imgStyleCover "
                                    style={arrImages[0] && { backgroundImage: `url(${arrImages[0]?.photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${arrImages[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxwidth=480&maxheight=480` : arrImages[0]})` }} >
                                </div>
                            </Col>
                            <Col xs={12} lg={6} className={template >= 1 ? 'p-0 pl-lg-2 rowHeight' : "d-none"} >
                                <Container fluid className='h-100 rowHeight' >
                                    <Row className={template >= 2 ? `h-50 mt-2  mt-lg-0 halfHeight` : "d-none"} >
                                        <Col className={template >= 4 ? 'p-0 pr-2 pr-0 ' : 'd-none'} >
                                            <div className="w-100 h-100  d-flex align-items-end imgStyleCover"
                                                style={arrImages[0] && { backgroundImage: `url(${arrImages[4]?.photo_reference !== undefined ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${arrImages[4]?.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxwidth=480&maxheight=480` : arrImages[4]})` }}
                                            >
                                            </div>
                                        </Col>
                                        <Col className={template >= 2 ? 'p-0' : 'd-none'} >
                                            <div className="w-100 h-100  d-flex align-items-end imgStyleCover"
                                                style={arrImages[0] && { backgroundImage: `url(${arrImages[2]?.photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${arrImages[2]?.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxwidth=480&maxheight=480` : arrImages[2]})` }} >
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={{ height: template === 1 ? "450px" : "225px" }}>
                                        <Col className={template >= 3 ? 'p-0 pr-2 pr-0 pt-2 col-xs-12 ' : 'd-none'}>
                                            <div className="w-100 h-100  d-flex align-items-end imgStyleCover"
                                                style={arrImages[0] && { backgroundImage: `url(${arrImages[3]?.photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${arrImages[3]?.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxwidth=480&maxheight=480` : arrImages[3]})` }}
                                            >
                                            </div>
                                        </Col>
                                        <Col className={template >= 1 ? `p-0 ${paddingTopDiv}` : 'd-none'} >
                                            <div className="w-100 h-100  d-flex align-items-end imgStyleCover"
                                                // style={{ backgroundImage: `url(${arrImages[1]})` }}
                                                style={arrImages[0] && { backgroundImage: `url(${arrImages[0]?.photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${arrImages[1]?.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxwidth=480&maxheight=480` : arrImages[1]})` }} >
                                                <div
                                                    className="wrapperSvg"
                                                    onClick={() => setModalShow(true)}>
                                                    <div className="styleSvgIcon">
                                                        <Icon name="photosSvg" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    {/* <BusinessGalery
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    /> */}
                </>
                :
                <div>
                    <Container className="justify-content-center minMaxHeight h-100 rowHeight photoWidth" >
                        <Row className="borderRadiuceRow  rowWidth changeHeight">
                            <Col xs={12} className={` rowHeight`} >
                                <Skeleton className="photoSkeleton" />
                            </Col>
                        </Row>
                    </Container>
                </div>
            }
        </>
    );
}
export default BusinessPhotos;

