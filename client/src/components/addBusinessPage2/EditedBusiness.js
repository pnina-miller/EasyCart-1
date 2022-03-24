import { withRouter, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import mailgo from "mailgo";

import EditGalleryBusiness from './EditGalleryBusiness';
import AutoCompleteSearch from "../AutoCompleteSearch";
import MapModal from "../businessPage/MapModal";
import { actions } from "../../redux/Action";
import Logo from "../../images/logo.png";
import Input from "../input";
import Icon from "../utilities/Icon";
import BusinessService from './BusinessServices'
import Share from "../Share";
// import useOpenHours from "../custom hooks/CHookOpenHours";

import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

import "../../styles/AddBusiness2/EditedBusiness.css";
import "../../styles/AddBusiness2/Configurator.css";
const MIN_TEXTAREA_HEIGHT = 35;


function EditedBusiness(props) {

  const { Business, setBusiness } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const seoTitle = "Your Business | EasyCart";
  const seoDescription =
    "Your Business description content. this s going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords = ["Business", "EasyCart"];
  const textareaRef = React.useRef(null);
  const editBusiness = useSelector((state) => state.business.editBusiness);
  const key = useSelector((state) => state.business.selectedText);

  const businessLocation = useSelector(
    (state) => state.location.businessLocation);
  const [modalMapShow, setModaMaplShow] = React.useState(false);

  let { keyword } = useParams();
  let linkLat = businessLocation?.lat;
  let linkLng = businessLocation?.lng;

  useEffect(() => window.scrollTo(0, 0), []);

  React.useLayoutEffect(() => {
    textareaRef.current.style.height = "inherit";
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [Business?.description]);

  useEffect(() => {
    if (props.match.params.keyword !== undefined) {
      dispatch(actions.getBusinessByKeyWord(props.match.params.keyword));
      mailgo();
    }
    // eslint-disable-next-line
  }, [key, keyword]);

  return (
    <>
      <div className="helem">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <meta name="keywords" content={seoKeywords} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:image" content={seoImage} />
          <link rel="canonical" content={window.location.href} />
        </Helmet>
      </div>

      <div className="div-edit">
        <div id="wrapper">
          <br></br>
          <Container fluid>
            <Row className="d-flex justify-content-start h-25 ">
              <Col xs={6}>
                <h1 className="text-secondary font-weight-bold h1 ">
                  <Input
                    className="change-input business-input business-name"
                    type="text"
                    defaultValue={Business?.businessName ? Business.businessName : "Business Name"}
                    onFocus={(e) => (Business?.businessName)}
                    onBlur={(e) =>
                      (e.currentTarget.placeholder = "Business Name")
                    }
                    onChange={(e) => {
                      setBusiness({
                        ...Business,
                        businessName: e.target.value
                      });
                    }}
                  ></Input>
                  <span className="listing-tag">
                    <small className="font-weight-bold"> </small>
                  </span>
                </h1>
              </Col>
            </Row>
            {/* <Row> */}
            {/* <Col
                xs={6}
                lg={9}
                className="d-flex justify-content-center text-secondary"
              >
                <Container>
                  <Row className="rowBuisnessPage">
                    <Col lg={1} className="svgWrapp borderRight hCol   d-flex align-items-center justify-content-center" >
                      <div><Icon name="chatSquare"></Icon></div>
                      {Business.userRecommendation ? Business.userRecommendation.length : 3}
                    </Col>
                    <Col
                      lg={2}
                      className="ml-sm-0 svgWrapp borderRight  hCol d-flex align-items-center justify-content-center"
                    >
                      <Icon name="eye"></Icon>
                      {Business.totalClicks ? Business.totalClicks : 1000}
                    </Col>
                    <Col lg={3} className="svgWrapp borderRight hCol  d-flex align-items-center justify-content-center">
                      <Icon name="clockFill" />open now 13:00

                    </Col>
                    <Col lg={4} className="svgWrapp hCol  d-flex align-items-center justify-content-center">
                      <Icon name="place"></Icon>{" "}
                      <AutoCompleteSearch flag={false} ph={"placeholderConfigurator"} cNAuto="auto-edit change-address" />
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col
                xs={12}
                lg={3}
                className="d-flex justify-content-end text-secondary "
              >
                <Col
                  lg={5}
                  xs={12}
                  sm={6}
                  className="svgWrapp hCol  d-flex align-items-center justify-content-center"
                >
                  {/* <FavoritesIcon /> */}
            {/* <Icon name="Heart" />  2
                </Col> */}
            {/* <Col lg={6} xs={12} sm={6} className="svgWrapp hCol  d-flex align-items-center justify-content-center">
                  {/* <Share /> */}
            {/* <Icon name="share" />
                  {t("business-details.share")}
                </Col>
              </Col>
            </Row>*/}
            <Row className="pl-4">
              <Col
                xs={6}
                lg={8}
                className="d-flex justify-content-center text-secondary"
              >
                <Container>
                  <Row>
                    <Col
                      title="30 user was here"
                      data-toggle="tooltip"
                      lg={2}
                      sm={6}
                      xs={12}
                      className="svgWrapp borderRight hCol  d-flex align-items-center justify-content-center "
                    >
                      <Icon name="eye"></Icon>
                      <label className="text-center mt-auto mb-auto mr-auto ml-2 text-center " >
                        {" "}

                        {/* <button type="button" class="btn btn-secondary"  data-placement="bottom" > */}
                        30
                        {/* </button> */}
                      </label>
                    </Col>
                    {/* <Col
                lg={2}
                sm={6}
                xs={12}
                className="svgWrapp borderRight hCol  d-flex align-items-center justify-content-center"
              >
                 <div onClick={executeScroll} className="commentsIcon">
                    <Icon name="chatSquare"></Icon>
                  </div>
                  {CheckedBusinessDetails?.userRecommendation?.length}
              </Col> */}
                    <Col
                      lg={3}
                      sm={6}
                      xs={12}
                      className="svgWrapp borderRight hCol  d-flex align-items-center justify-content-center"
                    >
                      <Icon name="clockFill"></Icon>
                      <label className="text-center mt-auto mb-auto mr-auto ml-2 text-center">
                        open now
                        {/* {Business.openingHours ? openHours : "open now"} */}
                      </label>
                    </Col>

                    <Col
                      title="Location" data-toggle="tooltip"
                      lg={4}
                      sm={6}
                      xs={12}
                      className="svgWrapp hCol  d-flex align-items-center justify-content-center"
                    >
                      {Business?.adress?.city ?
                        <>
                          <Icon name="place"></Icon>{" "}
                          <div
                            className="mt-auto mb-auto mr-auto ml-2 text-center text-secondary"
                            onClick={() => setModaMaplShow(true)}
                          >
                            {Business.adress
                              ? Business.adress.street +
                              " " +
                              Business.adress.city +
                              " " +
                              Business.adress.state
                              : ""}

                          </div>
                        </>
                        : <AutoCompleteSearch flag={false} ph={"placeholderConfigurator"} cNAuto="auto-edit change-address" />}
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col
                xs={6}
                lg={3}
                className="d-flex justify-content-end text-secondary"
              >
                <Container className="c-margin">
                  <Row >
                    <Col
                      title="2 users did like" data-toggle="tooltip"
                      lg={6}
                      md={6}
                      xs={12}
                      className="svgWrapp borderRight hCol  d-flex align-items-center justify-content-center"
                    >
                      <Icon name="Heart" /> 2
                      {/* <FavoritesIcon
                        businessPage={true}
                        business={CheckedBusinessDetails}
                      />*/}
                      {/* <label className="text-center mt-auto mb-auto mr-auto ml-2 text-center" >
                        
                      </label> */}
                    </Col>
                    <Col
                      title="Share" data-toggle="tooltip"
                      lg={6} sm={6} xs={12}
                      className="svgWrapp  hCol cursor-d d-flex align-items-center "
                    >
                      <Share url={window.location.href} />
                      <Share
                        {...props}
                        url={window.location.href}
                        title={"My esayCart:)"}
                      >
                        <div className="fit-content cursor-p">
                          <Icon name="share" />
                        </div>
                      </Share>
                      &nbsp;&nbsp;
                      {t("business-details.share")}
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>





          </Container>

          <MapModal

            show={modalMapShow}
            onHide={() => setModaMaplShow(false)}
          />
          <Container className="mt-4">
            <EditGalleryBusiness Business={Business} setBusiness={setBusiness} flagDetails={false} />
          </Container>
          <br></br>
          <br></br>
          <div className="container">
            <div className=" d-flex justify-content-center">
              <div className=" editSubCategories ">
                <div className="subText font-weight-bold editTitle pl-5">
                  {/* <h5>
                    <Input
                      className="change-input business-input color-about"
                      type="text"
                      defaultValue={Business?.aboutTitle ? Business?.aboutTitle : "About Business"}
                      onFocus={(e) => (Business?.aboutTitle)}
                      onBlur={e => e.currentTarget.placeholder = "About Business"}
                      onChange={(e) => {
                        setBusiness({ ...Business, aboutTitle: e.target.value });
                      }}
                    ></Input>
                  </h5> */}
                  <h5 className="title">
                    <Input
                      className="change-input business-input"
                      type="text"
                      defaultValue={Business?.aboutTitle ? Business?.aboutTitle : "About Business"}
                      onFocus={(e) => (Business?.aboutTitle)}
                      onBlur={e => e.currentTarget.placeholder = "About Business"}
                      onChange={(e) => {
                        setBusiness({ ...Business, aboutTitle: e.target.value });
                      }}
                    ></Input>
                  </h5>
                </div>
              </div>
            </div>
            <div>
              <div className="description text-secondary pl-5">
                <textarea
                  className="input-area"
                  // type="text"
                  ref={textareaRef}
                  style={{
                    minHeight: MIN_TEXTAREA_HEIGHT,
                    minWidth: "125%",
                    resize: "none"
                  }}
                  placeholder="Business Description"
                  onFocus={(e) => (Business?.description)}
                  onBlur={e => e.currentTarget.placeholder = "Business Description"}
                  value={Business?.description}
                  onChange={(e) => {
                    setBusiness({ ...Business, description: e.target.value });
                  }}
                ></textarea>
              </div>
            </div>

            <div>
              <hr className="underline"></hr>
            </div>

            <h5 className="title pl-5">
              <Input
                className="change-input business-input"
                type="text"
                defaultValue={Business?.servicesTitle ? Business?.servicesTitle : "Business Services"}
                onFocus={Business?.servicesTitle}
                onBlur={e => e.currentTarget.placeholder = "Business Services"}
                onChange={(e) => {
                  setBusiness({
                    ...Business, servicesTitle
                      : e.target.value
                  });
                }}
              ></Input>
            </h5>
            <Container>
              <Row>
                <BusinessService business={Business} setBusiness={setBusiness} />
              </Row>
            </Container>
            {/* <div className="container-fluid">  */}
            {/*  <div className="row text-secondary d-flex justify-content-start pl-5">
                {services.map((item, i) => (
                  <div key={i} className="div-services">
                    <div
                      onClick={(e) => {
                        let b = { ...Business };
                        b[item] = !b[item];
                        setBusiness(b);
                      }}
                      className="div-check-box d-flex justify-content-center align-items-center"
                    >
                      {Business[item] && (
                        <Icon name="vIcon"></Icon>
                      )
                      }
                    </div>



                    <div className="input-service pl-3 pr-3 d-flex justify-content-center align-items-center">
                      <Icon name={arrIcon[i]}></Icon>
                      &nbsp; {item}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            <div>
              <hr className="underline"></hr>
            </div>
            <div>
              <div className="font-weight-bold text-secondary">
                <h5 className="subtitles pl-5">
                  <Input
                    className="change-input business-input"
                    type="text"
                    defaultValue={Business?.categoriesTitle ? Business?.categoriesTitle : "Business Categories"}
                    onFocus={Business?.categoriesTitle}
                    onBlur={e => e.currentTarget.placeholder = "Business Categories"}
                    onChange={(e) => {
                      setBusiness({ ...Business, categoriesTitle: e.target.value });
                    }}
                  ></Input>
                </h5>
              </div>
              <div>
                <hr className="underline"></hr>
              </div>

              { }
              <div className="container">
                <div className="row d-flex justify-content-start pl-4">
                  <div
                    className={
                      linkLat !== "" &&
                        linkLat !== undefined &&
                        linkLng !== "" &&
                        linkLng !== undefined
                        ? "d-block businessCategories col-lg-2 col-md-4 col-sm-6"
                        : "businessCategoriesOacity col-lg-2 col-md-4 col-sm-6"
                    }
                  >
                    <Icon name="navigarion"></Icon>
                    <label className="pl-3 text-dark">
                      {t("business-details.navigation")}
                    </label>
                  </div>
                  <div className="d-block businessCategories col-lg-2 col-md-4 col-sm-6">
                    <Icon name="homeSite"></Icon>

                    <Input
                      className="input-edit number d-block change-input"
                      type="text"
                      placeholder="Edit Home Site"
                      value={Business.website}
                      onFocus={e => e.currentTarget.placeholder = ''}
                      onBlur={e => e.currentTarget.placeholder = "Edit Home Site"}
                      onChange={(e) => {
                        setBusiness({ ...Business, website: e.target.value });
                      }}
                    >
                    </Input>
                  </div>

                  <div className="businessCategoriesOacity col-lg-2 col-md-4 col-sm-6">
                    <Icon name="message"></Icon>
                    <label className="pl-3">
                      {t("business-details.message")}
                    </label>
                  </div>
                  <div className="d-block businessCategories col-lg-2 col-md-4 col-sm-6">
                    <Icon name="phone"></Icon>
                    <Input
                      className="input-edit number d-block change-input"
                      type="text"
                      placeholder="Edit Number"
                      defaultValue={editBusiness.phone ? editBusiness.phone : Business.phone}
                      onFocus={e => e.currentTarget.value = ''}
                      onBlur={e => e.currentTarget.placeholder = "Edit Number"}
                      onChange={(e) => {
                        setBusiness({ ...Business, phone: e.target.value });
                      }}
                    >
                    </Input>
                  </div>
                  {/* <div
                    className={
                      "businessCategoriesOacity col-lg-2 col-md-4 col-sm-6"
                    }
                  >
                    <Icon name="imge"></Icon>
                    <label className="pl-3">{t("business-details.imge")}</label>
                  </div>
                  <div
                    className={
                      "businessCategoriesOacity col-lg-2 col-md-4 col-sm-6"
                    }
                  >
                    <Icon name="video"></Icon>
                    <label className="pl-3">
                      {t("business-details.video")}
                    </label>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(EditedBusiness);
