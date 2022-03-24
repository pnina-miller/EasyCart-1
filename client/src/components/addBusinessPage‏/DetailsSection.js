
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Col, Row, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

import Icon from "../utilities/Icon";
import '../../styles/addBusinessPage.css';
import UploadVideoSection from './UploadVideoSection';

export default function DetailsSection(props) {
    const editBusiness = useSelector(state => state.business.editBusiness)
    const { t } = useTranslation();
    //check all
    // const [description, setDescription] = useState("");
    // const [phone, setPhone] = useState("");
    const [elevator, setElevator] = useState(false);
    const [friendlyWorkspace, setFriendlyWorkspace] = useState(false);
    // const [wirelessInternet, setWirelessInternet] = useState(false);
    const [freeParkingOnPremises, setFreeParkingOnPremises] = useState(false);
    const [smokingAllowed, setSmokingAllowed] = useState(false);
    const [events, setEvents] = useState(false);
    const [/*linkrVideo*/, setLinkVideo] = useState();
    //check
    // const [flagEmail, setFlagEmail] = useState();
    const { FriendlyWorkspace, Description, Email,flag, Phone, Events, Facebook, Twitter, Googleplus, Elevator, SmokingAllowed, FreeParkingOnPremises, Website, WirelessInternet } = props

    useEffect(() => {
        if (editBusiness !== "") {
            Description(editBusiness.description)
            Phone(editBusiness.phone)
            WirelessInternet(editBusiness.wirelessInternet)
            FreeParkingOnPremises(editBusiness.freeParkingOnPremises)
            SmokingAllowed(editBusiness.smokingAllowed)
            Elevator(editBusiness.elevator)
            FriendlyWorkspace(editBusiness.friendlyWorkspace)
            Events(editBusiness.events)
            Email(editBusiness.email)
            Facebook(editBusiness.facebook)
            Twitter(editBusiness.twitter)
            Googleplus(editBusiness.googleplus)
            Website(editBusiness.website)
        }

        // eslint-disable-next-line
    }, [editBusiness])
    //validation's email
    function checkEmail(e) {
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (pattern.test(e)) {
            Email(e);
            flag(false);
        }
    }

    return (
        <Card className="card-add-listing" >
            <Card.Body className="body-add-listing">
                <Card.Title className="basic-information">
                    {t('details.details')}
                </Card.Title>
                <hr className="solid"></hr>
                    <Row>
                        <Col>
                            <Form.Group >
                                <Form.Label className="listing-lable">
                                   {t('details.description')}
                                    <OverlayTrigger key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id="tooltip-top">
                                                    This field is required
                                                </Tooltip>
                                            }>
                                            <button variant="outline-dark"
                                                // onClick={}
                                                className="icon-btn btnmul">
                                                     <Icon name="information" />

                                            </button>
                                        </OverlayTrigger>
                                </Form.Label>
                                <Form.Control
                                   className="listing-control input-size"
                                    as="textarea"
                                    defaultValue={editBusiness !== "" ? editBusiness.description : ""}
                                    name="summary"
                                    cols={40}
                                    rows={3}
                                    id="summary"
                                    spellCheck="true"
                                    onChange={(e) => {
                                        // setDescription(e.target.value)
                                        Description(e.target.value)
                                    }} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group >
                                <Form.Label className="listing-lable">
                                    {t('details.website')}
                                </Form.Label>
                                <Form.Control 
                                    className="listing-control input-size"
                                    type="Website"
                                    defaultValue={editBusiness !== "" && editBusiness.website !== "" ? editBusiness.website : ""}
                                    onChange={(e) => {
                                        Website(e.target.value)
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col>
                            {/* <UploadVideoSection /> */}
                      <UploadVideoSection myGalery={(galary) => { setLinkVideo(galary) }}/>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group >
                                <Form.Label className="listing-lable">
                                   {t('details.phone')}
                                   <OverlayTrigger key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id="tooltip-top">
                                                    This field is required
                                                </Tooltip>
                                            }>
                                            <button variant="outline-dark"
                                                // onClick={}
                                                className="icon-btn btnmul">
                                                     <Icon name="information" />

                                            </button>
                                        </OverlayTrigger>
                                </Form.Label>
                                <Form.Control
                                    className="listing-control input-size"
                                    maxLength="10"
                                    defaultValue={editBusiness !== "" ? editBusiness.phone : ""}
                                    onChange={(e) => {
                                        // setPhone(e.target.value)
                                        Phone(e.target.value)
                                    }} type="text"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label className="listing-lable">
                                    {t('details.email')}
                                    <OverlayTrigger key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id="tooltip-top">
                                                    This field is required | must enter correct email address
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
                                    type="email"
                                    defaultValue={editBusiness !== "" ? editBusiness.email : ""}
                                    onChange={(e) => { checkEmail(e.target.value) }}
                                />
                                 {/* {flagEmail===true&&editBusiness===""?
                                    <FormLabel className="listing-lable" > הכנס כתובת מייל נכונה</FormLabel>:""} */}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group >
                                <Form.Label className="listing-lable">
                                    {t('details.google')}
                                </Form.Label>
                                <Form.Control 
                                    className="listing-control input-size"
                                    type="text"
                                    defaultValue={editBusiness !== "" && editBusiness.googleplus !== "" ? editBusiness.googleplus : ""}
                                    placeholder="https://plus.google.com"
                                    onFocus={(e) => e.currentTarget.placeholder = ''}
                    onBlur={(e) => e.currentTarget.placeholder = "https://plus.google.com"}
                                    onChange={(e) => {
                                        Googleplus(e.target.value)
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label className="listing-lable">
                                    Facebook
                                </Form.Label>
                                <Form.Control 
                                    className="listing-control input-size"
                                    type="text"
                                    defaultValue={editBusiness !== "" && editBusiness.facebook !== "" ? editBusiness.facebook : ""}
                                    placeholder="https://www.facebook.com/"
                                    onFocus={(e) => e.currentTarget.placeholder = ''}
                                    onBlur={(e) => e.currentTarget.placeholder = "https://www.facebook.com/"}
                                    onChange={(e) => {
                                        Facebook(e.target.value)
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label className="listing-lable">
                                    Twitter
                                </Form.Label>
                                <Form.Control 
                                    className="listing-control input-size"
                                    type="text"
                                    defaultValue={editBusiness !== "" && editBusiness.twitter !== "" ? editBusiness.twitter : ""}
                                    placeholder="https://www.twitter.com/"
                                    onFocus={(e) => e.currentTarget.placeholder = ''}
                                    onBlur={(e) => e.currentTarget.placeholder = "https://www.twitter.com/"}
                                    onChange={(e) => {
                                        Twitter(e.target.value)
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="ml-3">
                            <Form.Group >
                                <Form.Check
                                    className="form-check-input"
                                    id="check-h" type="checkbox" name="check"
                                    defaultChecked={editBusiness !== "" && editBusiness.events !== "" ? editBusiness.events : false}
                                    onChange={(e) => {
                                        setEvents(!events)
                                        Events(!events)
                                    }}
                                />
                                <label className="listing-lable">
                                    {t('details.events')}
                                </label>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Check
                                    className="form-check-input"
                                    id="check-g" type="checkbox" name="check"
                                    defaultChecked={editBusiness !== "" && editBusiness.smokingAllowed !== "" ? editBusiness.smokingAllowed : false}
                                    onChange={(e) => {
                                        setSmokingAllowed(!smokingAllowed)
                                        SmokingAllowed(!smokingAllowed)
                                    }}
                                />
                                <label className="listing-lable">
                                    {t('details.smoking-allowed')}
                                </label>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Check 
                                    className="form-check-input"
                                    id="check-f" type="checkbox" name="check"
                                    defaultChecked={editBusiness !== "" && editBusiness.freeParkingOnPremises !== "" ? editBusiness.freeParkingOnPremises : false}
                                    onChange={(e) => {
                                        setFreeParkingOnPremises(!freeParkingOnPremises)
                                        FreeParkingOnPremises(!freeParkingOnPremises)
                                    }}
                                />
                                <label className="listing-lable">
                                    {t('details.free-parking-on-premises')}
                                </label>
                            </Form.Group>
                        </Col>
                        {/* <Col>
                                    <Form.Group controlId="formGroupEmail">
                                        <Form.Label className="listing-lable">
                                            {t('details.google')}
                                        </Form.Label>
                                        <Form.Control
                                            id="check-c" type="checkbox" name="check" onChange={(e) => { setInstantBook(!InstantBook) }} />
                                        <label htmlFor="check-c">Instant Book</label> */}
                        {/* <input id="check-d" type="checkbox" name="check"
                                            defaultChecked={editBusiness !== "" && editBusiness.WirelessInternet !== "" ? editBusiness.WirelessInternet : false}
                                            onChange={(e) => {
                                                setWirelessInternet(!wirelessInternet)
                                                WirelessInternet(!wirelessInternet)
                                            }}
                                        />
                                    </Form.Group>
                                </Col> */}
                        <Col>
                            <Form.Group>
                                <Form.Check 
                                    className="form-check-input"
                                    id="check-b" type="checkbox" name="check"
                                    defaultChecked={editBusiness !== "" && editBusiness.FriendlyWorkspace !== "" ? editBusiness.FriendlyWorkspace : false}
                                    onChange={(e) => {
                                        setFriendlyWorkspace(!friendlyWorkspace)
                                        FriendlyWorkspace(!friendlyWorkspace)
                                    }}
                                />
                                <label className="listing-lable">
                                    {t('details.friendly-workspace')}
                                </label>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Check 
                                    className="form-check-input"
                                    id="check" type="checkbox" name="check"
                                    defaultChecked={editBusiness !== "" && editBusiness.elevator !== "" ? editBusiness.elevator : false}
                                    onChange={(e) => {
                                        setElevator(!elevator)
                                        Elevator(!elevator)
                                    }}
                                />
                                <label className="listing-lable">
                                    {t('details.elevator-in-building')}
                                </label>
                            </Form.Group>
                        </Col>
                    </Row>
            </Card.Body>


        </Card>

    )
}
