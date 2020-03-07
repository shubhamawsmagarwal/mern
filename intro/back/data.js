var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var dataSchema=new Schema({id:Number,message:String});
module.exports=mongoose.model("data",dataSchema);