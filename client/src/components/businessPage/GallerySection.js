import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player";

import { actions } from "../../redux/Action";
import MasonryGalery from "./MasonryGalery";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/businessPage/gallery.css";

function BusinessGalery(props) {
  const dispatch = useDispatch();

  const { checkedbusinessdetails } = props;
  const businessplacescheckeddetails = useSelector(
    (state) => state.places.BusinessPlacesCheckedDetails
  );

  const [flag, setFlag] = useState(false);
  const [cntAGoogleImg, setCntAGoogleImg] = useState(0);
  const cntMyImg = checkedbusinessdetails?.galery?.length || 0;
  const [cntUserImg, setCntUserImg] = useState(0);
  const [cntUserVideo, setCntUserVideo] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const [galeryView, setGaleryView] = useState(allGaleries() || []);

  useEffect(() => {
    let placeId = checkedbusinessdetails?.placeId;
    if (checkedbusinessdetails && flag === false) {
      setCntUserVideo(checkedbusinessdetails?.usersVideolink?.length);
      if (checkedbusinessdetails?.placeId) {
        dispatch(actions.getDetailsByGoogleId(placeId));
      } else {
        setCntAGoogleImg(0);
        dispatch(actions.setBusinessPlacesCheckedDetails("false"));
      }
      setFlag(true);
    }

    setCntUserImg(
      (oldCnt) => checkedbusinessdetails?.userGalery?.length || oldCnt
    ); // eslint-disable-next-line
  }, [checkedbusinessdetails]);

  useEffect(
    () => checkedbusinessdetails && setGaleryView(allGaleries()),
  // eslint-disable-next-line
    [checkedbusinessdetails]
  );

  useEffect(() => {
    setCntAGoogleImg(
      (oldcnt) => businessplacescheckeddetails?.photos?.length || oldcnt
    );
    setGaleryView(allGaleries());
    // eslint-disable-next-line
  }, [businessplacescheckeddetails]);

  function allGaleries() {
    let galery = [];
    let userGalery = getUserGaleryImage();
    let googleGalery = getGoogleImage();
    userGalery && galery.push(...userGalery);
    checkedbusinessdetails?.galery &&
      galery.push(...checkedbusinessdetails?.galery);
    googleGalery && galery.push(...googleGalery);

    return galery;
  }
  function getUserGaleryImage() {
    return checkedbusinessdetails?.userGalery?.map((photo) => photo);
  }
  function getGoogleImage() {
    return businessplacescheckeddetails?.photos?.map(
      (pic) =>
        `https://maps.googleapis.com/maps/api/place/photo?photoreference=${pic.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxwidth=480&maxheight=480`
    );
  }

  return (
    <>
      <Modal
        {...props}
        size="lg"
        centered
        className="imgModal"
        dialogClassName="modalSize"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <nav id="navigation" className="style-1 w-100">
            <ul id="responsive">
              <Container fluid>
                <Row>
                  <Col xs={12} sm={6} lg={2}>
                    <li
                      onClick={() => {
                        setGaleryView(allGaleries());
                        setShowVideo(false);
                      }}
                    >
                      <Button className="galery-button text-secondary changeHover w-100">
                        ({cntUserImg + cntMyImg + cntAGoogleImg}) All phtos
                      </Button>
                    </li>
                  </Col>
                  {cntUserImg > 0 && (
                    <Col xs={12} sm={6} lg={2} className="p-1">
                      <li
                        onClick={(e) => {
                          setGaleryView(getUserGaleryImage());
                          setShowVideo(false);
                        }}
                      >
                        <Button className="galery-button btn-warning text-secondary changeHover w-100">
                          ({cntUserImg}) photos of users
                        </Button>
                      </li>
                    </Col>
                  )}

                  {cntMyImg > 0 && (
                    <Col xs={12} sm={6} lg={2} className="p-1">
                      <li
                        onClick={() => {
                          setGaleryView(checkedbusinessdetails?.galery);
                          setShowVideo(false);
                        }}
                      >
                        <Button className="galery-button btn-warning text-secondary changeHover w-100">
                          ({cntMyImg}) buisness owner
                        </Button>
                      </li>
                    </Col>
                  )}
                  {cntAGoogleImg > 0 && (
                    <Col xs={12} sm={6} lg={2} className="p-1">
                      <li
                        onClick={() => {
                          setGaleryView(getGoogleImage());
                          setShowVideo(false);
                        }}
                      >
                        <Button className="galery-button btn-warning text-secondary changeHover w-100">
                          ({cntAGoogleImg})from the web
                        </Button>
                      </li>
                    </Col>
                  )}
                  {cntUserVideo > 0 && (
                    <Col xs={12} sm={6} lg={2} className="p-1">
                      <li>
                        <Button
                          className="galery-button btn-warning text-secondary changeHover w-100"
                          onClick={() => {
                            setShowVideo(true);
                          }}
                        >
                          ({cntUserVideo}) User video
                        </Button>
                      </li>
                    </Col>
                  )}
                </Row>
              </Container>
            </ul>
          </nav>
        </Modal.Header>
        <Modal.Body className="staticHeight">
          {showVideo ? (
            checkedbusinessdetails?.usersVideolink?.map((item) => (
              <div className="listing-item-container positionVideo justify-content-center align-items-end d-flex mt-3">
                <ReactPlayer url={item} />
              </div>
            ))
          ) : (
            <MasonryGalery photosArrs={galeryView} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default BusinessGalery;
