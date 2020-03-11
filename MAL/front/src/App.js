import React,{ Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';
import Error from './components/Error';
class App extends Component{
  constructor(props){
    super(props);
    this.state={
      user:null,
      isLoggedIn:false,
      loading:true,
      newsChain:[]
    }
    this.LogIn=this.LogIn.bind(this);
    this.LogOut=this.LogOut.bind(this);
    this.Register=this.Register.bind(this);
    this.checkUsername=this.checkUsername.bind(this);
    this.Contribute=this.Contribute.bind(this);
    this.Refresh=this.Refresh.bind(this);
  }
  async componentWillMount(){
    await axios.get('http://:3001/')
    .then(res => {this.setState({ isLoggedIn: res.data.isLoggedIn });
                  this.setState({ user: res.data.user })})
    .catch(err=>{console.log(err)});
    await this.Refresh();
    this.setState({loading:false});
  }
  LogIn(username,password){
     axios.post('http://:3001/login', {username: username,password: password})
     .then(res => {this.setState({ isLoggedIn: res.data.isLoggedIn });
                  this.setState({ user: res.data.user })})
     .catch(err=>{console.log(err)});
  }
  Register(name,username,password){
     axios.post('http://:3001/register', {name:name,username: username,password: password})
     .then(res => {this.setState({ isLoggedIn: res.data.isLoggedIn });
                  this.setState({ user: res.data.user })})
     .catch(err=>{console.log(err)});
  }
  LogOut(){
    axios.get('http://:3001/logout')
    .then(res => {this.setState({ isLoggedIn: res.data.isLoggedIn });
                  this.setState({ user: res.data.user })})
    .catch(err=>{console.log(err)});
  }
  checkUsername(username){
    axios.post('http://:3001/check', {username:username})
     .then(res => {
       const data=res.data.success;
       if(data===true)
          alert("Username not available");
       else if(data===false)
          alert("Username available");
     })
     .catch(err=>{console.log(err)});
  }
  Contribute(title,description,category){
     axios.post('http://:3001/contribute', {title: title,description: description,category:category})
     .then(res => {console.log(res)})
     .catch(err=>{console.log(err)});
    var obj={
      title:title,
      description:description,
      category:category
    }
    this.setState({articles:[...this.state.articles,obj]});
  }
  async Refresh(){
    this.setState({loading:true});
    await axios.get('http://:3001/refresh')
    .then(res => {this.setState({ newsChain: res.data.newsChain })})
    .catch(err=>{console.log(err)});
    this.setState({loading:false});
  }
  
  render(){
    return(
      <Router><div>
      {!this.state.loading
      ?<Switch>
        <Route exact path="/" render={(props)=><Home {...props} 
        isLoggedIn={this.state.isLoggedIn} Refresh={this.Refresh} loading={this.state.loading} newsChain={this.state.newsChain} 
        username={!this.state.isLoggedIn
                  ?null
                  :this.state.user.username}
        />}></Route>
        <Route exact path="/login"
        render={!this.state.isLoggedIn
        ?(props)=><Login {...props} LogIn={this.LogIn}/>
        :(props)=><User {...props} LogOut={this.LogOut} username={this.state.user.username} Contribute={this.Contribute} articles={this.state.user.articles}/> 
        }
        ></Route>
        <Route exact path="/register"
        render={!this.state.isLoggedIn
        ?(props)=><Register {...props} Register={this.Register} checkUsername={this.checkUsername}/>
        :(props)=><User {...props} LogOut={this.LogOut} username={this.state.user.username} Contribute={this.Contribute} articles={this.state.user.articles}/> 
        }
        ></Route>
        <Route exact path="/user"
        render={!this.state.isLoggedIn
        ?(props)=><Login {...props} LogIn={this.LogIn}/>
        :(props)=><User {...props} LogOut={this.LogOut} username={this.state.user.username} Contribute={this.Contribute} articles={this.state.user.articles}/> 
        }
        ></Route>
        <Route component={Error}></Route>
      </Switch>
      :<Route render={(props)=><Home {...props} 
        isLoggedIn={this.state.isLoggedIn} Refresh={this.Refresh} loading={this.state.loading} newsChain={this.state.newsChain} 
        username={!this.state.isLoggedIn
                  ?null
                  :this.state.user.username}
        />}></Route>
      }</div></Router>
    );
  }
}
export default App;