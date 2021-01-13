import axios from "axios";
import { ADD_LIKE, POST_ERROR } from "../../../constants/postsConstants";
import { getPosts } from "../postsActions/getPosts";
import { getMostRecentPosts } from "../postsActions/getMostRecentPosts";
import { getMostCommentedPosts } from "../postsActions/getMostCommentedPosts";
import { getMostLikedPosts } from "../postsActions/getMostLikedPosts";

export const addLikeToPost = (
  post_id,
  isOldest,
  isMostRecent,
  isMostCommented,
  isMostLiked
) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/likes/${post_id}`
    );
    dispatch({ type: ADD_LIKE, payload: res.data });

    if (isOldest) {
      dispatch(getPosts());
    } else if (isMostRecent) {
      dispatch(getMostRecentPosts());
    } else if (isMostCommented) {
      dispatch(getMostCommentedPosts());
    } else if (isMostLiked) {
      dispatch(getMostLikedPosts());
    }
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};