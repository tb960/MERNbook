import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/usersActions/getUsers";
import UsersWrapper from "./Users/UsersWrapper";
import SearchUser from "./Users/SearchUser";

const Users = ({ getUsers, auth }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <SearchUser />
      <div className="users-wrapper">
        <UsersWrapper users={auth.users} key={auth._id} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUsers })(Users);
