import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { actions } from '../../redux/Action';
import Icon from '../utilities/Icon'


import '../../styles/businessPage/addReviews.css';
import { Form } from "react-bootstrap";


function AddReviews(props) {
  const { edit, editing ,businessId} = props
  const { t } = useTranslation();

  const userId = useSelector(state => state.user.currentUserDetails?._id);
  const dispatch = useDispatch()

  const recommendation = React.createRef();

  const addRecommendation = () => {
    if (recommendation.current.value !== "") {
      if (userId !== false) {
        axios({
          method: "post",
          url: "/recommendation/addRecommendations",
          data: {
            recommendationUser: recommendation.current.value,
            businessId: businessId,
            userId: userId,
          },
        })
          .then(async function (response) {
            recommendation.current.value = "";
            alert("The recommendation was successfully received")
            if (editing)
              await dispatch(actions.setEditBusinessRecommendation(response.data.recommendation));
            else
              await dispatch(actions.setBusinessRecommendation(response.data.recommendation));
          })
          .catch((err) => {
            alert("Error attempting to enter data");
            console.error(err);
          });
      } else {
        alert("Only a registered user can add a recommendation");
      }
    }
  }

  return (
    <>

      <div className="pt-5 pl-5 pb-5">
        <h5 className={edit === false ? "editTitle" : "font-weight-bold"}>{t("addComment.leave-reply")}</h5>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className={edit === false && 'editTitle'}> {t("addComment.email-published")}</Form.Label>
            <div className="w-100 wrapeerSend d-flex justify-content-end" onClick={(e) => addRecommendation()}> <Icon name='cursor'></Icon></div>
            <Form.Control
              disabled={edit === false ? true : false}
              type="email"
              placeholder={t("addComment.your-message")}
              as="textarea" rows={3}
              ref={recommendation}
              name="comment"
              id="comment"
              controlid="comment"
              onFocus={(e) => (e.currentTarget.placeholder = "")}
              onBlur={(e) => (e.currentTarget.placeholder = "Your Message")}
              className={edit === false ? "textareaEditing recomment-input" : "recomment-input"}
              required="required"

            />
          </Form.Group>
        </Form>
      </div>

    </>
  );
}

export default AddReviews;