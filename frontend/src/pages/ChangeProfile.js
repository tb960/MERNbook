import React, { useState } from "react";
import { connect } from "react-redux";
import { changeUserData } from "../actions/authActions/changeUserData";
import ErrorMessage from "../components/ErrorMessage";

const ChangeProfile = ({ changeUserData, posts: { errors } }) => {
  let [dataType, setDataType] = useState("");
  let [newUserData, setNewUserData] = useState("");
  let [isTextError, setIsTextError] = useState(false);

  const onChange = (dataToChange) => setDataType(dataToChange);

  const resetSentData = () => {
    setDataType("");
  };

  const sendData = () => {
    if (newUserData === "" || newUserData === null) return setIsTextError(true);
    changeUserData(newUserData, dataType);
    setNewUserData("");
    setDataType("");
  };

  return (
    <div className="change-profile-page-wrapper">
      {dataType === "" ? (
        <form className="change-profile-section">
          <div className="input-wrapper" onClick={() => onChange("userName")}>
            <p className="font__bold p__size font__p">Change Username</p>
          </div>

          <div className="input-wrapper" onClick={() => onChange("name")}>
            <p className="font__bold p__size font__p">Change name</p>
          </div>

          <div className="input-wrapper" onClick={() => onChange("lastName")}>
            <p className="font__bold p__size font__p">Change last name</p>
          </div>
        </form>
      ) : (
        <form className="change-profile-section">
          <p className="font__bold font__p p__size">Add new {dataType}</p>
          <input
            onChange={(e) => {
              setNewUserData(e.target.value);
            }}
            type="text"
            placeholder="Type something..."
            className="change-profile-input"
          />

          {errors && isTextError && (
            <ErrorMessage errorMessage="Something went wrong..." />
          )}

          <div className="change-profile-buttons-wrapper">
            <div className="change-profile-btn" onClick={() => sendData()}>
              Submit
            </div>

            <div className="change-profile-btn" onClick={() => resetSentData()}>
              Go back
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { changeUserData })(ChangeProfile);
