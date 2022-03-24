import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { actions } from "../redux/Action";
import MapContainer from "../components/businessPage/MapContainer";
import Footer from "../components/Footer";
import OurInput from "../components/input";
import HemletComponent from "../components/utilities/hemlet";
import Icon from "../components/utilities/Icon";

import "../styles/contactPage.css";

import Logo from "../images/logo.png";

export default function ContactPage() {
  const seoTitle = "Contact | EasyCart";
  const seoDescription =
    "Contact description content. this s going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords = ["Business", "EasyCart"];
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [subject, setSubject] = useState();
  const [massage, setMassage] = useState();
  let r = false;
  function send() {
    if (!name || !email || !subject || !massage || !phone) {alert('some detailes are missing')
      alert(`${t("contact.required-fields")}`);
    } else {
      const contact = {
        name: name,
        email: email,
        subject: subject,
        massage: massage,
        phone: phone,
      };

      dispatch(actions.sendMailToContact(contact));
      dispatch(actions.sendSmsToContact(contact));
      r = true;
    }
  }

  return (
    <div className="contact-page">
      <HemletComponent
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        seoKeywords={seoKeywords}
        seoImage={seoImage}
      />

      <div id="wrapper">
        <div className="contact-map margin-bottom-60">
          <Container>
            <Row>
              <Col>
                <div >
                  <h4 className="contact-title font-weight-bold ">
                    {t("contact.contact-us")}
                  </h4>
                </div>
              </Col>
            </Row>

            <Row>
              {/* <div id="">
                <div
                  id="singleListingMap"
                  data-latitude="40.70437865245596"
                  data-longitude="-73.98674011230469"
                  data-map-icon="im im-icon-Map2"
                />
              </div> */}
              {/* <div className="d-flex w-100"> */}
              <Col className=" col-6 mt-0 pr-3">
                {/* <form className='contact-message'> */}
                <div className="col-12 contact-form-group ">
                  <div>
                    <OurInput
                      required={true}
                      name="name"
                      type="text"
                      id="name"
                      className="contact-input"
                      placeholder={t("contact.name")+"*"}
                      setState={setName}
                    />
                  </div>
                </div>
                <div className="col-12 contact-form-group ">
                  <div>
                    <OurInput
                      name="phone"
                      type="text"
                      id="phone"
                      className="contact-input"
                      placeholder={t("contact.phone")+'*'}
                      setState={setPhone}
                      validatorFunc="isMobilePhone"
                      validationMessage="input must be a mobile phone number"
                    />
                  </div>
                </div>
                <div className="col-12 contact-form-group">
                  <div>
                    <OurInput
                      name="email"
                      type="email"
                      id="email"
                      placeholder = {t("contact.email")+'*'}
                      className="contact-input"
                      setState={setEmail}
                      validatorFunc="isEmail"
                      validationMessage="input must be an email address"
                      required="required"
                    />
                  </div>
                </div>
                {/* </div> */}
                <div className="col-12 contact-form-group">
                  <OurInput
                    name="subject"
                    type="text"
                    id="subject"
                    placeholder={t("contact.subject")+'*'}
                    required="required"
                    className="contact-input"
                    setState={setSubject}
                  />
                </div>
                <div className="col-12 contact-form-group">
                  <input
                    as="textarea"
                    rows={3}
                    name="comments"
                    cols={40}
                    id="comments"
                    onFocus={(e) => (e.currentTarget.placeholder = "")}
                    onBlur={(e) =>
                      (e.currentTarget.placeholder = t("contact.message"))
                    }
                    placeholder={t("contact.message")}
                    spellCheck="true"
                    required="required"
                    className="contact-massage"
                    defaultValue={""}
                    onChange={(e) => setMassage(e.target.value)}
                  />
                </div>
                {/* <input
                    value='Submit Message'
                    type="submit"
                    className="submit-button1 contact-input styleButton"
                    id="submit"
                    defaultValue="Submit Message"
                    onClick={send}
                  /> */}
                <input
                  type="submit"
                  value="Send Message"
                  id="submit"
                  onClick={() => send()}
                  className="buttonStyle col-12 ml-2"
                />
                {r === true ? alert("נשלח בהצלחה") : ""}
                {/* </form> */}
              </Col>
              <Col className="col-6 mt-0 pl-3 ">
                <Container>
                  <Row className="h-100 w-100 ffff">
                    <div className="styleMap">
                      <MapContainer
                        location={{ lat: 32.091767, lng: 34.823996 }}
                        style={{
                          marginTop:"2vh",
                          height: "40vh",
                          width: "100%",
                          overflow: "hidden",
                          
                        }} />
                    </div>
                  </Row>

                  <Row>
                    <Col>
                      <div className="font-weight-bold text-left mt-4 font">
                        Find Us
                      </div>
                      {/* <hr></hr> */}
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <div className="text-left">
                        <div className="mb-3 d-flex">
                          <Icon name="locationContact"></Icon>
                          <div className="ml-2"> Bar Kochva 4 Bnei Brak</div>
                        </div>

                        <div className="mb-3 d-flex">
                          <Icon name="phoneContact"></Icon>
                          <div className="ml-2">(123) 123-456</div>
                        </div>
                        <div className="mb-3 d-flex">
                          <Icon name="fax"></Icon>
                          <div className="ml-2">(123) 123-456</div>
                        </div>
                      </div>
                    </Col>

                    <Col>
                      <div className="text-left">
                        <div
                          className="mb-3 d-flex"
                          onClick={() =>
                            window.open(`https://easycart.direct/`, "_blank")
                          }
                        >
                          <Icon name="webContact"></Icon>
                          <div className="ml-2">www.example.com</div>
                        </div>
                        <div className="mb-3 d-flex">
                          <Icon name="webContact"></Icon>
                          <div className="ml-2">office@example.com</div>
                        </div>
                      </div>
                    </Col>
                    {/* </div> */}
                  </Row>
                </Container>
              </Col>
              {/* </div> */}
              {/* <Col sm="12" md="6" className="address-box-container">
              <div
                className="address-container con"
              // data-background-image="images/our-office.jpg"
              >
                <h3 className='main-title'>{t("contact.our-office")}</h3>
                <br />
                <ul>
                  <p>{t("contact.street")}</p>
                  <p>{t("contact.city")}</p>
                  <p>{t("contact.phone")} (123) 123-456 </p>
                </ul>
              </div>
            </Col> */}
            </Row>
          </Container>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
