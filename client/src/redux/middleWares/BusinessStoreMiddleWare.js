import axios from "axios";
import {
  CREATE_STORE,
  CREATE_PRODUCTS_STORE,
  CREATE_PRODUCT_CATEGORIES,
  GET_BUSINESS_STORE,
  GET_ALL_CATEGORIES,
  GET_ORDERS_BY_BUSINESS_KEY_WORDS,
  SET_ORDER_STATUS,
} from "../constants/businessStore";
import { actions } from "../Action";

export const createBusinessStore =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === CREATE_STORE) {
      axios({
        method: "post",
        url: "/store/createStore",
        data: {
          businessId: action.payload.businessId,
          // , delivery: action.payload.delivery
        },
      })
        .then(function (response) {
          
          if (action.payload.businessId) alert("creat store");

          dispatch(actions.setStoreId(response.data.business.storeId));
          dispatch(actions.setStoreIdToUserBusiness(response.data.business));

          action.payload = true;
        })
        .catch((err) => {
          alert("error");

          console.error("error on createBusinessStore", err);
        });
    }
    return next(action);
  };

export const getOrdersByBusinessKeyWords =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === GET_ORDERS_BY_BUSINESS_KEY_WORDS) {
      axios({
        method: "post",
        url: "/order/getOrdersByBusinessKeyWords",
        data: { keyWords: action.payload.keyWords },
      })
        .then(function (response) {
          dispatch(actions.setOrders(response.data));
        })
        .catch((err) => {
          console.error("error on getOrders", err);
        });
    }
    return next(action);
  };
/////
export const createProductsByStore =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    //check contact dont match to his value
    if (action.type === CREATE_PRODUCTS_STORE) {
      let products = action.payload;
      axios({
        method: "post",
        url: "/product/createproduct",
        data: { products: products },
      })
        .then(function (response) {
          action.payload = true;
          alert("createProduct sucsseful");
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return next(action);
  };

export const createProductCategory =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === CREATE_PRODUCT_CATEGORIES) {
      let { storeId, categories } = action.payload;
      axios({
        method: "post",
        url: `/productCategory/productCategory/${storeId}`,
        data: { categories: categories },
      })
        .then(function (response) {
          action.payload = true;
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return next(action);
  };

export const getBusinessStore =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === GET_BUSINESS_STORE) {
      let storeId = action.payload;
      axios({
        method: "post",
        url: "/store/getStore",
        data: { storeId: storeId },
      })
        .then(function (response) {
          action.payload = response.data;
          dispatch(actions.setBusinessStore(response.data.store));
        })
        .catch((err) => {
          dispatch(actions.setBusinessStore(undefined));
          console.error(err);
        });
    }
    return next(action);
  };

export const getAllCategories =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === GET_ALL_CATEGORIES) {
      const storeId = action.payload;
      axios({
        method: "post",
        url: "/productCategory/getCategoriesByStore",
        data: { storeId: storeId },
      })
        .then(function (response) {
          action.payload = response.data;
          dispatch(actions.setProductCategories(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return next(action);
  };

export const setOrderStatus =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === SET_ORDER_STATUS) {
      const { orderId, status } = action.payload;
      axios({
        method: "get",
        url: "/order/updateOrderStatus",
        data: {
          orderId: orderId,
          status: status,
        },
      })
        .then(function (response) {
          action.payload = response.data;
          dispatch(actions.setStatus(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return next(action);
  };
