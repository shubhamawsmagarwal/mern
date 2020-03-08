/********* Requiring packages and using them ********/
const dirName=__dirname;
var express=require("express");
var mongoose=require("mongoose");
var passport=require("passport");
var bodyParser=require("body-parser");
var localStrategy=require("passport-local").Strategy;
var passportLocalMongoose=require("passport-local-mongoose");
const request=require('request');
var user=require("./models/user");
var article=require("./models/article").article;
//var methodOverride=require("method-override");
var expressSanitizer=require("express-sanitizer");
mongoose.connect("mongodb://localhost/newsDatabase");
var app=express();
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true,useNewUrlParser:true}));
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(require("express-session")({
    secret:"hope is a good thing",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   next();
});
//app.use(methodOverride("_method"));
app.use(expressSanitizer());
var refrehFlag=true;

/****** Importing dataStructure   ******/
const NewsChain=require('./models/newsChain');
const newsChainInstance=new NewsChain();

/********** get routes  *********/
app.get("/",needRefresh,function(req,res){
    var innerHTML="";
    if(req.isAuthenticated())
       innerHTML='<a class="btn btn-success basicButtons" href="/logout">Logout</a><a class="btn btn-lg text-info basicButtons " href="/login">'+req.user.username+'</a><a class="btn btn-lg btn-danger basicButtons" href="/refresh">Refresh</a>';
    else
       innerHTML='<a class="btn btn-info btn-lg basicButtons" href="/login">Login</a><a class="btn btn-info btn-lg basicButtons" href="/register">Register</a><a class="btn btn-lg btn-danger basicButtons" href="/refresh">Refresh</a>';
    res.render('home',{innerHTML:innerHTML,newsChain:newsChainInstance.chain});
});
app.get("/register",isLoggedIn,function(req,res){
    res.render('register');
});
app.get("/login",isLoggedIn,function(req,res){
    res.render('login');
});
app.get("/user",function(req,res){
    if(req.isAuthenticated())
    res.render('user',{articles:req.user.articles});
    else
       res.redirect("/");
});
app.get("/logout",function(req,res){
    if(req.isAuthenticated()){
       req.logout();
    }
    res.redirect("/");
});
app.get("/refresh",function(req,res){
    newsChainInstance.emptyChain();
    request('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=055ce427019446579aec6aa539666c46',function(error,response,body){
        if(!error && response.statusCode==200){
            const result=JSON.parse(body);
            const newsChain=result["articles"];
            newsChain.forEach(article=>{
               getCategory(article); 
            });
            res.redirect("/");
        }
    });
});
app.get("*",function(req,res){
    res.send("Error 404 not found");
});


/********* post routes  ******************/
app.post("/login",passport.authenticate("local",{
  successRedirect:"/login",
  failureRedirect:"/login"
}),function(req,res){
});
app.post("/register",function(req,res){
    var newUser=new user({
    username:req.sanitize(req.body.username),
    name:req.sanitize(req.body.name)
    });
    user.register(newUser,req.body.password,function(err,User){
        if(err){
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/register");
        });        
    });
});
app.post("/contribute",function(req,res){
    const description= req.sanitize(req.body.title)+" "+req.sanitize(req.body.description);
    const category = req.sanitize(req.body.category);
    postCategory(description,category);
    var newArticle=new article({
    title:req.sanitize(req.body.title),
    description:req.sanitize(req.body.description),
    category:req.sanitize(req.body.category),
    author:req.user.name,
    authorUsername:req.user.username
    });
    newArticle.save(function(err,art){
        if(err)
            console.log(err);
        else{
            req.user.articles.unshift(art);
            req.user.save();
        }
    });
    res.redirect("/user");
});
app.post("/check",function(req,res){
    user.find({username:req.body.username},function(err,result){
       if(!err){
          if(Array.isArray(result))
          var count=result.length;
          if(count>=1)
             res.send("true");
          else
             res.send("false");
        }
    });
});



/********* ML scripts ************/
function getCategory(article){
    const spawn=require('child_process').spawnSync;
    const description=article["title"]+" "+article["description"];
    const newProcess=spawn('python',['./ml/getCategory.py',description,dirName]);
    var category=newProcess.stdout.toString().trim();
    newsChainInstance.createNewArticle(article["author"],article["title"],article["description"],category);
}
function postCategory(description,category){
    const spawn=require('child_process').spawnSync;
    const newProcess=spawn('python',['./ml/postCategory.py',description,category,dirName]);
    var result=newProcess.stdout.toString().trim();
    console.log("Successfully inserted row exit code "+result);
}

/**************** Middleware *************/
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
        res.redirect("/user");
    else
       return next();
    
}
function needRefresh(req,res,next){
    if(refrehFlag){
        refrehFlag=!refrehFlag;
        res.redirect("/refresh");
    }
    else
       return next();
       
}
/******** Listening *************/
app.listen(3001,process.env.IP,function(res,req){
    console.log("Server is running");
});