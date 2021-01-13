import { CLEAR_POST, POST_ERROR } from "../../../constants/postsConstants";

export const clearPost = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_POST });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};