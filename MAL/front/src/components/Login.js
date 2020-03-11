import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
class Login extends Component{
  render(){
    return(
        <div>
          <Link to="/" className="btn btn-lg btn-warning basicButtons">Home</Link>
          <form onSubmit={(event) => {
            event.preventDefault()
            const username = this.username.value
            const password=this.password.value
            this.props.LogIn(username,password)
          }}
            className="text-center border border-light p-5"
            style={{width:'40%'}}
          >
              <p className="h4 mb-4">Log In</p>
              <input
                type="email"
                ref={(input) => { this.username = input }}
                className="form-control mb-4"
                placeholder="E-mail"
                required />
              <input
                type="password"
                ref={(input) => { this.password = input }}
                className="form-control"
                placeholder="Password"
                required />
            <button type="submit" className="btn btn-info my-4 btn-block">Sign in</button>
          </form>
        </div>
    );
  }
}
export default Login;