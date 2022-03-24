import React, { useState, useEffect, useRef } from "react";
import HemletComponent from "../components/utilities/hemlet";
import { Container, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import * as cloneDeep from "lodash/cloneDeep";

import { actions } from "../redux/Action";
import "../styles/addBusinessPage.css";
import Logo from "../images/logo.png";
import DetailsSection from "../components/addBusinessPage‏/DetailsSection";
import LocationSection from "../components/addBusinessPage‏/LocationSection";
import BasicDetailsSection from "../components/addBusinessPage‏/BasicDetailsSection";
import UpLoadImgSection from "../components/addBusinessPage‏/UpLoadImgSection";
import OpeningHoursSection from "../components/addBusinessPage‏/OpeningHoursSection";
import UserRecommendation from "../components/businessPage/UserRecommendation";
import Icon from "../components/utilities/Icon";
import addCatalog from "../components/editCatalog/addCatalog.js";

function AddBusinessPage() {
  const { t } = useTranslation();
  const seoTitle = "Post Your Business | EasyCart";
  const seoDescription =
    "Post Your Business description content. this s going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords = ["Business", "EasyCart"];

  const dispatch = useDispatch();

  let businessId = useSelector((state) => state.business.editBusiness._id);
  const editBusiness = useSelector((state) => state.business.editBusiness);
  const businessLocation = useSelector(
    (state) => state.location.businessLocation
  );
  const addressBusiness = useSelector((state) => state.location.address);
  const currentUserDetails = useSelector(
    (state) => state.user.currentUserDetails
  );
  const citiesToAdvertise = useSelector(
    (state) => state.business.citiesToAdvertise
  );
  const addBusinessPlaceId = useSelector(
    (state) => state.places.addBusinessPlaceId
  );
  const paymentPackageBusiness = useSelector(
    (state) => state.business.paymentPackageBusiness
  );
  const KeyWords = useSelector((state) => state.business.KeyWords);
  const subCategories = useSelector((state) => state.category.subCategories);

  let { keyWord } = useParams();
  const [businessName, setBusinessName] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  // const [address, setAddress] = useState(true);
  const [zipCode, setZipCode] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [website, setWebsite] = useState();
  const [elevator, setElevator] = useState();
  const [FriendlyWorkspace, setFriendlyWorkspace] = useState();
  const [wirelessInternet, setWirelessInternet] = useState();
  const freeParkingOnPremises = ""
  const [smokingAllowed, setSmokingAllowed] = useState();
  const [events, setEvents] = useState();
  const [facebook, setFacebook] = useState();
  const [twitter, setTwitter] = useState();
  const [googleplus, setGoogleplus] = useState();
  const [flagEdit, setFlagEdit] = useState("");
  //  const [flagOpenHour, setFlagOpenHour] = useState("");
  const [flagValid, setFlagValid] = useState(true);
  const [keyWords, setKeyWords] = useState("");
  const [userGalery, setuserGalery] = useState({ photos: [] });
  const [subCategoriesArrEdit, setSubCategoriesArrEdit] = useState([]);
  const [seoDescriptionWords, setSeoDescriptionWords] = useState();
  const [seoArrKeyWords, setSeoArrKeyWords] = useState();
  const [flagEmail, setFlagEmail] = useState();

  const [show, SetShow] = useState(false);
  // const [next, SetNext] = useState(true);

  const [level, setLevel] = useState(1);

  //arrow button's function
  const scrollUp = useRef(null);
  window.onscroll = () => {
    window.pageYOffset > 553 ? SetShow(true) : SetShow(false);
  };
  useEffect(() => {
    window.onbeforeunload = confirmExit;
    function confirmExit() {
      return "show warning";
    }
  }, []);

  const [galery, setGalery] = useState(
    editBusiness !== "" && editBusiness.galery !== undefined
      ? {
        photos: editBusiness.galery,
      }
      : { photos: [] }
  );
  const [sum, setSum] = useState(0);
  const currentUser = useSelector(state => state.user.currentUserDetails);
  let arruserGalery = { photos: [] };
  let arrGalery = { photos: [] };
  const [list, setList] = useState({
    1: { start: 0, end: 0 },
    2: { start: 0, end: 0 },
    3: { start: 0, end: 0 },
    4: { start: 0, end: 0 },
    5: { start: 0, end: 0 },
    6: { start: 0, end: 0 },
    7: { start: 0, end: 0 },
  });

  useEffect(() => {
    let categoriesarr = cloneDeep(subCategoriesArrEdit);
    if (subCategories.length > 0 && editBusiness !== "") {
      editBusiness.category.forEach((element1, i) => {
        subCategories.forEach((element2, i) => {
          if (element2._id === element1) {
            categoriesarr.push({
              label: element2.categoryName,
              value: element2._id,
            });
          }
        });
      });
      setSubCategoriesArrEdit((u) => categoriesarr);
    }
    // eslint-disable-next-line
  }, [editBusiness, subCategories]);

  //functions:
  useEffect(() => {
    if (keyWord && flagEdit === "" && editBusiness === "") {
      setFlagEdit(true);
      dispatch(actions.getBusinessByKeyWord(keyWord));
    }
    if (editBusiness !== "" && flagEdit === true) {
      setFlagEdit(false);
    }
    // eslint-disable-next-line
  }, [editBusiness, flagEdit, keyWord]);

  useEffect(() => {
    dispatch(actions.getAllCategories());
    const price = { free: 1, promoted: 5, premium: 10 };
    if (sum === 0)
      setSum((oldSum) =>
        paymentPackageBusiness
          ? price[paymentPackageBusiness]
          : editBusiness.paidUp
            ? price[editBusiness.paidUp]
            : oldSum
      );

    // eslint-disable-next-line
  }, [currentUserDetails, paymentPackageBusiness, KeyWords, sum]);

  function setUserGalery(galeryArr) {
    galeryArr.forEach((item) =>
      item.img !== undefined
        ? arruserGalery.photos.push(item)
        : arrGalery.photos.push(item)
    );
    if (arrGalery.photos.length > 0) {
      setGalery({
        photos: [...arrGalery.photos],
      });
    }

    if (arruserGalery.photos.length > 0) {
      setuserGalery({
        photos: [...arruserGalery.photos],
      });
    }
  }
  function setOpeningHoursList(listHours, flagOpenHour) {
    setList(listHours);
    // setFlagOpenHour(flagOpenHour);
  }
  useEffect(() => {
    if (businessLocation.lat !== undefined && keyWords !== "") {

      let lat = businessLocation.lat;
      let lng = businessLocation.lng;
      let businessName = keyWords;
      // await dispatch(actions.getPlaceIdOfBusiness({ businessName, lat, lng }))
      dispatch(actions.getPlaceIdOfBusiness({ businessName, lat, lng }))
    }
  }, [businessLocation.lat, businessLocation.lng, keyWords, dispatch])

  //create the new object
  async function create() {
    let i,
      s,
      c,
      st,
      addressObject,
      locationAdress = "";
    if (addressBusiness !== "") {
      addressObject = addressBusiness.split(",");
      i = addressObject.length - 1;
      s = addressObject[0];
      c = addressObject[i - 1];
      st = addressObject[i];
      locationAdress = businessLocation;
    } else {
      if (editBusiness !== "") {
        locationAdress = editBusiness.location;
        s = editBusiness.adress.street;
        c = editBusiness.adress.city;
        st = editBusiness.adress.state;
      }
    }
    // let lat = locationAdress.lat;
    // let lng = locationAdress.lng;
    // await dispatch(actions.getPlaceIdOfBusiness({ businessName, lat, lng }))

    let place_id = 0;
    if (addBusinessPlaceId !== "") {
      place_id = addBusinessPlaceId.candidates[0].place_id;
    }
    setUserGalery(galery.photos);
    const newBusiness = {
      owner: currentUser.uid,
      businessName: businessName,
      categoryList: category,
      description: description,
      email: email,
      phone: phone,
      opening_hours: list,
      adress: { state: st, city: c, street: s, zipCode: zipCode },
      location: locationAdress,
      elevator: elevator,
      FriendlyWorkspace: FriendlyWorkspace,
      // InstantBook: InstantBook,
      WirelessInternet: wirelessInternet,
      freeParkingOnPremises: freeParkingOnPremises,
      // freeParkingOnStreet: freeParkingOnStreet,
      smokingAllowed: smokingAllowed,
      events: events,
      website: website,
      facebook: facebook,
      twitter: twitter,
      googleplus: googleplus,
      galery: galery,
      placeId: place_id,
      dateAdded: new Date(),
      paidUp: paymentPackageBusiness,
      keyWords: keyWords,
      seoDescription: seoDescriptionWords,
      seoKeyWords: seoArrKeyWords,
    };
    if (editBusiness !== "") {
      newBusiness.paidUp = editBusiness.paidUp;
      newBusiness.dateAdded = editBusiness.dateAdded;
      if (newBusiness.categoryList === []) {
        newBusiness.categoryList = editBusiness.category;
      }
      if (citiesToAdvertise !== "") {
        newBusiness.citiesForAdvertising = citiesToAdvertise;
      } else {
        newBusiness.citiesForAdvertising = editBusiness.citiesForAdvertising;
      }
      if (userGalery.photos.length > 0) {
        newBusiness.userGalery = userGalery;
      }
      if (galery.photos.length > 0) {
        newBusiness.galery = galery;
      }
      if (arrGalery.photos.length > 0) {
        newBusiness.galery = arrGalery;
      }
      if (arruserGalery.photos.length > 0) {
        newBusiness.userGalery = arruserGalery;
      }
      setFlagValid(false);
      let editBusinessId = editBusiness._id;
      let updateBusiness = newBusiness;
      await dispatch(
        actions.updateBusiness({ updateBusiness, editBusinessId })
      );
    } else {
      setFlagValid(false);
      await dispatch(
        // actions.createBusinessPerUser({ newBusiness, citiesToAdvertise })
      );
    }
  }
  function checkValidForm() {
    let addressObject = "";
    if (addressBusiness !== "") {
      addressObject = addressBusiness.split(",");
    }
    if (
      businessName !== "" &&
      email !== "" &&
      description !== "" &&
      addressObject.length === 3 &&
      keyWords !== "" &&
      category !== [] &&
      phone !== "" &&
      category.length <= sum &&
      flagEmail === false
    ) {
      create();
    }
  }

  function setOnclick() {
    if (level === 2) {
    }
    setLevel((oldLevel) => oldLevel + 1);
  }
  checkValidForm(); //להוריד בהזדמנות הראשונה
  return (
    <div className="com-basic-details">
       <HemletComponent seoTitle={seoTitle} seoDescription={seoDescription} seoKeywords={seoKeywords} seoImage={seoImage} />

      <div ref={scrollUp}></div>

      {/*level1 */}
    
        <Container className="w-75">
          {level === 1 && (
            <div>
              <div className="div-title-business">
                <h2 className="title-business">
                  {flagEdit !== "" || editBusiness !== ""
                    ? t("add-business.update")
                    : t("add-business.add")}
                </h2>
              </div>
              ‏
              {subCategoriesArrEdit || !editBusiness ? (
                <BasicDetailsSection
                  arrSubCatecoriesOfEdit={subCategoriesArrEdit}
                  Category={(category) => setCategory(category)}
                  BusinessName={(businessName) => setBusinessName(businessName)}
                  MyKeyWords={(keyWords) => setKeyWords(keyWords)}
                />
              ) : (
                ""
              )}
              <LocationSection
                zipCode={(zipCode) => setZipCode(zipCode)}
                // flagAddress={(flag) => setAddress(flag)}
                seoDescriptionWords={(description) =>
                  setSeoDescriptionWords(description)
                }
                seokeyWords={(seoKeyWordsArr) =>
                  setSeoArrKeyWords(seoKeyWordsArr)
                }
              />
              <UserRecommendation
                businessId={businessId}
                edit={true}
                recomedation={editBusiness.userRecommendation}
                flagSourceRecomendations={true}
              ></UserRecommendation>
              <DetailsSection
                Description={(description) => setDescription(description)}
                Events={(events) => setEvents(events)}
                setFreeParkingOnPremises
                SmokingAllowed={(smokingAllowed) =>
                  setSmokingAllowed(smokingAllowed)
                }
                FreeParkingOnPremises={(freeParkingOnPremises) =>
                  freeParkingOnPremises
                }
                WirelessInternet={(wirelessInternet) =>
                  setWirelessInternet(wirelessInternet)
                }
                FriendlyWorkspace={(friendlyWorkspace) =>
                  setFriendlyWorkspace(friendlyWorkspace)
                }
                Elevator={(elevator) => setElevator(elevator)}
                Googleplus={(googleplus) => setGoogleplus(googleplus)}
                Twitter={(twitter) => setTwitter(twitter)}
                Facebook={(facebook) => setFacebook(facebook)}
                Phone={(facebook) => setPhone(facebook)}
                Email={(email) => setEmail(email)}
                Website={(website) => setWebsite(website)}
                flag={(f) => setFlagEmail(f)}
              />
              {/*}   <div className="div-btn-next">
              <Button className="btn-preview btn-next" variant="outline-primary"
                onClick={(e) => {
                  SetNext(!next)
                  setLevel(oldLevel => oldLevel + 1)
                }}> {/* {t('add-business.update')}  Next </Button></div>
        */}
            </div>
          )}
          {level === 2 && (
            <div>
              <UpLoadImgSection
                flagOfImg={true}
                myGalery={(galeryArr) => setUserGalery(galeryArr)}
              />

              {/* <UserRecommendation businessId={editBusiness._id} edit={true} /> */}

              <OpeningHoursSection
                openingHours={(listHours, flagOpenHour) =>
                  setOpeningHoursList(listHours, flagOpenHour)
                }
              />

              <div>
                {flagValid === false && editBusiness === ""
                  ? "העסק נוסף בהצלחה"
                  : ""}
              </div>
              <div>
                {flagValid === false && editBusiness !== ""
                  ? "העסק עודכן בהצלחה"
                  : ""}
              </div>
              {/*  <div className="div-btn-next" >
              editBusiness === "" && flagEdit === "" ?
                <Button className="btn-preview btn-next" variant="outline-primary" onClick={checkValidForm}   >
                  {t('add-business.add')}
                </Button>
                :
                <Button className="btn-preview btn-next" variant="outline-primary" onClick={create}>
                  {t('add-business.update')}
                </Button> 
            </div>*/}
            </div>
          )}
          {level === 3 && <addCatalog />}
          {/* </Container >} */}

          <Button
            className="btn-preview btn-next"
            variant="outline-primary"
            onClick={(e) => setOnclick()}
          >
            {" "}
            {level === 2 ? "Create store" : "Next"}
          </Button>

          <div>
            {flagValid === false && editBusiness === ""
              ? "העסק נוסף בהצלחה"
              : ""}
          </div>
          <div>
            {flagValid === false && editBusiness !== ""
              ? "העסק עודכן בהצלחה"
              : ""}
          </div>
          <div className="div-btn-next">
            {/* {editBusiness === "" && flagEdit === "" ?
          <Button className="btn-preview btn-next" variant="outline-primary" onClick={checkValidForm}   >
            {t('add-business.add')}
          </Button>
          :
          <Button className="btn-preview btn-next" variant="outline-primary" onClick={create}>
            {t('add-business.update')}
          </Button>} */}
          </div>
          <button
            style={{ position: "fixed", bottom: "0", right: "0", zIndex: "4" }}
            className={`arrow-up-container ${show === true ? "d-block" : "d-none"
              }`}
            onClick={() => scrollUp.current.scrollIntoView()}
          >
            <Icon name="arrowUp" />
          </button>
        </Container>

      <button
        style={{ position: "fixed", bottom: "0", right: "0", zIndex: "4" }}
        className={`arrow-up-container ${show === true ? "d-block" : "d-none"}`}
        onClick={() => scrollUp.current.scrollIntoView()}
      >
        <Icon name="arrowUp" />
      </button>
    </div>
  );
}
export default withRouter(AddBusinessPage);

/*
 useEffect(() => {

    let sumCategories = 0
    dispatch(actions.getAllCategories())
    if ((paymentPackageBusiness !== "" || editBusiness.paidUp !== "") && sum === 0) {
      switch (paymentPackageBusiness || editBusiness.paidUp) {
        case "free":
          sumCategories = 1
          break;
        case "promoted":
          sumCategories = 5
          break;
        case "premium":
          sumCategories = 10
          break;
        default:
      }
      setSum(sumCategories)
    }
    // eslint-disable-next-line
  }, [currentUserDetails, paymentPackageBusiness, KeyWords, sum])

*/
