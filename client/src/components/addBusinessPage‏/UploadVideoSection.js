import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row,Button, Col, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../../styles/businessPage/uploadVideo.css";
import '../../styles/addBusinessPage.css';


const UploadVideo = (props) => {
  const {businessId}=props
  const currentUser = useSelector(state => state.user.currentUserDetails);
  const { myGalery } = props;
  const location = useLocation();
  const url = React.createRef();
  // const businessId = useSelector(
  //   (state) => state.business.CheckedBusinessDetails._id
  // );
  const editBusinessId = useSelector(
    (state) => state.business.editBusiness._id
  );
  function sendUrl() {
    if (location.pathname.includes("/update") || location.pathname === "/add") {
      myGalery(url.current.value);
      var matches = url.current.value.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
      if (matches) {
        axios({
          method: "post",
          url: "/business/linkToVideo",
          data: {
            linkToVideo: url.current.value,
            businessId: editBusinessId,
          },
        })
          .then(function (response) {
            url.current.value = "";
            return response.data;
          })
          .catch((err) => {
            console.error("Error attempting to enter data");
          });
      }
    } else {
       matches = url.current.value.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
      if (matches) {
        axios({
          method: "post",
          url: "/business/userLinkVideo",
          data: {
            usersVideolink: url.current.value,
            businessId: businessId,
          },
        })
          .then(function (response) {
            url.current.value = "";
            return response.data;
          })
          .catch((err) => {
            console.error('error on upload video section',err)
          });
      }
    }
    //     return (
    //       <>
    //         <Col xs={5} md={3}>
    //           <input placeholder='Insert a link to the video' className='w-100 form-control h-100' ref={url} type="text" onChange={myGalery}></input>
    //         </Col>
    //         <Col xs={5} md={3}>
    //           <Button className="serch w-100" variant="outline-warning" onClick={() => {
    //             currentUser !== null ? sendUrl() : alert("Only a registered user can add image")
    //           }}
    //           >Add video</Button>
    //         </Col>

    //       </>
    //     )
    //   }
    // }
    // export default UploadVideo
  }
  return (
    <>
   
   <Row>
        <Col >
        {/* <h1>add video</h1> */}
          <Form.Control className="listing-control input-size mt-link"
            placeholder="Insert a link to the video"
            onFocus={(e) => e.currentTarget.placeholder = ''}
            onBlur={(e) => e.currentTarget.placeholder = "Insert a link to the video"}
            // className="w-100 form-control h-100"
            ref={url}
            type="text"
            onChange={myGalery}
          />
          {/* <input
        ></input> */}
        </Col>
      </Row>
      <Row>
        <Col xs={5} md={3}>
          <Button variant="outline-warning outline-primary"
          className="btn-preview btn-add-business btn-link"
            onClick={() => {
              currentUser !== null
                ? sendUrl()
                : alert("Only a registered user can add image");
            }}
          >
            Add video
        </Button>
        </Col>
      </Row>‏
    </>
  );
};
export default UploadVideo;
