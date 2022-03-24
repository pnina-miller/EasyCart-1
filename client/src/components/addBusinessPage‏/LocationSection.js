

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AutoCompleteSearch from '../AutoCompleteSearch'
import CitiesForAdvertising from './CitiesToAdvertisingSection';
import { useSelector } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Col, Row, Card, Container, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';


import '../../styles/addBusinessPage.css';
import Icon from "../utilities/Icon";
export default function LocationSection(props) {
    const { t } = useTranslation();
    const editBusiness = useSelector(state => state.business.editBusiness)
    // const addressBusiness = useSelector(state => state.location.address)
    // const [flagAdress, setFlagAdress] = useState(editBusiness !== "" ? false : true);
    //check
    // const [zipCode, setZipCode] = useState("");
    const [seoKeyWordsArr, setSeoKeyWordsArr] = useState({ keywords: [] })
    const [seoKeyWord, setSeoKeyWord] = useState("")

    const { keywords } = seoKeyWordsArr;
    let arrKeyWorsd = []
    // let index = ""
    const { zipCode, seoDescriptionWords, seokeyWords } = props

    useEffect(() => {
        if (editBusiness !== "" && editBusiness.adress !== undefined && editBusiness.adress.zipCode !== undefined)
            zipCode(editBusiness.adress.zipCode);
        seoDescriptionWords(editBusiness.seoDescription);

    // eslint-disable-next-line
    }, [editBusiness])

    useEffect(() => {
        if (editBusiness !== "" && editBusiness.seoKeyWords !== undefined) {
            setSeoKeyWordsArr({
                ...seoKeyWordsArr,
                keywords: [...editBusiness.seoKeyWords]
            })
            seokeyWords(editBusiness.seoKeyWords)
        }
        
    // eslint-disable-next-line
    }, [editBusiness])


    function setSeoKeyWords() {
        arrKeyWorsd = [...seoKeyWordsArr.keywords]
        // index = arrKeyWorsd.findIndex(x => x === seoKeyWord)
        arrKeyWorsd.push(seoKeyWord);
        setSeoKeyWordsArr({
            ...seoKeyWordsArr,
            keywords: [...arrKeyWorsd]
        })
        seokeyWords(arrKeyWorsd)

    }
    const handleDelete = e => {
        let keyWordsArr = []
        let target = e.target.parentElement;
        let targetindex = target.dataset.imgindex * 1;
        setSeoKeyWordsArr({
            ...seoKeyWordsArr,
            keywords: [...keywords.slice(0, targetindex), ...keywords.slice(targetindex + 1)]
        })
        seoKeyWordsArr.keywords.forEach((element, i) => {
            if (i !== targetindex) {
                keyWordsArr.push(element);
            }
        });
        seokeyWords(keyWordsArr)

    }


    return (
        <div>
            <Card className="card-add-listing ">
                <Card.Body className="body-add-listing">
                    <Card.Title className="basic-information">
                        {t('location.location')}
                    </Card.Title>
                    <hr className="solid"></hr>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group >
                                    <Form.Label className="listing-lable">
                                        {t('location.address')}
                                        <OverlayTrigger key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id="tooltip-top">
                                                    This field is required |
                                                    must enter address  includding State City Street only
                                                </Tooltip>
                                            }>
                                            <button variant="outline-dark"
                                                className="icon-btn btnmul">
                                                <Icon name="information" />

                                            </button>
                                        </OverlayTrigger>
                                    </Form.Label>
                                    <AutoCompleteSearch flag={false}   cNAuto="input-size" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Label className="listing-lable">
                                        {t('location.zip-code')}
                                        <OverlayTrigger key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id="tooltip-top">
                                                    This field is required
                                                </Tooltip>
                                            }>
                                            <button variant="outline-dark"
                                                className="icon-btn btnmul">
                                                <Icon name="information" />
                                            </button>
                                        </OverlayTrigger>
                                    </Form.Label>

                                    <Form.Control
                                        className="listing-control input-size"
                                        type="number"
                                        defaultValue={editBusiness !== "" && editBusiness.adress !== undefined ? editBusiness.adress.zipCode : ""}
                                        onChange={(e) => {
                                            // setZipCode(e.target.value)
                                            zipCode(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group >
                                    <Form.Label className="listing-lable">
                                        {t('location.seo')}
                                    </Form.Label>
                                    <Form.Control
                                        className="listing-control input-size"
                                        type="text"
                                        onChange={(e) => { setSeoKeyWord(e.target.value) }}
                                    />
                                    <Button className="btn-preview btn-add-business m-business" variant="outline-primary" onClick={setSeoKeyWords}>{t('location.add-Seo-key-word')}</Button>
                                    <ul className="list-inline">

                                        {seoKeyWordsArr.keywords.length > 0 ?
                                            <div className="custom-file-preview">
                                                {seoKeyWordsArr.keywords.map((city, i) => (

                                                    <li className="list-inline-item" key={i} data-imgindex={i}>
                                                        <span onClick={handleDelete}>×</span>
                                                        {city}
                                                    </li>
                                                ))}
                                            </div>
                                            : ""}
                                    </ul>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <CitiesForAdvertising />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group >
                                    <Form.Label className="listing-lable">
                                        {t('location.seo-description')}
                                    </Form.Label>
                                    <Form.Control
                                        className="listing-control desc-size"
                                        as="textarea"
                                        defaultValue={editBusiness !== "" && editBusiness.seoDescription !== undefined ? editBusiness.seoDescription : ""}
                                        onChange={(e) => {
                                            seoDescriptionWords(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                    {/* </Card.Text> */}
                </Card.Body>
            </Card>
        </div>
    )
}

