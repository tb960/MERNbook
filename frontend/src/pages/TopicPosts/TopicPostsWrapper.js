import React from "react";
import TopicPost from "./TopicPost";

const TopicPostsWrapper = ({
  isTheOldest,
  isTheMostCommented,
  isTheMostRecent,
  isTheMostLiked,
  posts,
}) =>
  posts !== null &&
  posts.length > 0 &&
  posts.map((post) => (
    <TopicPost
      isTheOldest={isTheOldest}
      isTheMostCommented={isTheMostCommented}
      isTheMostRecent={isTheMostRecent}
      isTheMostLiked={isTheMostLiked}
      post={post}
      key={post._id}
    />
  ));

export default TopicPostsWrapper;
