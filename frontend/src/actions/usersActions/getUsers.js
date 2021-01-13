import { GET_USERS, USER_ERROR } from "../../constants/usersConstants";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/users/users`);
    dispatch({ type: GET_USERS, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};
