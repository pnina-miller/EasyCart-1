// import { Form, Col, Row, Card, Button, Container } from 'react-bootstrap';
// import React, { useState, useEffect, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import * as cloneDeep from "lodash/cloneDeep";
// import { useSelector } from "react-redux";
// import Moment from "moment";

// import Icon from "../utilities/Icon";

// import "bootstrap/dist/css/bootstrap.min.css";

// import "../../styles/addBusinessPage.css";

// function OpeningHoursSection(props) {

//   const { Business, setBusiness } = props;
//   const { t } = useTranslation();
//   const selectOpenRef = useRef();
//   const selectCloseRef = useRef();
//   const bgDays = useRef();
//   const editBusiness = useSelector((state) => state.business.editBusiness);
//   const [arrCheckedDays, setArrCheckedDays] = useState([]);
//   const [arrofHours, setArrofHours] = useState([{}]);
//   const [count, setCount] = useState(0);

//   let hoursarr = [];
//   let days = [];
//   let arrDays = [
//     t("opening-hours.sunday"),
//     t("opening-hours.monday"),
//     t("opening-hours.tuesday"),
//     t("opening-hours.wednesday"),
//     t("opening-hours.thursday"),
//     t("opening-hours.friday"),
//     t("opening-hours.saturday"),
//   ];

//   if (editBusiness !== "") {
//     if (editBusiness.opening_hours !== undefined) {
//       Object.keys(editBusiness.opening_hours).forEach((key) =>
//         hoursarr.push({ name: key, value: editBusiness.opening_hours[key] })
//       );
//     }
//   }

//   useEffect(() => {
//     if (editBusiness !== "") {
//       setBusiness({ ...Business, opening_hours: editBusiness.opening_hours });
//     }
//     // eslint-disable-next-line
//   }, [editBusiness]);

//   function FinishEditDay() {
//     arrCheckedDays.forEach((element) => {
//       bgDays.current.childNodes[element - 1].children[0].className = "vIconDayshow";
//       bgDays.current.childNodes[element - 1].className = "day-div";
//     })
//   }

//   function setHoursToDays() {
//     let arrOpeningHours;
//     arrOpeningHours = cloneDeep(Business.opening_hours);
//     arrCheckedDays.forEach((element) => {
//       arrofHours.forEach((element1) => {
//         arrOpeningHours[element].push(element1);
//       })
//     });
//     setCount(0);
//     setArrofHours([{}])
//     setArrCheckedDays([]);
//     FinishEditDay()
//     setBusiness({ ...Business, opening_hours: arrOpeningHours });
//   }

//   function setCheckedDays(index) {
//     days = [...arrCheckedDays];
//     days[count] = index + 1;
//     setCount(countm => count + 1);
//     setArrCheckedDays(d => days);

//     if (bgDays.current.childNodes[index].className === "day-div")
//       bgDays.current.childNodes[index].className = "day-div-checked"
//     else
//       bgDays.current.childNodes[index].className = "day-div"

//   }

//   function setHoursFunc(i, hour, state) {
//     let listHours;
//     listHours = cloneDeep(arrofHours);
//     if (state === "Open") {
//       listHours[i].start = (hour);
//     }
//     if (state === "Close") {
//       listHours[i].end = (hour);
//     }
//     setArrofHours(listHours);
//   }

//   return (

//     <Container fluid className='pl-5 pr-5'>
//       <Row>
//         <Col className=' mt-3 mb-1'>
//           <Card className="card-add-listing addBusinessCol addBusinessColHours">
//             <Card.Body className="body-add-listing">

//               <Card.Title className="basic-information">
//                 {t("opening-hours.opening-hours")}
//               </Card.Title>
//               <hr className="solid"></hr>
//               <div className="add-listing-headline">
//               </div>

//               <Row>
//                 <div className="submit-section d-flex flex-column justify-content-center align-items-center">
//                   <div ref={bgDays} className="row with-forms p-5 pt-3">
//                     {arrDays.map((days, i) => (
//                       <div key={i} id={i + 1} className="day-div" onClick={() => {
//                         setCheckedDays(i)
//                       }
//                       }>{days}
//                         <div className="vIconDaynone">
//                           <Icon name="vIconDay" ></Icon>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <Form.Group className="form-select-hours ">
//                     <Row className="d-flex justify-content-center mt-0">

//                       <Col>
//                         <div className="add-hour d-flex justify-content-center" onClick={() => {
//                           let arr = [...arrofHours]
//                           arr.push({ start: "", end: "" })
//                           setArrofHours(a => arr)
//                         }}>
//                           <Icon name="add" />
//                         </div>
//                       </Col>

//                     </Row>
//                     <Row>

//                       <Col
//                         className="d-flex justify-content-center"
//                       >
//                         <div className="open-text-in-opening-hours d-flex">
//                           Opens At
//                         </div>
//                       </Col>
//                       <Col
//                         className="d-flex justify-content-center"
//                       >
//                         <div className="open-text-in-opening-hours d-flex">
//                           Closes At
//                         </div>
//                       </Col>

//                     </Row>
//                     {arrofHours.map((item, i) => (
//                       <div>
//                         <Row className="d-flex justify-content-center mt-0">

//                           <Col>
//                             <Col>
//                               <select
//                                 className="w-select"
//                                 className="chosen-select form-control"
//                                 ref={selectOpenRef}
//                                 onChange={(e) => {
//                                   setHoursFunc(i, e.target.value, "Open")
//                                 }}
//                               >
//                                 {Array.from({ length: 24 }).map((_, index) => (
//                                   <option key={index}>{Moment(index, "HH:mm").format("HH:mm")}</option>
//                                 ))}
//                               </select>

//                             </Col>
//                           </Col>
//                           <Col>
//                             <Col >
//                               <select
//                                 ref={selectCloseRef}
//                                 className="w-select"
//                                 className="chosen-select form-control"
//                                 onChange={(e) => {
//                                   setHoursFunc(i, e.target.value, "Close")
//                                 }}
//                               >
//                                 {Array.from(arrofHours[i]?.start ? { length: 24 - (Number(arrofHours[i].start.split(":")[0])) } : { length: 24 }).map((_, index) => (
//                                   <option key={index + "i"} >{arrofHours[i]?.start ? Moment(index + Number(arrofHours[i]?.start.split(":")[0]), "HH:mm").format("HH:mm") : Moment(index, "HH:mm").format("HH:mm")}</option>
//                                 ))}
//                               </select>
//                             </Col>
//                           </Col>
//                         </Row>
//                       </div>))}
//                     <Row className="d-flex justify-content-center">
//                       <Button className="text-secondary bg-white  btn btn-outline-warning btn-open-hours col-md-4 col-sm-10 col-10"
//                         onClick={() => {
//                           arrCheckedDays.length > 0 ? setHoursToDays() : alert("Please choose days!!")
//                         }}
//                       >Save </Button>
//                     </Row>
//                   </Form.Group>
//                 </div>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default OpeningHoursSection;