import {
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_FAIL,
  } from "../../constants/authConstants";
  import axios from "axios";
  import { userLoaded } from "./userLoaded";
  
  export const changePassword = (newPassword) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ newPassword });
      const res = await axios.put(
        "http://localhost:5000/api/users/change_user_password",
        body,
        config
      );
      dispatch({
        type: CHANGE_PASSWORD,
        payload: res.data,
      });
      dispatch(userLoaded());
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: error,
      });
    }
  };