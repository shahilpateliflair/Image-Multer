const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/project-multer")
const postSchema = new mongoose.Schema({
    name: String,
    description: String,
  image:{
type:String
  },
  
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
