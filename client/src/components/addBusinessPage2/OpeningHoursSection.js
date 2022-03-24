import { Form, Col, Row, Card, Container } from 'react-bootstrap';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as cloneDeep from "lodash/cloneDeep";
import Moment from "moment";

import Icon from "../utilities/Icon";

import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/addBusinessPage.css";

function OpeningHoursSection(props) {

    const { Business, setBusiness } = props;
    const { t } = useTranslation();
  const [itemTemp, setItemTemp] = useState({});


    const formatMoment = index => Moment(index, "HH:mm").format("HH:mm")
  
    return (

        <Container fluid className='pl-md-5 pr-md-5 w-xs-60 top-opening-hours' >
            <Row >
                <Col>
                    <Card className="card-add-listing opening-hours-col addBusinessColHours">
                 
                        <Card.Body className='p-0'>
                              <Card.Title className="opening-hours-section">
                                {t("opening-hours.opening-hours")}
                            </Card.Title>
                            <div className="add-listing-headline">
                            </div>

                            <Container >
                                {Object.entries(Business?.opening_hours).map(([dayKey, days], i) => (
                                    <Row  className="row-sizing" >
                                        <Col className=' p-0 ' lg={1} md={8} xs={8} >{t("opening-hours." + dayKey)}</Col>
                                        <Col className=' p-0'lg={1} md={4} xs={4}> <Form.Check
                                            checked={days[0]}
                                            type="switch"
                                            id={i + "a"}
                                            onChange={(e) => {
                                                let tempField = Business.opening_hours
                                                tempField[dayKey] = days[0] ? [] : [{ start: '', end: '' }]
                                                setBusiness({ ...Business, opening_hours: tempField });
                                            }}
                                        /></Col>
                                        <Col >
                                            {days[0] ? <Container>
                                                <Row  >
                                                    {days?.map((hour, j) => (
                                                        <>
                                                            <Col
                                                            // check delete Unnecessary code
                                                            onMouseOver={(e) => {
                                                                setItemTemp(i);
                                                            }}
                                                                className="d-flex justify-content-center">
                                                                <select  xs={6} md={6} lg={4}
                                                                    className="chosen-select form-control"
                                                                    // value={Business?.opening_hours[dayKey][j]?.start} 
                                                                    onChange={(e) => {
                                                                        let b = cloneDeep(Business)
                                                                        let temp = b.opening_hours
                                                                        temp[dayKey][j].start = e.target.value
                                                                        temp[dayKey][j].end = e.target.value
                                                                        setBusiness({ ...Business, opening_hours: temp });
                                                                    }}
                                                                >
                                                                    {Array.from({ length: 24 }).map((_, index) => {
                                                                        return <option key={index + "i"} >{formatMoment(index)}</option>
                                                                    })}
                                                                </select>
                                                                <p xs={1} md={1} lg={1} className="pl-2 pr-2">to</p>
                                                                <select xs={6} md={6} lg={4}
                                                                    // value={Business?.opening_hours[dayKey][j]?.end}
                                                                    className="chosen-select form-control"
                                                                    onChange={(e) => {
                                                                        let temp = Business?.opening_hours
                                                                        temp[dayKey][j].end = e.target.value
                                                                        setBusiness({ ...Business, opening_hours: temp });
                                                                    }}
                                                                >
                                                                    {/* - (Number(Business?.opening_hours[dayKey][j]?.start?.split(":")[0])) || 0 */}
                                                                    {Array.from({ length: 24  }).map((_, i) => {
                                                                        let index = i
                                                                        // Business?.opening_hours[dayKey][j]?.start ? formatMoment(index + Number(Business?.opening_hours[dayKey][j]?.start?.split(":")[0])) :
                                                                        return <option key={index + "i"} >{ formatMoment(index)}</option>
                                                                    })}
                                                                </select>
                                                            </Col>
                                                           {itemTemp === i&& <Col xs={1} md={1} lg={1}>
                                                                <div  className="d-flex justify-content-center icons-oh">
                                                                    <div id={`button${i}`} className="delete-hour"
                                                                        onClick={() => {
                                                                            let b = cloneDeep(Business)
                                                                            let oh = b.opening_hours;
                                                                            oh[dayKey].splice(j, 1)
                                                                            setBusiness({ ...Business, opening_hours: oh });
                                                                        }}>
                                                                        <Icon name="x" />
                                                                    </div>
                                                                </div>
                                                            </Col>}
                                                        </>
                                                    ))}
                                                    <Col xs={1} md={1} lg={1}>
                                                        <div className="d-flex justify-content-center icons-oh">
                                                            <div className="add-hour  ml-5" onClick={() => {
                                                                let a = cloneDeep(Business)
                                                                let temp = a.opening_hours
                                                                temp[dayKey].push({ start: '', end: '' })
                                                                setBusiness({ ...Business, opening_hours: temp });
                                                            }}>
                                                                <Icon name="plusAdd" />
                                                            </div>
                                                        </div>
                                                    </Col></Row>
                                            </Container>



                                                :
                                                <Col xs={10} md={10} lg={9} className="d-flex justify-content-center">
                                                    <select
                                                        disabled={true}
                                                        className="disable-select form-control"
                                                    >
                                                        {Array.from({ length: 1 }).map((_, index) => (
                                                            <option key={index + "i"} >{Moment(index, "HH:mm").format("HH:mm")}</option>
                                                        ))}
                                                    </select>
                                                    <p className="color-text-to">to</p>
                                                    <select
                                                        disabled={true}
                                                        className="disable-select form-control"
                                                    >
                                                        {Array.from({ length: 1 }).map((_, index) => (
                                                            <option key={index + "i"} >{Moment(index, "HH:mm").format("HH:mm")}</option>
                                                        ))}
                                                    </select>
                                                </Col>
                                            }</Col>
                                    </Row>
                                ))}
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default OpeningHoursSection;