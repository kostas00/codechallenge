
import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";

import "./createskill.css";
import history from "./../history";
import axios from "axios";
import ReactDOM from "react-dom";


export class createskill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        description:''
       
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
   
    const { name, description } = this.state;
    const apdata = { name, description };
    var formBody = new FormData();
    formBody.append("name", this.state.name);
    formBody.append("description", this.state.description);
    console.log(name,description)
    event.preventDefault();
    axios({
      url: "/addskill?name="+name+"&description="+description,
      method: "post",
      mode: "no-cors",
      headers: {
        common: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        "Access-Control-Allow-Origin": "*",
      },
     
      
    })
      .then((response) => {

        console.log(response);
        console.log("data inserted to appointment--------------");
        //console.log(this.state.slots+"old slots");
        //refresh();
        this.props.history.push("/");
      })
      .catch(function (error) {
        alert("This skill already exists!")
        //this.setState({name:''});
        //this.setState({description:''});
        console.log("data doooooont to appointment--------------");
        console.log(error);
      });

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
 render() {
    return (
     <div id="newskill">
      <div className="headform">
          <h3>Create new skill</h3>
            <div className="form">
              <div className="form-group">
                <label id="nm" htmlFor="name">Name </label>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                  name="name"
                  placeholder="name"
                />
              </div>
              <div className="form-group">
                <label id="nm" htmlFor="text">Description </label>
                <input
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="description"
                />
              </div>
              <div className="form-group">
              <input type="submit" value="Submit"  onClick={this.handleSubmit}/>
              </div>
          </div>
      </div>
     </div>
    )
  }
}
export default createskill;