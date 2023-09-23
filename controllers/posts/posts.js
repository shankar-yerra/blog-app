const Post=require("../../models/post/Post");
const User=require("../../models/user/User");
const appErr=require("../../utils/appErr");

const createPostCtrl=async (req, res,next) => {
  const {title,description,category,user}=req.body;
  try {
    if(!title||!description||!category||!req.file)
    {
       return res.render("posts/addPost", { error: "All Fields are required" });
    }
    
    const userId=req.session.userAuth;
    const userFound=await User.findById(userId);
    
    const postCreated=await Post.create({
      title,
      description,
      category,
      user:userFound._id,
      image:req.file.path
    });
    
    userFound.posts.push(postCreated._id);
    
    await userFound.save();
    res.redirect("/");
  } catch (error) {
    return res.render("posts/addPost", { error: error.message });
  }
};


const fetchPostsCtrl=async (req, res,next) => {
  try {
    const posts=await Post.find().populate("comments").populate("user");
    res.json({
      status:"success",
      data:posts,
    })
  } catch (error) {
    next(appErr(error.message));
  }
};


const fetchSinglePostCtrl=async (req, res,next) => {
  try {
    
    const id=req.params.id;
   
    const post=await Post.findById(id).populate({
      path:"comments",
      populate:{
        path:"user"
      },
    }).populate("user");
     res.render("posts/postDetails", {
       post,
       error:"",
     });
  } catch (error) {
     return next(appErr("user Not found"));
  }
};


const deletePostCtrl=async (req, res,next) => {
  try {
    
    const post=await Post.findById(req.params.id);
    
    if(post.user.toString()!==req.session.userAuth.toString())
    {
      return res.render("posts/postDetails",{
        error:"You are not authorized to delete this post",
        post,
      })
    }
    
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    return res.render("posts/postDetails", {
      error: error.message,
      post,
    });
  }
};


const UpdatePostCtrl=async (req, res,next) => {
  const {title,description,category}=req.body;
  try {
  
    const post = await Post.findById(req.params.id);
  
    if (post.user.toString() !== req.session.userAuth.toString()) {
      return res.render("posts/updatePost",{
        post:"",
        error:"You are not authorized to update this Post"
      })
    }
    
    if(req.file)
    {
       const postUpdated = await Post.findByIdAndUpdate(
         req.params.id,
         {
           title,
           description,
           category,
           image: req.file.path,
         },
         {
           new: true,
         }
       );
    }
    else
    {
      const postUpdated = await Post.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          category,
        },
        {
          new: true,
        }
      );
    }
    res.redirect("/");
  } catch (error) {
    return res.render("posts/updatePost", {
      post: "",
      error: error.message,
    });
  }
};
module.exports = {
  createPostCtrl,
  fetchPostsCtrl,
  fetchSinglePostCtrl,
  deletePostCtrl,
  UpdatePostCtrl,
};