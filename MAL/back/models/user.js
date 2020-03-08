var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
var Schema=mongoose.Schema;
var articleSchema=require("./article.js").articleSchema;
var userSchema=new Schema({username:String,password:String,name:String,articles:[articleSchema]});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("user",userSchema);