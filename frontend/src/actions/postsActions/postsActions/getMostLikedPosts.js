import {
    MOST_LIKED_POSTS,
    POST_ERROR,
  } from "../../../constants/postsConstants";
  import axios from "axios";
  
  export const getMostLikedPosts = () => async (dispatch) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/posts/posts/most_liked"
      );
      dispatch({ type: MOST_LIKED_POSTS, payload: res.data });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error,
      });
    }
  };