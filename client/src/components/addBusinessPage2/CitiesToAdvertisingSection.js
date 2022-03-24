import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, FormGroup } from "react-bootstrap";

import '../../styles/addBusinessPage.css';
import { actions } from '../../redux/Action'
import AutoCompleteSearch from '../AutoCompleteSearch'
import Icon from '../utilities/Icon'

export default function CitiesToAdvertisingSection(props) {
  const dispatch = useDispatch()

  const { Business, setBusiness } = props
  const currentUserDetails = useSelector(state => state.user.currentUserDetails)
  const address = useSelector(state => state.location.address)
  const addressCity = useSelector(state => state.location.addressCity)
  const editBusiness = useSelector(state => state.business.editBusiness)
  const paymentPackageBusiness = useSelector(state => state.business.paymentPackageBusiness)

  const { t } = useTranslation();
  const [citiesForAdvertisingArr, setCitiesForAdvertisingArr] = useState({ cities: [] })
  const [sum, setSum] = useState("");
  const [flagMsg, setFlagMsg] = useState(false);
  const [flagSelect, setFlagSelect] = useState(false);
  let arrCity = []

  let index = ""
  const { cities } = citiesForAdvertisingArr;

  useEffect(() => {
    if (Business.citiesForAdvertising !== undefined) {
      setCitiesForAdvertisingArr({
        ...citiesForAdvertisingArr,
        cities: [...Business.citiesForAdvertising]
      })
    }// eslint-disable-next-line
  }, [Business])

  useEffect(() => {
    let sumCategories = 0
    if (editBusiness !== "" && editBusiness.citiesForAdvertising !== undefined) {
      setCitiesForAdvertisingArr({
        ...citiesForAdvertisingArr,
        cities: [...editBusiness.citiesForAdvertising]
      })
    }
    if ((paymentPackageBusiness !== "" || editBusiness.paidUp !== "") && sum === "") {
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
  }, [currentUserDetails, paymentPackageBusiness])


  //add city to advertising
  function setArrCitiesForAdvertising() {
    arrCity = [...citiesForAdvertisingArr.cities]
    index = arrCity.findIndex(x => x === address)
    if (arrCity.length + 1 === sum) {
      setFlagSelect(true)
    }
    if (index !== -1) {
      setFlagMsg(true)
      if (arrCity.length < sum) {
        setFlagSelect(false)
      }
    }
    else {
      if (addressCity !== "") {
        setFlagMsg(false)
        arrCity.push(addressCity);
        setCitiesForAdvertisingArr({
          ...citiesForAdvertisingArr,
          cities: [...arrCity]
        })
        setBusiness({ ...Business, citiesForAdvertising: arrCity })

        dispatch(actions.setCitiesToAdvertise(arrCity))
      }
    }
  }
  //delete city from tha array
  const handleDelete = e => {
    let target = e.target.parentElement;
    let targetindex = target.dataset.imgindex * 1;
    setCitiesForAdvertisingArr({
      ...citiesForAdvertisingArr,
      cities: [...cities.slice(0, targetindex), ...cities.slice(targetindex + 1)]
    })
    if (arrCity.length < sum) {
      setFlagSelect(false)
    }
  }

  return (
    <>
      <div className="col-md-12">
        {currentUserDetails !== undefined ?
          <div className="row">
            <div className="col-md-12">
              <div className="notification success closeable margin-bottom-30">
                {/* <div className="d-flex justify-content-center" >
                  {paymentPackageBusiness !== "premium" ? <Link to="/pricing-business">
                    לשדרוג העסק שלך
                                </Link> : ""}
                </div> */}
                {/* <div className="d-flex justify-content-center" > */}
                {/* // */}
                {/* <div>  לפי חבילת התשלום שבחרת, באפשרותך לבחור {sum}   ערים בהם תרצה לפרסם את העסק.</div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
          : ""}
      </div>
      <FormGroup>
        <Row>
          <Col>
            <div >
              <Form.Label className="listing-lable">{t('location.cities-for-advertising')}
                {/* |<small className="note-size"> לפי חבילת התשלום שבחרת, באפשרותך לבחור {sum}   ערים בהם תרצה לפרסם את העסק.</small>*/}</Form.Label>
              <div id="autocomplete-container"  >
                <div>
                  {/* {editBusiness===""?"הכנס כתובת הכוללת עיר וארץ בלבד":""}   */}
                </div>

                {flagSelect === false ?
                  <AutoCompleteSearch flag={true} cNAuto="input-size" />
                  : ""
                }
                <div className="div-add-cities icon-add-cities" onClick={setArrCitiesForAdvertising}>
                  <Icon name="add" /></div>
              </div>
            </div> <br />
          </Col>
          <Col>

            {citiesForAdvertisingArr.cities.length > 0 ?
              <div className="d-flex">
                {citiesForAdvertisingArr.cities.map((city, i) => (
                  <div className="list-inline-item" key={i} data-imgindex={i}>
                    <div className="span-item" onClick={handleDelete}>×</div>
                    {city}
                  </div>
                ))}
              </div>
              : ""}
            {flagMsg === true ?
              <div>עיר זו נבחרה כבר </div>
              : ""}

          </Col>
        </Row>
      </FormGroup>
    </>
  );
}
(withRouter(CitiesToAdvertisingSection));