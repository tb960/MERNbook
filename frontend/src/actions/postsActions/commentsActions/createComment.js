import { ADD_COMMENT, POST_ERROR } from "../../../constants/postsConstants";
import axios from "axios";
import { getPost } from "../posts.actions/getPost";

export const createComment = (textOfTheComment, post_id) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ textOfTheComment });
    const res = await axios.put(
      `http://localhost:5000/api/posts/add_comment/${post_id}`,
      body,
      config
    );

    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(getPost(post_id));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};