import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
class Register extends Component{
  render(){
    return(
        <div>
          <Link to="/" className="btn btn-lg btn-warning basicButtons">Home</Link>
          <form onSubmit={(event) => {
            event.preventDefault()
            const name=this.name.value
            const username = this.username.value
            const password=this.password.value
            this.props.Register(name,username,password)
          }}
            className="text-center border border-light p-5"
            style={{width:'40%'}}
          >
              <p className="h4 mb-4">Register</p>
              <input
                type="text"
                ref={(input) => { this.name = input }}
                className="form-control mb-4"
                placeholder="Full Name"
                required />
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
              <input type="button" value="Check Username" className="btn btn-info my-4 btn-block" onClick={(event)=>{
                event.preventDefault()
                const username = this.username.value
                this.props.checkUsername(username)
              }}/>
            <button type="submit" className="btn btn-info my-4 btn-block">Register</button>
          </form>
        </div>
    );
  }
}
export default Register;