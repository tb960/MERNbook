import React, { useState } from "react";
import { checkPasswords } from "../actions/authActions/checkPasswords";
import { changePassword } from "../actions/authActions/changePassword";
import { connect } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import PasswordChangeMessage from "../components/PasswordChangeMessage";

const ChangePassword = ({
  auth: { errors, isAllowedToChangePassword },
  checkPasswords,
  changePassword,
}) => {
  let [isSubmitted, setIsSubmitted] = useState(false);
  let [areNotPasswordsFullfiled, setAreNotPasswordsFullfiled] = useState(false);
  let [arePasswordsWrong, setArePasswordsWrong] = useState(false);
  let [formData, setFormData] = useState({
    firstPassword: "",
    secondPassword: "",
    newPassword: "",
  });

  let { firstPassword, secondPassword, newPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitData = () => {
    if (firstPassword !== secondPassword) {
      setArePasswordsWrong(true);
      setAreNotPasswordsFullfiled(false);
    } else if (
      firstPassword === "" ||
      firstPassword === null ||
      secondPassword === "" ||
      secondPassword === null
    ) {
      setAreNotPasswordsFullfiled(true);
    } else {
      checkPasswords(firstPassword);
    }
  };

  return (
    <div className="change-profile-page-wrapper">
      {isAllowedToChangePassword === false && (
        <form className="change-profile-section">
          <div className="change-password-input-wrapper">
            <label className="change-password-label p__size font__p font__bold">
              Type actual password
            </label>
            <input
              className="change-password-input"
              placeholder="Type Something..."
              type="text"
              value={firstPassword}
              name="firstPassword"
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="change-password-input-wrapper">
            <label className="change-password-label p__size font__p font__bold">
              Type again password
            </label>
            <input
              className="change-password-input"
              placeholder="Type Something..."
              type="text"
              value={secondPassword}
              name="secondPassword"
              onChange={(e) => onChange(e)}
            />
          </div>

          {areNotPasswordsFullfiled && (
            <ErrorMessage errorMessage="You haven't fullfiled some input" />
          )}

          {arePasswordsWrong && (
            <ErrorMessage errorMessage="Passwords are wrong" />
          )}

          {errors === false && (errors !== {} || errors !== null) && (
            <ErrorMessage errorMessage="Something went wrong..." />
          )}
          <div className="password-page-button" onClick={(e) => submitData(e)}>
            Submit
          </div>
        </form>
      )}

      {isAllowedToChangePassword && (
        <form className="change-profile-section">
          <div className="change-password-input-wrapper">
            <label className="change-password-label p__size font__p font__bold">
              Type New Password
            </label>

            <input
              placeholder="Type New Password..."
              value={newPassword}
              name="newPassword"
              onChange={(e) => onChange(e)}
              type="text"
            />

            <div
              className="password-page-button"
              style={{
                marginTop: ".5em",
              }}
              onClick={() => {
                changePassword(newPassword);
                setIsSubmitted(true);
              }}
            >
              Submit
            </div>
          </div>
        </form>
      )}
      {isAllowedToChangePassword && errors && isSubmitted && (
        <PasswordChangeMessage message="Password hasn't changed, something went wrong..." />
      )}

      {isAllowedToChangePassword && !errors && isSubmitted && (
        <PasswordChangeMessage message="Password has changed" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { checkPasswords, changePassword })(
  ChangePassword
);
