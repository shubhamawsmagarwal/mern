import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading:true
    }
    this.getDataFromDb=this.getDataFromDb.bind(this);
    this.putDataToDB=this.putDataToDB.bind(this);
    this.deleteFromDB=this.deleteFromDB.bind(this);
    this.updateDB=this.updateDB.bind(this);
  }
  async componentWillMount(){
    await this.getDataFromDb();
    this.setState({ loading: false });
  }
  getDataFromDb(){
    axios.get('http://:3001/get').then(res => {this.setState({ data: res.data.data })}).catch(err=>{console.log(err)});
  }
  putDataToDB(id,message){
    this.setState({ loading: true });
    axios.post('http://:3001/add', {id: parseInt(id),message: message}).then(res => {this.setState({ data:[...this.state.data,res.data.data]});this.setState({ loading:false });}).catch(err=>{console.log(err)});
  }
  deleteFromDB(id){
    axios.delete('http://:3001/delete', {id:parseInt(id)}).then(res =>{ console.log(res)}).catch(err=>{console.log(err)});
  }
  updateDB(id,message){
    axios.put('http://:3001/update', {id: parseInt(id),message: message}).then(res=>{ console.log(res)} ).catch(err=>{console.log(err)});
  }
  render() {
    return (
      <div>
        { this.state.loading
        ?<div>Loading...</div>
        :<div><ul>
          {this.state.data.length <= 0
            ? <div>'NO DB ENTRIES YET'</div>
            : this.state.data.map((dat) => (
                <li style={{ padding: '10px' }} key={dat.id}>
                  <span> id: </span> {dat.id} <br />
                  <span> data: </span>{dat.message}
                </li>
              ))}
        </ul>
        <form onSubmit={(event) => {
          event.preventDefault();
          const id = this.id1.value;
          const message = this.message1.value;
          this.putDataToDB(id,message);
        }}>
            <input
              type="text"
              ref={(input) => { this.id1 = input }}
              className="form-control"
              placeholder="id"
              required />
            <input
              type="text"
              ref={(input) => { this.message1 = input }}
              className="form-control"
              placeholder="message"
              required />
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
         <form onSubmit={(event) => {
          event.preventDefault();
          const id = this.id2.value;
          this.deleteFromDB(id);
        }}>
            <input
              type="text"
              ref={(input) => { this.id2 = input }}
              className="form-control"
              placeholder="id"
              required />
          <button type="submit" className="btn btn-primary">Delete</button>
        </form>
         <form onSubmit={(event) => {
          event.preventDefault();
          const id = this.id3.value;
          const message = this.message3.value;
          this.updateDB(id,message);
        }}>
            <input
              type="text"
              ref={(input) => { this.id3 = input }}
              className="form-control"
              placeholder="id"
              required />
            <input
              type="text"
              ref={(input) => { this.message3 = input }}
              className="form-control"
              placeholder="message"
              required />
          <button type="submit" className="btn btn-primary">update</button>
        </form>
        </div>}
      </div>
    );
  }
}

export default App;
