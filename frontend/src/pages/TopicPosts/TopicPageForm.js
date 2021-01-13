import React, { useState } from "react";

const TopicPageForm = ({ auth, createComment, post }) => {
  let [textOfTheComment, setTextOfTheComment] = useState("");

  const onChange = (e) => setTextOfTheComment(e.target.value);
  return (
    <form
      className="search-topic-wrapper"
      style={{ display: auth.isLoggedIn ? "block" : "none" }}
    >
      <p
        className="app_color_font font__bold font__p topics-headline"
        style={{ textAlign: "center" }}
      >
        Create Post
      </p>

      <textarea
        value={textOfTheComment}
        onChange={(e) => onChange(e)}
        type="text"
      />

      <div
        className="topic-search-button app_color_background font__p font__bold"
        onClick={() => {
          createComment(textOfTheComment, post._id);
          setTextOfTheComment("");
        }}
      >
        Add comment
      </div>
    </form>
  );
};

export default TopicPageForm;
