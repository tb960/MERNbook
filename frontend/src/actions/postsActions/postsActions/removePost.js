import { REMOVE_POST, POST_ERROR } from "../../../constants/postsConstants";
import { getUserPosts } from "../../usersActions/getUserPosts.js";
import axios from "axios";

export const removePost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/posts/delete_post/${post_id}`
    );
    dispatch({ type: REMOVE_POST, payload: res.data });
    dispatch(getUserPosts());
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};