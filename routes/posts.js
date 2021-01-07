const express = require('express');
const router = express.Router();
const Post = require("../schemas/Post");
const authentication = require("../middleware/authentication");

router.get("/posts", async(req,res) =>{
    try {
        let posts = await Post.find();

        res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error");
    }
});

router.get("/posts/most_liked", async(req,res) =>{
    try {
        //We order from the most to the least liked, as default sort is assigned as 1, when you use -1 you basically reverse the order of array
        let posts = await Post.find().sort({ likes: -1 });
        res.json(posts);
      } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
      }
});

router.get("/posts/the_most_recent", async(req,res)=>{
    try {
        let posts = await Post.find().sort({ date: -1 });
        res.json(posts);
      } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
      }
});

router.get("/posts/the_most_commented", async(req,res) =>{
    try {
        let posts = await Post.find().sort({ comments: -1 });
        res.json(posts);
      } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
      }
});

router.get("/single_post/:post_id", async(req,res) =>{
    try {
        let posts = await Post.findById(req.params.post_id);
        res.json(posts);
      } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
      }
});

router.get("/user_posts/:user_id", async(req,res)=>{
    try {
        let posts = await Post.find({ user: req.params.user_id });
        res.json(posts);
      } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
      }
});

// router.get("/user_posts", authentication, getUserPostsByMiddleware);

// router.post("/", authentication, createPostValidator, createPost);

// router.put("/search_for_post", searchForPostValidator, searchForPost);

// router.put("/likes/:post_id", authentication, addLike);

// router.put(
//   "/add_comment/:post_id",
//   authentication,
//   addCommentValidator,
//   addComment
// );

// router.put("/like_comment/:post_id/:comment_id", authentication, likeComment);

// router.delete("/delete_post/:post_id", authentication, removePost);

// router.delete(
//   "/remove_like_from_post/:post_id/:like_id",
//   authentication,
//   removeLikeFromPost
// );

// router.delete(
//   "/remove_comment/:post_id/:comment_id",
//   authentication,
//   removeComment
// );

// router.delete(
//   "/remove_like_from_comment/:post_id/:comment_id/:like_id",
//   authentication,
//   removeLikeFromComment
// );



module.exports = router;