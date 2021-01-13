import {
    CHECK_PASSWORDS,
    CHANGE_PASSWORD_FAIL,
  } from "../../constants/authConstants";
  import axios from "axios";
  
  export const checkPasswords = (passwordToCheck) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ passwordToCheck });
      const res = await axios.put(
        "http://localhost:5000/api/users/check_acutal_password",
        body,
        config
      );
      dispatch({
        type: CHECK_PASSWORDS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: error,
      });
    }
  };