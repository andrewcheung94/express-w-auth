const router = require("express").Router();

const {
    SeedPostData,
    createPost,
    getPost,
    getPostById,
    updatePost,
    deletePost,
    getPostByUser,
    getPostBySubReddit,
} = require("../controllers/postController.js");

// /post/seed
router.get("/seed", SeedPostData);

// /post/add
router.post("/add", createPost);

// /post/posts
router.get("/posts", getPost);

// post/posts/u/:username
router.get("/posts/u/:username", getPostByUser);

// post/posts/r/:subReddit
router.get("/posts/r/:subReddit", getPostBySubReddit);

// /post/posts/:id
router.get("/posts/:id", getPostById);

// /post/update/:id
router.put("/update/:id", updatePost);

// /post/delete/:id
router.delete("/delete/:id", deletePost);

module.exports = router;
