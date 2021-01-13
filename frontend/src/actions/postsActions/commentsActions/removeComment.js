
import axios from "axios";
import { REMOVE_COMMENT, POST_ERROR } from "../../constants/posts.constants";

export const removeComment = (post_id, comment_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/posts/remove_comment/${post_id}/${comment_id}`
    );
    dispatch({ type: REMOVE_COMMENT, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};