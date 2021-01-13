import {
    CHANGE_PROFILE,
    CHANGE_USER_DATA_FAILED,
  } from "../../constants/authConstants";
  import axios from "axios";
  
  export const changeUserData = (changeUserData, userDataToChange) => async (
    dispatch
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ changeUserData });
      const response = await axios.put(
        `http://localhost:5000/api/users/change_user_data/${userDataToChange}`,
        body,
        config
      );
      dispatch({
        type: CHANGE_PROFILE,
        payload: response.data,
      });
      alert("Data has changed");
    } catch (error) {
      dispatch({
        type: CHANGE_USER_DATA_FAILED,
        payload: error,
      });
    }
  };