import axios from "axios";
import { GET_POSTS, POST_ERROR } from "../../../constants/postsConstants";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/posts/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};