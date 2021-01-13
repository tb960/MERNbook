import { SEARCH_TOPICS, POST_ERROR } from "../../constants/postsConstants";
import axios from "axios";

export const searchTopics = (searchInput) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ searchInput });
    const res = await axios.put(
      `http://localhost:5000/api/posts/search_for_post`,
      body,
      config
    );

    dispatch({ type: SEARCH_TOPICS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};