import axios from "axios";
import {
  AUTH_FORM_SUCCESS,
  AUTH_FORM_FAIL,
} from "../../constants/authConstants";
import { userLoaded } from "../auth.actions/userLoaded";

export const loginUser = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(userData);

    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      body,
      config
    );

    dispatch({
      type: AUTH_FORM_SUCCESS,
      payload: response.data,
    });
    dispatch(userLoaded());
  } catch (error) {
    dispatch({
      type: AUTH_FORM_FAIL,
      payload: error,
    });
  }
};