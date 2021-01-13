import { LOG_OUT } from "../../constants/authConstants";

export const logOut = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};