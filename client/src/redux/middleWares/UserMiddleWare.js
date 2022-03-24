import axios from "axios";
import { actions } from "../Action";
import {
  EXTRACT_JWT,
  GET_USER_BY_USER_NAME,
  DELETE_BUSINESS_BY_ID,
  UPDATE_USER_PROFILE,
  GET_USER_DETAILS_BY_ID,
  UPDATE_BUSINESS,
  CHECK_USER_DETAILS,
  SAVE_ORDER,
  GET_CART,
  GET_ORDERS_BY_USER_ID,
} from "../constants/user";

export const extractJwt =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type === EXTRACT_JWT) {
      try {
        let url = new URL(document.location);
          let jwtKey = window.location.href.includes("dev") ? "devJwt" : "jwt";
        let jwtGlobal = url.searchParams.get("jwt");
        if (jwtGlobal) {
          let splitUrl = url.pathname.split("//");
          let userName = splitUrl[1] || "";
          let route = splitUrl[2] || "";
          let newUrl = url.origin + "/" + route;
          let date = new Date(Date.now() + 86400e3);
          date = date.toUTCString();
          let expires = "expires=" + date;
          localStorage.setItem("userName", userName);
          if (!document.cookie.split(";").filter((s) => s.includes(jwtKey))[0])
            document.cookie = `${jwtKey}=${jwtGlobal};${expires};domain=.dev.leader.codes;path=/`;
          const response = await axios({
            method: "post",
            url: "/user/create/" + userName,
            data: { jwt: jwtGlobal },
          });
          dispatch(actions.setCurrentUserDetails(response.data.user));
          window.location.replace(newUrl);
        }
      } catch (error) {
        console.error(error);
      }
    }
    return next(action);
  };

export const getUserByUserName =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type === GET_USER_BY_USER_NAME) {
      let userName = action.payload;
      axios
        .get(`/user/getDetailsByUserName/${userName}`)
        .then((response) => {
          dispatch(actions.setCurrentUserDetails(response.data.user));
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return next(action);
  };
export const getUserDetailsById =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === GET_USER_DETAILS_BY_ID) {
      let userId = action.payload;
      axios
        .get(`/user/getDetailsById/${userId}`)
        .then((response) => {
          dispatch(actions.setCurrentUserDetailsById(response.data.user));
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return next(action);
  };

//V
//check move to business middlware
export const deleteBussinessById =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === DELETE_BUSINESS_BY_ID) {
      let businessId = action.payload.businessId;
      axios({
        method: "delete",
        url: `/business/deleteBussinessById/${businessId}`,
      })
        .then((response) => {
          dispatch(actions.deleteBussinessById(response.data));
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return next(action);
  };

export const updateUserProfile =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === UPDATE_USER_PROFILE) {
      let user = action.payload;
      axios({
        method: "put",
        url: `/user/update/` + user._id,
        data: { newUser: user },
      })
        .then(function (response) {
          dispatch(actions.setUpdateUserProfile(response.data.user));
          alert("Your profile has been successfully updated !!!");
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return next(action);
  };

export const updateBusinessPerUser =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === UPDATE_BUSINESS) {
      let updateBusiness = action.payload.business;
      let businessId = action.payload.idBusiness;
      updateBusiness._id = businessId;

      return axios({
        method: "post",
        url: "/business/updateBusiness",
        data: {
          updateBusiness,
        },
      })
        .then(function (response) {
          dispatch(actions.setUpdateBussinesUser(response.data.business));
          alert("Business did update");
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return next(action);
  };

export const checkUserDetails =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === CHECK_USER_DETAILS) {
      let userName = action.payload;
      axios
        .get(`/user/getUserDetailsByUserName/${userName}`)
        .then((response) => {
          dispatch(actions.setCheckUser(response.data));
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return next(action);
  };

export const saveOrder =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === SAVE_ORDER) {
      const { cart, userId, orderMode } = action.payload;
      axios({
        method: "post",
        url: "/order/saveOrder",
        data: { order: cart, userId: userId, orderMode: orderMode },
      })
        .then(function (response) {
          action.payload = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return next(action);
  };
//check double code
export const getCart =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === GET_CART) {
      axios({
        method: "post",
        url: "/order/getCartUser",
        data: { userId: action.payload },
      })
        .then(function (response) {
          dispatch(actions.setCart(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (action.type === GET_ORDERS_BY_USER_ID) {
      axios({
        method: "post",
        url: "/order/getCartUser",
        data: { userId: action.payload },
      })
        .then(function (response) {
          dispatch(actions.setCart(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return next(action);
  };

export const getOrdersUserId =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === GET_ORDERS_BY_USER_ID) {
      axios({
        method: "post",
        url: "/order/getOrdersByUserId",
        data: { userId: action.payload.userId },
      })
        .then(function (response) {
          // action.payload = true;
          dispatch(actions.setUserOrders(response.data));
        })
        .catch((err) => {
          console.error("error on getOrders", err);
        });
    }
    return next(action);
  };
