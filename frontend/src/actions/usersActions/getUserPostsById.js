import axios from "axios";
import {
  GET_POST_BY_USER_ID,
  USER_ERROR,
} from "../../constants/usersConstants";

export const getUserPostsById = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/posts/user_posts/${user_id}`
    );
    dispatch({ type: GET_POST_BY_USER_ID, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};
