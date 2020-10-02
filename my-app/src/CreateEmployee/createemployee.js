
import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";

import "./createemployee.css";
import history from "./../history";
import Checkbox from 'react-checkbox';
import axios from "axios";
import ReactDOM from "react-dom";


export class createemployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        surname:'',
        hiringdate:'',
        dataIsReturned:false
       ,skills:[],
       skillsadded:[]
    };

    this.selectedCheckboxes = new Set();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    axios
    .get(
      "/skills"
    )
    .then((response) => {
      // console.log(response.data);
      response.data.forEach((element) => {
        this.setState((state) => {
          state.skills.push(element);
        });
      });
      this.setState({ dataIsReturned: true });
      console.log(this.state.skills)
    })
    .catch((error) => {
      console.log(error);
    });
   
  }

  handleSubmit(event){
    let param = "?";
    for(const ch of this.selectedCheckboxes){
      param +="skills="+ch+"&";
    }
      
      console.log(param.slice(0,-1))

    const { name, description } = this.state;
    const apdata = { name, description };
    var formBody = new FormData();
    formBody.append("name", this.state.name);
    formBody.append("surname", this.state.surname);
    formBody.append("hiringdate", this.state.hiringdate);
    console.log(name,description)
    event.preventDefault();
    axios({
      url: "/createemployee"+param,
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
     data:formBody,
      
    })
      .then((response) => {

        console.log(response);
        console.log("data inserted to appointment--------------");
        //console.log(this.state.slots+"old slots");
        //refresh();
        this.props.history.push("/employees");
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

  showCheckboxes(){
      console.log("im hereeeee")
    return this.state.skills.map((skill, index) => {
        const { id, name, details, dateadded } = skill;
        console.log(id);
  
        return (
        <div id="checkbox-container">
        <label >{name}
        <input  type="checkbox" value={id} name={id} key={id}
        onChange={this.handleInputChange}
        
        ></input>
         </label>
        </div>
        );
      });
  }
  handleInputChange(event){
    if(this.selectedCheckboxes.has(event.target.name)){
      this.selectedCheckboxes.delete((event.target.name).toString())
     // console.log("list delete"+event.target.name)
    }else{
      this.selectedCheckboxes.add(event.target.name)
     // console.log("list add"+event.target.name)
    }
      
    this.state.skillsadded.push(event.target.name);
  }
  test(){
    let param = "?";
    for(const ch of this.selectedCheckboxes){
      param +="skills="+ch+"&";
    }
      
      console.log(param.slice(0,-1))
  }
 render() {
    if (this.state.dataIsReturned) {
    return (
      <div id="Home">
     <div id="newemployee">
      <div className="headform">
          <h3>Create new Employee</h3>
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
                <label id="nm" htmlFor="name">Surname </label>
                <input
                  type="text"
                  value={this.state.surname}
                  onChange={this.handleChange}
                  name="surname"
                  placeholder="surname"
                />
              </div>
              <div className="form-group">
                <label id="nm" htmlFor="text">Hire Date </label>
                <input
                  type="text"
                  name="hiringdate"
                  value={this.state.hiringdate}
                  onChange={this.handleChange}
                  placeholder="hiringdate"
                />
              </div>
              <div className="form-group">
              <input type="submit" value="Submit"  onClick={this.handleSubmit}/>
              </div>
          </div>
      </div>
      <div id="checkboxes">
          <form className="form-con" id="ch">
        {this.showCheckboxes()}
        </form>
       {/* <button id="newbtn" type="submit" onClick={()=>{this.test()}}>Create employee</button> */}

      </div>
     </div>
     </div>
    )
} else {
    return <h2>loading</h2>;
  }
  }
}
export default createemployee;