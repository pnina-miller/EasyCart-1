import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import HemletComponent from "../components/utilities/hemlet";
import { useParams, Link } from "react-router-dom";
import mailgo from "mailgo";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";

import BusinessPhotos from "../components/businessPage/PhotosSection";
import Share from "../components/Share";
import Logo from "../images/logo.png";
import Footer from "../components/Footer";
import UserRecommendation from "../components/businessPage/UserRecommendation";
import Icon from "../components/utilities/Icon";
import FavoritesIcon from "../components/utilities/FavoritesIcon";
import AddComment from "../components/businessPage/AddReviews";
// import UpLoadImgSection from "../components/addBusinessPage‏/UpLoadImgSection";
import "../styles/businessPage/businessPage.css";
import MapModal from "../components/businessPage/MapModal";
import BusinessGalery from "../components/businessPage/GallerySection";
import useOpenHours from "../custom hooks/CHookOpenHours";
import CatalogBusiness from "../components/businessPage/CatalogBusiness";
import UloadVideo from "../components/addBusinessPage‏/UploadVideoSection";
import Oh from "../components/businessPage/Oh"


import "../styles/productSearchResult.css";
import { businessDetailesSrvice2 } from "../services/business";

const BusinessPage = (props) => {
  const [CheckedBusinessDetails, setCheckedBusinessDetails] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(false);
  const { keyword } = useParams();

  const seoTitle = `${keyword} | EasyCart`;
  const seoDescription =
    "Your Business description content. this s going to contain few lines about this page";
  const scrollUp = useRef(null);

  const seoImage = Logo;
  const seoKeywords = ["Business", "EasyCart"];

  useEffect(() => {
    setError(false)
    keyword && businessDetailesSrvice2(keyword)
      .then(result => { setCheckedBusinessDetails(result) })
      .catch(error => setError(true))
    mailgo();
  }, [keyword]);


  useEffect(() => { console.log('CheckedBusinessDetails', CheckedBusinessDetails);; }, [CheckedBusinessDetails])

  const executeScroll = () => {
    scrollUp.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <>
      <HemletComponent
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        seoKeywords={seoKeywords}
        seoImage={seoImage}
      />
      {CheckedBusinessDetails ? (
        <Container className="mt-5" id="wrapper">
          <BasicDetailesSection
            CheckedBusinessDetails={CheckedBusinessDetails}
            setCheckedBusinessDetails={setCheckedBusinessDetails}
            executeScroll={executeScroll}
          />

          <Row className="mt-4">
            <BusinessPhotos
              setModalShow={setModalShow}
              CheckedBusinessDetails={CheckedBusinessDetails}
              businessImages={CheckedBusinessDetails.galery}
              flagDetails={false}
            />
          </Row>
          <BusinessGalery
            businessImages={CheckedBusinessDetails.galery}
            checkedbusinessdetails={CheckedBusinessDetails}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <Container>
            <Row>
              <Col>
            <OwnerSection owner={CheckedBusinessDetails.owner} /></Col>
            <Col>
            <Oh business={CheckedBusinessDetails&&CheckedBusinessDetails}/></Col>
            </Row>
            <DescriptionSection
              description={CheckedBusinessDetails.description}
              aboutTitle={
                CheckedBusinessDetails.aboutTitle ||
                "About " + CheckedBusinessDetails.businessName
              }
            />
            <ServicesSection CheckedBusinessDetails={CheckedBusinessDetails} />

            <CategoriesSection
              categoriesTitle={CheckedBusinessDetails.categoriesTitle}
              category={CheckedBusinessDetails.category}
            />
            <hr className="underline"></hr>

            <ContactSection CheckedBusinessDetails={CheckedBusinessDetails} />

            <CatalogBusiness storeId={CheckedBusinessDetails.storeId} />
            {/* don't delete this is'nt to mvp */}
            {/* <hr className="underline"></hr>

            <div ref={scrollUp}></div>{/**/}
             <RecommentSection
              commentsTitle={CheckedBusinessDetails.commentsTitle}
              userRecommendation={CheckedBusinessDetails.userRecommendation}
              businessId={CheckedBusinessDetails._id}
            /> 
          </Container>
        </Container>
      ) : (
        error && <h1>no businessDetails</h1>
      )}
      <Footer />
    </>
  );
};

export default BusinessPage;

const BasicDetailesSection = (props) => {
  const { CheckedBusinessDetails, setCheckedBusinessDetails} = props;

  const { t } = useTranslation();

  const openHours = useOpenHours(CheckedBusinessDetails);
  const [modalMapShow, setModaMaplShow] = useState(false);

  return (
    <Container>
      <Row className=" d-flex justify-content-end h-25">
        <Col xs={12} className="mt-5 ">
          <h1 className="text-secondary font-weight-bold h1 pl-3">
            {CheckedBusinessDetails.businessName}
            {CheckedBusinessDetails.adress?.city && (
              <span className="listing-tag">
                <small className="font-weight-bold">
                  {" - "}
                  {CheckedBusinessDetails.adress?.city}
                </small>
              </span>
            )}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col
          xs={6}
          lg={9}
          className="d-flex justify-content-center text-secondary"
        >
          <Container>
            <Row>
              <Col
                title={`${CheckedBusinessDetails.totalClicks > 1 ? `${CheckedBusinessDetails.totalClicks} users were here` : `${CheckedBusinessDetails.totalClicks} user was here`} `}
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
                  {CheckedBusinessDetails?.totalClicks}
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
              {openHours &&
                <Col
                  lg={3}
                  sm={6}
                  xs={12}
                  className="svgWrapp borderRight hCol  d-flex align-items-center justify-content-center"
                >
                  <Icon name="clockFill"></Icon>
                  <label className="text-center mt-auto mb-auto mr-auto ml-2 text-center">
                    {openHours}
                  </label>
                </Col>
              }
              <Col
                title="Location" data-toggle="tooltip"
                lg={4}
                sm={6}
                xs={12}
                className="svgWrapp hCol  d-flex align-items-center justify-content-center"
              >
                {CheckedBusinessDetails?.adress?.city &&
                  <>
                    <Icon name="place"></Icon>{" "}
                    <div
                      className="mt-auto mb-auto mr-auto ml-2 text-center text-secondary"
                      onClick={() => setModaMaplShow(true)}
                    >
                      {CheckedBusinessDetails.adress
                        ? CheckedBusinessDetails.adress.street +
                        " " +
                        CheckedBusinessDetails.adress.city +
                        " " +
                        CheckedBusinessDetails.adress.state
                        : ""}

                    </div>
                  </>
                }
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
                lg={6}
                sm={6}
                xs={12}
                className="svgWrapp borderRight hCol  d-flex align-items-center justify-content-center"
              >
                <FavoritesIcon
                  businessPage={true}
                  business={CheckedBusinessDetails}
                  setBusiness={setCheckedBusinessDetails}
                />
                <label className="text-center mt-auto mb-auto mr-auto ml-2 text-center" title={`${CheckedBusinessDetails.totalAddedToFavorites > 1 ? `${CheckedBusinessDetails.totalAddedToFavorites} users did like` : `${CheckedBusinessDetails.totalAddedToFavorites} user did like`} `} data-toggle="tooltip">
                  {CheckedBusinessDetails.totalAddedToFavorites}
                </label>
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

      <MapModal
        textHeader={
          CheckedBusinessDetails.adress &&
          `${CheckedBusinessDetails.adress.street} ${CheckedBusinessDetails.adress.city} ${CheckedBusinessDetails.adress.state}`
        }
        show={modalMapShow}
        onHide={() => setModaMaplShow(false)}
      />
    </Container>
  );
};

const OwnerSection = (props) => {
  const { owner } = props;

  return (
    <>
      {owner && (
        <div className="mt-5 mb-3">
          {/* subheading */}
          <div className="mb-2">
            <div className="subText font-weight-bold text-secondary pl-5">
              <h3>About The Owner</h3>
            </div>
          </div>
          <Row>
            <Col lg={1} xs={6} sm={6}>
              <Link to={"/" + owner?.userName}>
                <img className="img" alt="" src={owner?.profileImg}></img>
              </Link>
            </Col>
            <Col lg={11} xs={6} sm={6}>
              <div className="description text-secondary pl-4 pt-3">
                <b>{owner?.userName + "   " + owner?.lastName}</b>
                <p>{owner?.description}</p>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
const DescriptionSection = (props) => {
  const { description, aboutTitle } = props;
  return (
    <div className="container-fluid subheadingContainer">
      {/* className="subheading" */}
      {description !== undefined &&
        <Row >
          <hr className="underline"></hr>
          <div className="subText font-weight-bold text-secondary pl-5 ">
            <h3>{aboutTitle}</h3>
          </div>
        </Row>
      }
      <Row className="mt-3 mb-3 p-text">
        <Col xs={12}>
          <div style={{ wordBreak: "break-all", width: "100%" }}>
            {description}
          </div>
        </Col>
      </Row>

    </div>
  );
};

const ServicesSection = (props) => {
  const { CheckedBusinessDetails } = props;
  console.log(CheckedBusinessDetails)

  return (
    <>
    {CheckedBusinessDetails?.service?.length>0&&
    <div className="container-fluid">
      {CheckedBusinessDetails?.service?.length > 0 &&
        <>
          <hr className="underline"></hr>
          <div className="font-weight-bold text-secondary">
            <h5 className="subtitles text-capitalize p-text">
              {CheckedBusinessDetails?.servicesTitle || "services"}
            </h5>
          </div>
        </>
      }
      {/* <hr className="underline"></hr> */}
      <div className="svgColorFix row text-secondary d-flex justify-content-start p-text">
        {CheckedBusinessDetails?.service?.map(
          (service) =>
          (
            <Button
              className="mt-4 mb-3 mr-2 text-secondary  buttonOver ml-3"
              variant="outline-warning"
            >
              {service.name}
            </Button>
          )
        )}

      </div>

      {/* <div className="svgColorFix row text-secondary d-flex justify-content-start pl-5">
        {CheckedBusinessDetails?.service?.map((service, i) =>
          <div key={i} className="d-block col-lg-3 col-md-5 col-sm-10 svgbColor colorIcon">
            {/* <Icon name={service}></Icon> */}
      {/* <label className="m-2">{service.serviceName}</label>
          </div>
        )}
        <hr className="underline"></hr>
      </div> */}
    </div>
  }
  </>
  );

};

const CategoriesSection = (props) => {
  const { categoriesTitle, category } = props;
  return (
    <Container className="w-100" fluid>
      <Row>
        {category?.length > 0 && (
          <>
            <hr className="underline"></hr>
            <div className="font-weight-bold text-secondary p-text">
              <h5 className="subtitles text-capitalize pl-3">
                {categoriesTitle || "Categories"}
              </h5>
            </div>
          </>
        )}
      </Row>
      <Row className="p-text">
        <Col>
          {category?.map((item, index) => {
            return (
              <>
                <Button
                  className="mt-4 mb-3 mr-2 text-secondary  buttonOver"
                  variant="outline-warning"
                >
                  {item.categoryName}
                </Button>
              </>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

const ContactSection = (props) => {
  const { CheckedBusinessDetails } = props;
  const [modalVideo, setModalVideo] = useState(false);

  const { t } = useTranslation();

  const linkLat = CheckedBusinessDetails?.location?.lat;
  const linkLng = CheckedBusinessDetails?.location?.lng;

  // function checkImg() {
  //   let businessId = CheckedBusinessDetails._id;
  //   dispatch(actions.addUserGaleryOfBusiness({ galery, businessId }));
  // }
  return (
    <Container>
      <div className="font-weight-bold text-secondary">
        <h5 className="subtitles p-text">Contact Us</h5>
      </div>

      <Row className="d-flex justify-content-start pl-4 ">
        {linkLat && linkLng && (
          <div className="d-block businessCategories col-lg-2 col-md-4 col-sm-6">
            <a
              href={`https://waze.com/ul?ll=${linkLat},${linkLng}&navigate=yes`}
              rel="noreferrer"
              target="_blank"
            >
              <Icon name="navigarion"></Icon>
              <label className="pl-3 text-dark">
                {t("business-details.navigation")}
              </label>
            </a>
          </div>
        )}
        {CheckedBusinessDetails.website && (
          <div
            className="d-block businessCategories col-lg-2 col-md-4 col-sm-6"
            onClick={() =>
              window.open(`${CheckedBusinessDetails.website}`, "_blank")
            }
          >
            <Icon name="homeSite"></Icon>
            <label className="pl-3">{t("business-details.site")}</label>
          </div>
        )}
        {CheckedBusinessDetails.phone && (
          <div
            className="d-block businessCategories col-lg-2 col-md-4 col-sm-6"
            onClick={() =>
              window.open(`sms://${CheckedBusinessDetails.phone}`, "_blank")
            }
          >
            <Icon name="message"></Icon>
            <label className="pl-3">{t("business-details.message")}</label>
          </div>
        )}
        {CheckedBusinessDetails.phone && (
          <div
            className="d-block businessCategories col-lg-2 col-md-4 col-sm-6"
            onClick={() =>
              window.open(`tel://${CheckedBusinessDetails.phone}`, "_blank")
            }
          >
            <Icon name="phone"></Icon>
            <label className="pl-3">{CheckedBusinessDetails.phone}</label>
          </div>
        )}
        {/* don't delete it's not to mvp */}
        {/* <div
          className="d-block businessCategories col-lg-2 col-md-4 col-sm-6"
          onClick={() => setShowAddGalery(true)}
        >
          <Icon name="imge"></Icon>
          <label className="pl-3">{t("business-details.imge")}</label>
        </div>

        <div
          onClick={() => setModalVideo(true)}
          className={"d-block businessCategories col-lg-2 col-md-4 col-sm-6"}
        >
          <Icon name="video"></Icon>
          <label className="pl-3">{t("business-details.video")}</label>
        </div> */}

        {/* <Modal
          show={showAddGalery}
          className="b-modal d-flex justify-content-center"
          onHide={() => setShowAddGalery(false)}
          size="lg"
          dialogClassName="modalWidthImage"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter modalTitle"
              className=" title-modal fontHeader "
            >
              <p className="mb-0"> Add Image</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className=" addPadding ">
            <UpLoadImgSection
              flagOfImg={false}
              galery1={galery}
              setGalery1={setGalery}
            ></UpLoadImgSection>
            <div className="d-flex justify-content-center">
              <Button onClick={checkImg} className="b-files">
                Send
              </Button>{" "}
            </div>
          </Modal.Body>
        </Modal> */}

        <Modal
          show={modalVideo}
          onHide={() => setModalVideo(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Body>
            <UloadVideo businessId={CheckedBusinessDetails._id}></UloadVideo>
          </Modal.Body>
        </Modal> 
      </Row>
    </Container>
  );
};
/* don't delete this is'nt to mvp */ 
const RecommentSection = (props) => {
  const { commentsTitle, userRecommendation, businessId } = props;

  return (
    <div className="pt-5" id="comments">
      {/* subheading */}
      <div className="">
        <div className="subText font-weight-bold text-secondary text-capitalize pl-5">
          <h3>{commentsTitle || "comments"}</h3>
        </div>
      </div>

      <AddComment edit={true} businessId={businessId}></AddComment>

      <UserRecommendation
        edit={false}
        recomedation={userRecommendation}
        flagSourceRecomendations={true}
        businessId={businessId}
      />
    </div>
  );
};
