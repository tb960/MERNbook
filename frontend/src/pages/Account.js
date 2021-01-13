import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserPosts } from "../actions/usersActions/getUserPosts";
import UserPostsWrapper from "./UserPosts/UserPostsWrapper";
import AccountPageSection from "../components/AccountPage/AccountPageSection";

const Account = ({
  getUserPosts,
  auth: { name, lastName, userName, avatar, email },
  users: { profilePosts },
}) => {
  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <div className="account-page-wrapper">
      <div className="data">
        <img src={avatar} alt="" />

        <AccountPageSection
          name={name}
          lastName={lastName}
          email={email}
          userName={userName}
        />
      </div>

      <div className="user-posts">
        <header className="user-posts-header-wrapper app_color_background">
          {profilePosts !== null || profilePosts !== [] ? (
            <p className="user-posts-header font__p font__bold">Your topics</p>
          ) : (
            <p className="user-posts-header font__p font__bold">
              You haven't made any posts yet
            </p>
          )}
        </header>
        <UserPostsWrapper posts={profilePosts} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, { getUserPosts })(Account);
