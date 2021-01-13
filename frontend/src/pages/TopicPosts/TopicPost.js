import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { addLikeToPost } from "../../actions/postsActions/likesActions/addLikeToPost";
import { removeLikeFromTopicPost } from "../../actions/postsActions/likesActions/removeLikeFromTopicPost";

const TopicPost = ({
  isTheOldest,
  isTheMostCommented,
  isTheMostRecent,
  isTheMostLiked,
  post,
  removeLikeFromTopicPost,
  addLikeToPost,
  auth,
}) => {
  return (
    <div className="topic-wrapper">
      <div className="topic-date">
        <Moment format="HH:mm YYYY-MM-DD">{post.date}</Moment>
      </div>

      <div className="topic-user">
        <img src={post.avatar} className="topic-avatar" alt="" />
        <p className="font__p p__size">{post.name}</p>
      </div>

      <div className="topic-section">
        <p>{post.textOfThePost}</p>
        <div className="topic-section-links">
          <div className="like-section" style={{ color: "rgb(42, 9, 9)" }}>
            <div
              className="font__p font__bold p__size like-item"
              onClick={() => {
                if (post.likes.find((like) => like.user === auth.user._id)) {
                  post.likes.find((like) =>
                    removeLikeFromTopicPost(
                      post._id,
                      like._id,
                      isTheOldest,
                      isTheMostRecent,
                      isTheMostCommented,
                      isTheMostLiked
                    )
                  );
                } else {
                  addLikeToPost(
                    post._id,
                    isTheOldest,
                    isTheMostRecent,
                    isTheMostCommented,
                    isTheMostLiked
                  );
                }
              }}
            >
              <i
                className={
                  post.likes.find((like) => like.user === auth.user._id)
                    ? "fas fa-thumbs-up"
                    : "far fa-thumbs-up"
                }
              ></i>
            </div>

            <div className="font__p font__bold p__size likes-length-item">
              {post.likes.length}
            </div>
          </div>

          <div className="topic-comment-section font__p font__bold p__size">
            <i className="far fa-comment"></i>
            {post.comments.length}
          </div>

          <div className="link-to-post-page-button app_color_background font__p font__bold p__size">
            <Link to={`/topics/topic/${post._id}`}>View more</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  addLikeToPost,
  removeLikeFromTopicPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicPost);
