import axios from "axios";
import { ADD_LIKE, POST_ERROR } from "../../../constants/postsConstants";
import { getPost } from "../postsActions/getPost";

export const addLikeToTopicPage = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/likes/${post_id}`
    );
    dispatch({ type: ADD_LIKE, payload: res.data });
    dispatch(getPost(post_id));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};