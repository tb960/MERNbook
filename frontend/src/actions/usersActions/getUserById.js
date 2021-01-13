import axios from "axios";
import { GET_USER_BY_ID, USER_ERROR } from "../../constants/usersConstants";

export const getUserById = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/users/get_user_by_id/${user_id}`
    );
    dispatch({ type: GET_USER_BY_ID, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};
