import { Form, Container, Col, Row, Card } from "react-bootstrap";
import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'

import CitiesForAdvertising from './CitiesToAdvertisingSection';
import Icon from '../utilities/Icon'

import "../../styles/AddBusiness2/addbusiness2.css"
import "../../styles/addBusinessPage.css";

function PromotionBusiness(props){

    const { Business, setBusiness } = props;
    const { t } = useTranslation();
    const editBusiness = useSelector(state => state.business.editBusiness);
    const [seoKeyWordsArr, setSeoKeyWordsArr] = useState({ keywords: [] });
    const [seoKeyWord, setSeoKeyWord] = useState("");
    const keyWordRef = useRef();
    const { keywords } = seoKeyWordsArr;

    let arrKeyWorsd = [];

    useEffect(() => {
        if (editBusiness !== "" && editBusiness.seoArrKeyWords !== undefined) {
            setSeoKeyWordsArr({
                ...seoKeyWordsArr,
                keywords: [...editBusiness.seoArrKeyWords]
            })
        }
        // eslint-disable-next-line
    }, [editBusiness])

    function setSeoKeyWords(e) {
        if ((e.key === "Enter" || e.type === "click") &&(seoKeyWord)) {
            keyWordRef.current.value = ""
            setSeoKeyWord("");
            arrKeyWorsd = [...seoKeyWordsArr.keywords]
            arrKeyWorsd.push(seoKeyWord);
            setSeoKeyWordsArr({
                ...seoKeyWordsArr,
                keywords: [...arrKeyWorsd]
            })
            setBusiness({ ...Business, seoArrKeyWords: arrKeyWorsd });
        }
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
        setBusiness({ ...Business, seoArrKeyWords: keyWordsArr });
    }

    return (
        <>
            <Container fluid className='pl-md-5 pr-md-5 mt-4'>
                <Row>
                    <Col>
                        <Card className="card-add-listing addBusinessCol">
                            <Card.Body >
                                <Card.Title className="basic-information">
                                    Business Promotion
                                </Card.Title>
                                <hr className="solid"></hr>
                                <Form.Group >
                                    <Row>
                                        <Col >
                                            <Form.Label className="listing-lable">
                                                {t('location.seo')}
                                            </Form.Label>
                                            <div className="div-add icon-add" onClick={(e) => { setSeoKeyWords(e) }}>
                                                <Icon name="add" />
                                            </div >
                                            <Form.Control
                                                ref={keyWordRef}
                                                className="listing-control input-size"
                                                type="text"
                                                onChange={(e) => { setSeoKeyWord(e.target.value) }}
                                                onKeyPress={(e) => { setSeoKeyWords(e) }}
                                            />
                                        </Col>
                                        
                                        <Col>
                                            {seoKeyWordsArr.keywords.length > 0 ?
                                                <div className="d-flex">
                                                    {seoKeyWordsArr.keywords.map((city, i) => (
                                                        <div className="list-inline-item" key={i} data-imgindex={i}>
                                                            <div className="span-item" onClick={handleDelete}>×</div>
                                                            &nbsp; {city}
                                                            &nbsp;  &nbsp;
                                                        </div>
                                                    ))}
                                                </div>
                                                : ""}
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <CitiesForAdvertising Business={Business} setBusiness={setBusiness} />
                                <Row>
                                    <Col lg={12} xs={12}>
                                        <Form.Group >
                                            <Form.Label className="listing-lable">
                                                {t('location.seo-description')}
                                            </Form.Label>
                                            <Form.Control
                                                className="listing-control desc-size textarearStyle"
                                                as="textarea"
                                                defaultValue={Business.seoDescription}
                                                onChange={(e) => {
                                                    setBusiness({ ...Business, seoDescription: e.target.value });
                                                }} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PromotionBusiness;
