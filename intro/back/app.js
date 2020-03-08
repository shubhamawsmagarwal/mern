var express=require("express");
var mongoose=require("mongoose");
var cors = require('cors');
var bodyParser=require("body-parser");
var data=require("./data");
var methodOverride=require("method-override");
mongoose.connect("mongodb://localhost/newsDatabase");
var app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true,useNewUrlParser:true}));
app.use(methodOverride("_method"));
app.get('/get',function(req,res){
    data.find(function(err,result){
        if (err) 
           return res.json({ success: false, error: err });
        return res.json({ success: true, data: result });
    });
});
app.put('/update',function(req,res){
    const id=req.body.id;
    const message=req.body.message;
    data.findOneAndUpdate({id:id},{$set:{message:message}},{new: true},function(err){
       if (err)
          return res.json({ success: false, error: err });
       return res.json({ success: true });
  });
});
app.delete('/delete',function(req,res){
    const id=req.body.id;
    data.deleteOne({id:id},function(err){
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
    });
});
app.post('/add',function(req,res){
    const id=req.body.id;
    const message=req.body.message;
    var newData=new data({
        id:id,
        message:message
    });
    newData.save(function(err,result){
       if (err)
          return res.json({ success: false, error: err });
       return res.json({ success: true,data: result });
    });
});
app.listen(3001,process.env.IP,function(res,req){
    console.log("Server is running");
});