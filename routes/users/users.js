const express=require("express");
const multer=require("multer");
const storage=require("../../config/cloudinary");
const {
  registerCtrl,
  loginCtrl,
  userDetailsCtrl,
  profileCtrl,
  uploadProfilePhotoCtrl,
  uploadcoverimgCtrl,
  updatePasswordCtrl,
  updateUserCtrl,
  logoutCtrl,
} = require("../../controllers/users/users");
const protected=require("../../middlewares/protected");
const userRoutes=express.Router();


const upload=multer({storage});


userRoutes.get("/login",(req,res)=>{
  res.render("users/login", {
    error: "",
  });
})

userRoutes.get("/register",(req,res)=>{
  res.render("users/register",{
    error:"",
  });

})


userRoutes.get("/upload-profile-photo-form", (req, res) => {
  res.render("users/uploadProfilePhoto",{error:""});
});


userRoutes.get("/upload-cover-photo-form", (req, res) => {
  res.render("users/uploadCoverPhoto",{error:""});
});


userRoutes.get("/update-user-password", (req, res) => {
  res.render("users/updatePassword",{
    error:""
  });
});



userRoutes.post("/register", registerCtrl
);


userRoutes.post("/login",loginCtrl);

userRoutes.get("/profile-page",profileCtrl);


userRoutes.put("/profile-photo-upload/",protected,upload.single("profile"), uploadProfilePhotoCtrl);


userRoutes.put("/profile-cover-photo-upload/",protected,upload.single("profile"), uploadcoverimgCtrl);


userRoutes.put("/update-password/", updatePasswordCtrl);


userRoutes.put("/update", updateUserCtrl);


userRoutes.get("/logout", logoutCtrl);


userRoutes.get("/:id",userDetailsCtrl);


module.exports=userRoutes;