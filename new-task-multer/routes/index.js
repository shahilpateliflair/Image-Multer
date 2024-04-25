var express = require('express');
var router = express.Router();
const postModel = require("./images");
const baseURL = "http://localhost:3000"; 
const upload = require("./multer");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/upload", upload.single("file"), async function (req, res, next) {
  try {
    if (!req.file) {
      return res.status(404).send("no file founded");
    }
    const { name, description } = req.body; 
    const { filename } = req.file; 
    const imagePath = '/images/uploads/' + filename; 
    const post = await postModel.create({
      name,
      description,
      image: imagePath 
    });
res.redirect('/posts')
  } catch (error) {
    console.error("Error in /upload:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/posts", async function (req, res, next) {
  try {
    const posts = await postModel.find();
    posts.forEach(post => {
      post.image = baseURL + post.image; 
    });
    res.render("posts", { posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/posts/:postId", async function (req, res, next) {
  try {
    const postId = req.params.postId;
    const deletedPost = await postModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;



