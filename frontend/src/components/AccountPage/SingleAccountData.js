import React from "react";

const SingleAccountData = ({ dataName, dataToShow }) => {
  return (
    <div className="font__p data-item">
      <p style={{ marginRight: ".4em" }} className="font__bold">
        {dataName}
      </p>{" "}
      {dataToShow}
    </div>
  );
};

export default SingleAccountData;