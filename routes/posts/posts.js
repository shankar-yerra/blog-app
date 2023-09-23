const express=require("express");
const multer=require("multer");
const storage=require("../../config/cloudinary");
const Post=require("../../models/post/Post");
const {
  createPostCtrl,
  fetchPostsCtrl,
  fetchSinglePostCtrl,
  deletePostCtrl,
  UpdatePostCtrl,
}=require("../../controllers/posts/posts");

const postRoutes=express.Router();
const protected=require("../../middlewares/protected");


const upload=multer({
  storage,
})


postRoutes.get("/get-post-form",(req,res)=>{
  res.render("posts/addPost",{error:""});
})

postRoutes.get("/get-form-update/:id",async(req,res)=>{
  try{
    const post=await Post.findById(req.params.id);
    res.render("posts/updatePost",{post,error:""})
  }
  catch(error)
  {
     res.render("posts/updatePost",{error,post:""});
  }
})


postRoutes.post("/",protected,upload.single("file"),createPostCtrl);



postRoutes.get("/",fetchPostsCtrl );


postRoutes.get("/:id",fetchSinglePostCtrl );


postRoutes.delete("/:id",protected, deletePostCtrl);


postRoutes.put("/:id",protected,upload.single("file"),UpdatePostCtrl);

module.exports=postRoutes;
