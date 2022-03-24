import axios from "axios";
import { actions } from "../Action";
import {
  CREATE_BUSINESS_PER_USER,
  GET_BUSINESS_BY_KEY_WORD,
  SEND_MAIL_TO_CONTACT,
  SEND_SMS_TO_CONTACT,
  ADD_CLICK_TO_BUSINESS,
  ADD_USER_GALERY_OF_BUSINESS,
  CHECK_KEY_WORDS,
  ALL_NAMES_OF_BUSINESSES,
  GET_PROMOTED_BUSINESSES,
  DELETE_FAVORAITS,
  GET_ALL_FAVORAITS,
  ADD_FAVORITES_TO_BUSINESS,
  GET_BUSINESS_RECOMMENDATIONS,
} from "../constants/business";

export const createBusiness =
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {
        if (action.type === CREATE_BUSINESS_PER_USER) {

          let business = action.payload.business;

          let citiesForAdvertising = action.payload.citiesToAdvertise;
          axios({
            method: "post",
            url: "/business/createBusinessPerUser",
            data: {
              business,
              citiesForAdvertising,
            },
          })
            .then(function (response) {
              dispatch(actions.setBusiness(response.data.business._id))
              dispatch(actions.setUserBusiness(response.data.business))
              alert("createBusinessPerUser");
            })
            .catch((err) => {
              alert("error", err)
              console.error(err);
            });
        }
        return next(action);
      };

export const getBusinessByKeyword =
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {
        if (action.type === GET_BUSINESS_BY_KEY_WORD) {
          let keyWord = action.payload.keyWord;
          axios
            .get(`/business/getBusinessByKeyWord/${keyWord}`)
            .then((response) => {
              if (action.payload.funcName === "Edit") {
                dispatch(actions.setUpdateBusinessByKeyWord(response.data));
              }
              else {
                dispatch(actions.setBusinessByKeyWord(response.data));
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
        return next(action);
      };

export const sendMail =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === SEND_MAIL_TO_CONTACT) {
      let contact = action.payload;
      axios({
        method: "post",
        url: "/contact/mail",
        data: { contact: contact },
      })
        .then(function (response) {
          alert("messege sent");
          dispatch(actions.setSentMail(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return next(action);
  };

export const sendSms =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === SEND_SMS_TO_CONTACT) {
      let contact = action.payload;
      axios({
        method: "post",
        url: "/contact/sms",
        data: { contact: contact },
      })
        .then(function (response) {
          dispatch(actions.setSentSms(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return next(action);
  };

export const addClickToBusiness = ({ dispatch, getState }) => next => action => {
  if (action.type === ADD_CLICK_TO_BUSINESS) {
    let businessId = action.payload
    axios.get(`/business/addClicksToBusiness/${businessId}`).then(response => {
      dispatch(actions.setClickTobusiness(response.data.business))
    }).catch(o => {
      console.error(o);
    });
  }
  return next(action);
}

export const addFavoraitsToBusiness =
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {
        if (action.type === ADD_FAVORITES_TO_BUSINESS) {
          let businessId = action.payload.businessId;
          let idUser = action.payload.idUser;
          axios({
            method: "post",
            url: "/business/addFavoraitsToBusiness",
            data: {
              businessId: businessId,
              idUser: idUser,
            },
          })
            .then(function (response) {
              if (action.payload.setBusiness) {
                action.payload.setBusiness(response.data.business)
              }
              dispatch(actions.setFavoritesUser(response.data.business));
            })
            .catch((err) => {
              console.error(err);
            });
        }
        return next(action);
      };

export const getAllFavoraits =
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {

        if (action.type === GET_ALL_FAVORAITS) {
          let idUser = action.payload;
          axios({
            method: "get",
            url: `/business/getAllFavoraitsPerUser/${idUser}`,
          })
            .then(function (response) {
              dispatch(actions.setAllFavoraits(response.data.favorites));
            })
            .catch((err) => {
              console.error(err);
            });
        }
        return next(action);
      };

export const deleteFavoraitsByBussinessId =
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {

        if (action.type === DELETE_FAVORAITS) {
          let idUser = action.payload.userId;
          let Bid = action.payload.businessId;
          axios({
            method: "post",
            url: `/business/deleteFavoraitsByBusinessId/${idUser}/${Bid}`,
          })
            .then((response) => {
              if( action.payload.setBusiness){
              action.payload.setBusiness(response.data.business)}
              dispatch(
                actions.setDeleteFavoritsByBussinesId(response.data.business)
              );
              dispatch(actions.setDeleteFavoritsUser(response.data.business));
            })
            .catch((error) => {
              console.error(error);
            });
        }
        return next(action);
      };

export const getPromotedBusinesses =
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {
        if (action.type === GET_PROMOTED_BUSINESSES) {
          axios
            .get("/business/promotedbusiness")
            .then((response) => {
              dispatch(actions.setPromotedBusinesses(response.data));
            })
            .catch((error) => {
              console.error(error);
            });
        }
        return next(action);
      };

export const getAllNamesOfBusinesses =
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {

        if (action.type === ALL_NAMES_OF_BUSINESSES) {
          axios
            .get("/business/getAllBusinessName")
            .then((response) => {
              dispatch(actions.setAllNamesOfBusinesses(response.data));
            })
            .catch((error) => {
              console.error(error);
            });
        }
        return next(action);
      };

export const checkKeyWordsOfBusinesses =
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {

        if (action.type === CHECK_KEY_WORDS) {
          let keyWords = action.payload;
          return axios({
            method: "post",
            url: "/business/checkKeyWords",
            data: {
              keyWords: keyWords,
            },
          })
            .then(function (response) {
              dispatch(
                actions.setcheckedKeyWordsOfBusinesses(response.data.result)
              );
            })
            .catch((err) => {
              console.error(err);
            });
        }
        return next(action);
      };
export const addUsersGaleryOfBusiness =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === ADD_USER_GALERY_OF_BUSINESS) {
      let usersgalery = action.payload.galery;
      let businessId = action.payload.businessId;
      axios({
        method: "post",
        url: "/business/addUsersGaleryOfBusiness",
        data: { usersgalery: usersgalery, businessId: businessId },
      })
        .then(function (response) {
          dispatch(actions.setUsersGaleryOfBusiness(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return next(action);
  };

export const getBusinessRecommendations = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === GET_BUSINESS_RECOMMENDATIONS) {
    const { businessId, numResults, mode } = action.payload
    axios({
      method: "post",
      url: "/recommendation/getRecommendationByBusiness",
      data: { businessId: businessId, numResults: numResults },
    })
      .then(function (response) {
        action.payload = response.data
        if (mode === "Business")
          dispatch(actions.setBusinessRecommendation(response.data));
        if (mode === "Edit")
          dispatch(actions.setEditBusinessRecommendation(response.data));
      })
        .then(function (response) {
          action.payload = response.data;
          if (mode === "Business")
            dispatch(actions.setBusinessRecommendation(response.data));
          if (mode === "Edit")
            dispatch(actions.setEditBusinessRecommendation(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return next(action);
  };
