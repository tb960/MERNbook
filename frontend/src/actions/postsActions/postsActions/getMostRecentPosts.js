import {
    THE_MOST_RECENT_POSTS,
    POST_ERROR,
  } from "../../../constants/postsConstants";
  import axios from "axios";
  
  export const getMostRecentPosts = () => async (dispatch) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/posts/posts/the_most_recent"
      );
      dispatch({ type: THE_MOST_RECENT_POSTS, payload: res.data });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error,
      });
    }
  };