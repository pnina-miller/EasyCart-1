import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import HemletComponent from "../components/utilities/hemlet";
import Icon from "../components/utilities/Icon";
import "../styles/updateUserProfilePage.css";
import { actions } from "../redux/Action";
import { Link } from "react-router-dom";
import ImageCompression from "../functions/ImageCompression";
import input from "../components/input";

import Logo from "../images/logo.png";

export default function UpdateUserProfile() {
  const seoTitle = "My Profile | EasyCart";
  const seoDescription =
    "Your Profile description content. this s going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords = ["Profile", "EasyCart"];

  const [, /*loading*/ setLoading] = useState(false);
  const dispatch = useDispatch();
  const [usersLink, setUsersLink] = useState({
    youTube: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    twitter: "",
  });
  const [currentUserDetails, setUser] = useState(
    useSelector((state) => state.user.currentUserDetails)
  );
  const [galery, setGalery] = useState("https://www.w3schools.com/howto/img_avatar2.png");

  useEffect(() => {
    if (currentUserDetails) {
      setGalery(currentUserDetails?.profileImg || galery);
      setUsersLink({ ...usersLink, ...currentUserDetails.links });

    }
    // eslint-disable-next-line
  }, [currentUserDetails]);

  const setGaleryfunc = async (e) => {
    let imgUrl = await ImageCompression(e.target.files[0]);
    setGalery(imgUrl);
  };

  const handleChange = (target, value) => {
    let newField = {};
    newField[target] = value;
    setUser({ ...currentUserDetails, ...newField });
  };

  const handleUserLinkChange = (target, value) => {
    let newField = {};
    newField[target] = value;
    setUsersLink({ ...usersLink, ...newField });
  };

  function updateUserProfile(e) {
    e.preventDefault();
    setLoading(true);
    let updateUser = {
      ...currentUserDetails,
      links: usersLink,
      profileImg: galery,
    };
    Object.entries(updateUser.links).forEach(([key, value]) => {
      if (typeof value == "boolean") updateUser.links[key] = null;
    });

    dispatch(actions.updateUserProfile(updateUser));
  }

  return (
    <>
      <HemletComponent
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        seoKeywords={seoKeywords}
        seoImage={seoImage}
      />

      <Container fluid className="mt-5 styleBussines">
        <Row>
          <Col xs={12} className="pt-5">
            <div className="d-flex justify-content-between">
              <h3 className="pl-4">My Profile</h3>
              <div className="d-flex justify-content-end ">
                <Link
                  style={{ color: "var(--first-color)" }}
                  className="d-flex align-items-center"
                  to={"/" + currentUserDetails.userName}
                >
                  View profile page
                </Link>
              </div>
            </div>
            <div>
              {/* <hr className="underlineProfile"></hr> */}
            </div>
          </Col>
        </Row>
        <Container fluid>
          <Row className="pt-3">
            <Col xs={12} md={3} className="profileImage">
              <div>
                <label className="subheadingsProfile font-weight-bold pt-3 pl-2">
                  Profile Image
                </label>
                <div id="input1" className="d-none">
                  <input
                    type="file"
                    multiple={false}
                    onChange={setGaleryfunc}
                  />
                </div>
                <div className="d-flex justify-content-center pb-4 w-100 h-75 align-items-center">
                  <div
                    type="button"
                    onClick={() => {
                      //check why dom
                      document.getElementById("input1").children[0].click();
                    }}
                    className="img-fluid rounded-circle imgProfile"
                    style={{ backgroundImage: `url(${galery})` }}
                  >
                    <div className="h-100 w-100 align-items-center  rounded-circle imgcover d-flex justify-content-center">
                      <Container fluid>
                        <Row>
                          <Col
                            className="d-flex justify-content-center"
                            xs={12}
                          >
                            <div className="text-center">
                              <Icon name="arrow"></Icon>
                            </div>
                          </Col>
                          <Col xs={12} className="text-center">
                            <label className="text-center">Upload</label>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="profileImage ml-md-3 mt-md-0 ml-0 mt-3">
              <div>
                <label className="subheadingsProfile font-weight-bold pt-3 pl-2">
                  Personal Information{" "}
                </label>
                <hr></hr>
                <Form>
                  <Container fluid>
                    <Row>
                      <Col xs={12} md={5}>
                        <Form.Group id="firstName">
                          <Form.Label className="w-100 text-dark">
                            First Name
                          </Form.Label>
                          <Form.Control
                            className=" w-100 pt-2 inputProfile"
                            type="text"
                            required
                            id="rivka"
                            onChange={(e) =>
                              handleChange("firstName", e.target.value)
                            }
                            defaultValue={currentUserDetails?.firstName}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={5}>
                        <Form.Group id="lastName">
                          <Form.Label className="w-100 text-dark">
                            Last Name
                          </Form.Label>
                          <Form.Control
                            className=" w-100 inputProfile"
                            type="text"
                            required
                            onChange={(e) =>
                              handleChange("lastName", e.target.value)
                            }
                            defaultValue={currentUserDetails?.lastName}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={5}>
                        <Form.Group id="phone">
                          <Form.Label className="w-100 text-dark">
                            Phone
                          </Form.Label>
                          <Form.Control
                            className="inputProfile w-100"
                            type="number"
                            required
                            onChange={(e) =>
                              handleChange("phone", e.target.value)
                            }
                            defaultValue={currentUserDetails?.phone}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={5}>
                        <Form.Group id="email">
                          <Form.Label className="w-100 text-dark">
                            Email
                          </Form.Label>
                          <Form.Label
                            className="labelEmail w-100 text-dark"
                            type="email"
                            required
                          //     onChange={(e) => { email.current = e.target.value }}
                          //     defaultValue={currentUser ? currentUser.email : ""}
                          // defaultValue={currentUserDetails !== undefined ? currentUserDetails.email : ""}
                          >
                            {currentUserDetails ? currentUserDetails.email : ""}
                          </Form.Label>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={10}>
                        <Form.Group id="description">
                          <Form.Label className="w-100 text-dark">
                            About Me
                          </Form.Label>
                          {/* <Form.Label className="labelEmail w-100 text-dark"
                                                     onChange={(e) => { description.current.value = e.target.value }}
                                                     defaultValue={currentUserDetails !== undefined ? currentUserDetails.description : ""} 
                                                    > 
                                                  </Form.Label> */}
                          <textarea
                            className="inputProfile w-100 input-text-area"
                            onChange={(e) =>
                              handleChange("description", e.target.value)
                            }
                            defaultValue={currentUserDetails.description}
                          ></textarea>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row className="mt-3 pl-1 pb-1 pr-1 profileImage">
            <Col xs={12}>
              <div>
                <label className="subheadingsProfile font-weight-bold pt-3 pl-2">
                  Social Networks{" "}
                </label>
                <hr></hr>

              </div>
            </Col>
            <Col xs={12} >
              {currentUserDetails && (
                  <Container className="mt-3">
                    <Row className="mb-4 ">
                      {Object.entries(usersLink).map((link) => (
                        <>
                          <Col xs={12} md={6} className="svgColor col-lg">
                            <div className="d-flex justify-content-start align-items-center">
                              <Icon name={link[0]}></Icon>
                              <label className="lableColor mb-0">{link[0]}</label>
                              <Form style={{marginLeft: "40px"}}>
                                <Form.Check
                                  checked={usersLink[link[0]]}
                                  type="switch"
                                  id={link[0]}
                                  onChange={(e) => {
                                    handleUserLinkChange(
                                      link[0],
                                      !usersLink[link[0]]
                                    );
                                  }}
                                />
                              </Form>
                            </div>
                            <input
                              className={
                                usersLink[link[0]]
                                  ? "d-block inputNetWworks w-100 mt-3"
                                  : "d-none"
                              }
                              onChange={(e) => {
                                handleUserLinkChange(link[0], e.target.value);
                                e.target.defaultValue = e.target.value;
                              }}
                              defaultValue={
                                usersLink[link[0]] === true
                                  ? ""
                                  : usersLink[link[0]]
                              }
                            ></input>
                          </Col>
                        </>
                      ))}
                    </Row>
                  </Container>
              )}
            </Col>
          </Row>
          <div className="pt-2 d-flex justify-content-center mt-3 pb-3">
            <Button
              variant="warning"
              className="header-btn"
              onClick={(e) => updateUserProfile(e)}
            >
              Update Profile
            </Button>
          </div>
        </Container>
      </Container>
    </>
  );
}
