import { MAKE_POST, POST_ERROR } from "../../../constants/postsConstants";
import axios from "axios";

export const createPost = (textOfThePost) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ textOfThePost });
    const res = await axios.post(
      `http://localhost:5000/api/posts`,
      body,
      config
    );

    dispatch({ type: MAKE_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};