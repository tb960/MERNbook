import React from "react";
import { connect } from "react-redux";
import { createPost } from "../actions/postsActions/postsActions/createPost";
import { clearPost } from "../actions/postsActions/postsActions/clearPost";
import CreatePost from "../components/AddPost/CreatePost";
import Output from "../components/AddPost/Output";

const AddPost = ({ clearPost, createPost, posts: { post } }) => {
  setTimeout(() => {
    clearPost();
  }, 5000);

  return (
    <div className="make-post-wrapper">
      {post === null ? (
        <CreatePost createPost={createPost} />
      ) : (
        <Output clearPost={clearPost} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = {
  createPost,
  clearPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
