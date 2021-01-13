import axios from "axios";
import { USER_ERROR } from "../../constants/usersConstants";
import { SEARCH_BY_USERNAME } from "../../constants/authConstants";

export const searchByUsername = (userNameFromSearch) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ userNameFromSearch });
    const response = await axios.put(
      `http://localhost:5000/api/users/search_by_username`,
      body,
      config
    );
    dispatch({
      type: SEARCH_BY_USERNAME,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};
