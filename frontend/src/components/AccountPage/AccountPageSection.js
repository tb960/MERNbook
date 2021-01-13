import React from "react";
import SingleAccountData from "./SingleAccountData";

const AccountPageSection = ({ name, lastName, userName, email }) => {
  return (
    <div className="data-items">
      <SingleAccountData dataName="Name:" dataToShow={name} />

      <SingleAccountData dataName="Last Name:" dataToShow={lastName} />

      <SingleAccountData dataName="Username:" dataToShow={userName} />

      <SingleAccountData dataName="E-mail:" dataToShow={email} />
    </div>
  );
};

export default AccountPageSection;