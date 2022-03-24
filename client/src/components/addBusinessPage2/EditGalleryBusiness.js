import { Container, Row, Col } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import ChooseImage from './ChooseImage'
import Icon from '../utilities/Icon'

import "../../styles/AddBusiness2/EditGalleryBusiness.css"

function EditGalleryBusiness(props) {

    const { setBusiness, Business } = props;

    const [template, setTemplate] = useState(Business.galery.length > 0 ? Business.galery.length - 1 : 0);
    const [arrEditGallery, setArrEditGallery] = useState(Business.galery || []);
    const [currentImage, setCurrentImage] = useState(0);
    const [imageSrc, setImageSrc] = React.useState(arrEditGallery[currentImage]);
    const [imageAfterChange, setImageAfterChange] = useState();
    const [editModalShow, setEditModalShow] = useState(false);
    const [classChangeCol, setclassChangeCol] = useState('');
    const [paddingTopDiv, setpaddingTopDiv] = useState('');

    useEffect(() => {
        setImageSrc(arrEditGallery[currentImage])
        // eslint-disable-next-line
    }, [currentImage])

    useEffect(() => {
        if (template === 0) {
            setclassChangeCol("col-lg-12")
        }
        else {
            setclassChangeCol("col-lg-6")
        }
        if (template === 1) {
            setpaddingTopDiv('')
        }
        else {
            setpaddingTopDiv('pt-2')
        }
        // eslint-disable-next-line
    }, [template])

    useEffect(() => {
        if (imageAfterChange) {
            let arr = [...arrEditGallery];
            arr[currentImage] = imageAfterChange;
            setArrEditGallery(arr)
            setBusiness({ ...Business, galery: arr })
        }
        // eslint-disable-next-line
    }, [imageAfterChange])

    const show = (index) => {
        let arr = document.getElementsByName(`gallery${index}`);
        arr[0].style.display = 'flex';
        arr[1].style.display = 'flex';
    }

    const hide = (index) => {
        let arr = document.getElementsByName(`gallery${index}`);
        arr[0].style.display = 'none';
        arr[1].style.display = 'none';
    }

    const trashImg = async (index) => {
        let arr = await [...arrEditGallery];
        let firstPart = arr.slice(0, index)
        let secondPart = arr.slice(index + 1, arr.length)
        setArrEditGallery(firstPart.concat(secondPart))
        setTemplate(x => x - 1);
        setBusiness({ ...Business, galery: firstPart.concat(secondPart) })
    }

    return (
        <>
            <Container className=" justify-content-center minMaxHeight h-75 rowHeight" >
                <Row className="borderRadiuceRow  rowWidth changeHeight">
                    <Col xs={12} className={`p-0 pr-0 rowHeight ${classChangeCol}`} >
                        <div onMouseOver={(e) => show(0, e)} onMouseOut={() => hide(0)} className="w-100 h-100 opacityDiv d-flex align-items-end imgStyleCover " style={{ backgroundImage: `url(${arrEditGallery[0]})` }} >
                            <div name="gallery0" className="ml-4 mb-3 cursorIcon align-items-center justify-content-center" onClick={() => { setEditModalShow(true); setCurrentImage(0) }}>
                                <Icon name="upload" />
                            </div>
                            <div name="gallery0" className="ml-1 mb-3 cursorIcon  align-items-center justify-content-center" onClick={() => { trashImg(0) }}>
                                <Icon name="trash" />
                            </div>
                            {
                                !arrEditGallery[0] &&
                                <div className="iconResponsive h-100 w-100 position-absolute m-auto  d-flex align-items-center justify-content-center" >
                                    <div>
                                        <Icon name="imgGallery" />
                                        <p className="text-secondary">Upload Image</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </Col>

                    <Col xs={12} lg={6} className={template >= 1 ? 'p-0 pl-lg-2 rowHeight' : "d-none"} >
                        <Container fluid className='h-100 rowHeight' >
                            <Row className={template >= 2 ? 'h-50 mt-2 mt-lg-0 halfHeight' : "d-none"} >
                                <Col className={template >= 4 ? 'p-0 pr-2 pr-0 ' : 'd-none'} >
                                    <div onMouseOver={(e) => show(4, e)} onMouseOut={() => hide(4)} className="w-100 h-100 opacityDiv d-flex align-items-end imgStyleCover" style={{ backgroundImage: `url(${arrEditGallery[4]})` }} >
                                        <div name="gallery4" className="ml-4 mb-3 cursorIcon align-items-center justify-content-center" onClick={() => { setEditModalShow(true); setCurrentImage(4); }}>
                                            <Icon name="upload" />
                                        </div>
                                        <div name="gallery4" className="ml-1 mb-3 cursorIcon align-items-center justify-content-center" onClick={() => { trashImg(4) }}>
                                            <Icon name="trash" />
                                        </div>
                                        {!arrEditGallery[4] &&
                                            <div className="iconResponsive h-100 w-100 position-absolute m-auto  d-flex align-items-center justify-content-center" >
                                                <div>
                                                    <Icon name="imgGallery" />
                                                    <p className="text-secondary">Upload Image</p>
                                                </div>                                            </div>
                                        }
                                    </div>
                                </Col>

                                <Col className={template >= 2 ? 'p-0' : 'd-none'} >
                                    <div onMouseOver={(e) => show(2, e)} onMouseOut={() => hide(2)} className="w-100 h-100 opacityDiv d-flex align-items-end imgStyleCover" style={{ backgroundImage: `url(${arrEditGallery[2]})` }} >
                                        <div name="gallery2" className="ml-4 mb-3 cursorIcon align-items-center justify-content-center" onClick={() => { setEditModalShow(true); setCurrentImage(2) }}>
                                            <Icon name="upload" />
                                        </div>
                                        <div name="gallery2" className="ml-1 mb-3 cursorIcon  align-items-center justify-content-center" onClick={() => { trashImg(2) }}>
                                            <Icon name="trash" />
                                        </div>
                                        {!arrEditGallery[2] &&
                                            <div className="iconResponsive h-100 w-100 position-absolute m-auto  d-flex align-items-center justify-content-center" >
                                                <div>
                                                    <Icon name="imgGallery" />
                                                    <p className="text-secondary">Upload Image</p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </Col>

                            </Row>

                            <Row className={template === 1 ? "height-1" : "height-2"}>

                                <Col className={template >= 3 ? 'p-0 pr-2 pr-0 pt-2 col-xs-12 ' : 'd-none'}>
                                    <div onMouseOver={(e) => show(3, e)} onMouseOut={() => hide(3)} className="w-100 h-100 opacityDiv d-flex align-items-end imgStyleCover" style={{ backgroundImage: `url(${arrEditGallery[3]})` }} >
                                        <div name="gallery3" className="ml-4 mb-3 cursorIcon align-items-center justify-content-center" onClick={() => { setEditModalShow(true); setCurrentImage(3) }}>
                                            <Icon name="upload" />
                                        </div>
                                        <div name="gallery3" className="ml-1 mb-3 cursorIcon align-items-center justify-content-center" onClick={() => { trashImg(3) }}>
                                            <Icon name="trash" />
                                        </div>
                                        {!arrEditGallery[3] &&
                                            <div className="iconResponsive h-100 w-100 position-absolute m-auto  d-flex align-items-center justify-content-center" >
                                                <div>
                                                    <Icon name="imgGallery" />
                                                    <p className="text-secondary">Upload Image</p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </Col>

                                <Col className={template >= 1 ? `p-0 ${paddingTopDiv}` : 'd-none'} >
                                    <div onMouseOver={(e) => show(1, e)} onMouseOut={() => hide(1)} className="w-100 h-100 opacityDiv d-flex align-items-end imgStyleCover" style={{ backgroundImage: `url(${arrEditGallery[1]})` }} >
                                        <div name="gallery1" className="ml-4 mb-3 cursorIcon  align-items-center justify-content-center" onClick={() => { setEditModalShow(true); setCurrentImage(1) }}>
                                            <Icon name="upload" />
                                        </div>
                                        <div name="gallery1" className="ml-1 mb-3 cursorIcon  align-items-center justify-content-center" onClick={() => { trashImg(1) }}>
                                            <Icon name="trash" />
                                        </div>
                                        {!arrEditGallery[1] &&
                                            <div className="iconResponsive h-100 w-100 position-absolute m-auto  d-flex align-items-center justify-content-center" >
                                                <div>
                                                    <Icon name="imgGallery" />
                                                    <p className="text-secondary">Upload Image</p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </Col>

                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <div className=" d-flex justify-content-end align-items-end h-100 w-100 placeAddBtn">
                <button className="addImgBtn" onClick={() => setTemplate(x => x < 4 ? x + 1 : x)}  >
                    <div className="d-flex justify-content-center align-items-center wrapperAddImages">
                        <Icon name="imgGallery" />
                        <p className="m-0">&nbsp;&nbsp;Add image</p>
                    </div>
                </button>
            </div>
            <ChooseImage imageSrc={imageSrc} setImageSrc={setImageSrc} show={editModalShow} onHide={() => setEditModalShow(false)} setImageAfterChange={setImageAfterChange} />
        </>
    );
}
export default EditGalleryBusiness;