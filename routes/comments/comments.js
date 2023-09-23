const express = require("express");
const {createCommentCtrl,commentDetailCtrl,deleteCommentCtrl,updateCommentCtrl}=require("../../controllers/comments/comments");
const protected=require("../../middlewares/protected");
const commentRoutes = express.Router();



commentRoutes.post("/:id", protected,createCommentCtrl);


commentRoutes.get("/:id", commentDetailCtrl);


commentRoutes.delete("/:id",protected,deleteCommentCtrl);


commentRoutes.put("/:id",protected,updateCommentCtrl);

module.exports=commentRoutes;