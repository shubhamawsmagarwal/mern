var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var articleSchema=new Schema({title:String,description:String,category:String,author:String,authorUsername:String});
var object={article:mongoose.model("article",articleSchema),articleSchema:articleSchema};
module.exports=object;