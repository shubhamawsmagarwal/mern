import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
class Home extends Component{
  render(){
    return(
        <div>
          {!this.props.isLoggedIn
            ?<span>
              <Link to="/login" className="btn btn-info btn-lg basicButtons">Login</Link>
              <Link to="/register" className="btn btn-info btn-lg basicButtons">Register</Link>
            </span>
            :<Link to="/user" className="btn btn-lg text-info basicButtons">{this.props.username}</Link>   
          }<button className="btn btn-lg btn-danger basicButtons" onClick={(event)=>{
            event.preventDefault();
            this.props.Refresh();
          }}>Refresh</button>
          {this.props.loading
          ?<div className="container content">Loading...</div>
          :<div className="container content">
          {this.props.newsChain.map((article)=>(
            <div className="container p-3 my-3 border bg-light">
               <div className="text-center  text-primary font-weight-bold">{article.title}</div>
               <div className="text-center p-3">{article.description}</div>
               <div className="text-center"><button className="btn btn-secondary">{article.category}</button></div>
               <div className="text-right text-success">Authors:-{article.author}</div>
            </div>
            ))}
          </div>
          }
        </div>
    );
  }
}
export default Home;


