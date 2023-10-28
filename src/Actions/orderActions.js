import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../Constants/orderConstants";

//order
export const createOrder = (order) => async (disptch) => {
  try {
    disptch({
      type: CREATE_ORDER_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post("/api/v1/eats/orders/new", order, config);
    disptch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    disptch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//My order
export const myOrders = () => async (disptch) => {
  try {
    disptch({
      type: MY_ORDER_REQUEST,
    });

    const { data } = await axios.get(" /api/v1/eats/orders/me/myOrders");

    disptch({
      type: MY_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    disptch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/eats/orders/${id}`);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clear
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
