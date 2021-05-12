const Post = require("../model/Post");
const { postData } = require("../data/post");

// console.log(postData);

//seed
const SeedPostData = (req, res) => {
    Post.create(postData)
        .then((post) => res.status(200).json({ post }))
        .catch((err) => res.status(500).json({ Error: err }));
};

//create
const createPost = (req, res) => {
    let post = req.body;
    Post.create(post)
        .then((post) => res.status(200).json(post))
        .catch((err) => res.status(500).json({ Error: err.message }));
};

//read
const getPost = (req, res) => {
    Post.find().exec((err, docs) => {
        if (err)
            return res.status(500).json({
                message: `there was an error with out database: ${err}`,
            });
        if (docs.length === 0)
            return res.status(404).json({
                message: `there were no post found in the database.`,
            });
        return res.status(200).json(docs);
    });
};

// read by user (posts)
const getPostByUser = (req, res) => {
    const username = req.params.username;
    Post.find({ username: username })
        .then((posts) => res.status(200).json(posts))
        .catch((err) => res.status(404).json({ message: "no post found" }));
};

//read by subReddit
const getPostBySubReddit = (req, res) => {
    const subReddit = req.params.subReddit;
    console.log(subReddit);
    Post.find({ subReddit: subReddit })
        .then((posts) => res.status(200).json(posts))
        .catch((err) => res.status(404).json({ message: "no post found" }));
};

// read by id
const getPostById = (req, res) => {
    Post.findById(req.params.id).exec((err, post) => {
        if (!post)
            return res
                .status(404)
                .json({ message: "could not find a post with that id" });
        if (err)
            return res
                .status(500)
                .json({ message: "there was an error with our databse" });
        return res.status(200).json(post);
    });
};

// update
const updatePost = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndUpdate(
        req.params.id,
        { id, $set: req.body },
        { new: true },
        (err, post) => {
            if (err)
                return res.status(404).json({
                    message: `could not find a post with the id: ${id}`,
                });
            return res.json(post);
        }
    );
};

//delete
const deletePost = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndRemove(id, (err, post) => {
        if (err)
            return res
                .status(400)
                .json({ message: `could not find a post with id ${id}` });
        return res.status(200).json(post);
    });
};

module.exports = {
    SeedPostData,
    createPost,
    getPost,
    getPostById,
    updatePost,
    deletePost,
    getPostByUser,
    getPostBySubReddit,
};
