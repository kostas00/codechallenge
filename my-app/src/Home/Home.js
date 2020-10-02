import React, { Component } from "react";
import { Button } from "react-bootstrap";
import history from "./../history";
import axios from "axios";
import ReactDOM from "react-dom";

import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills:[],
      dataIsReturned:false
    };
  }

  componentDidMount(){
    axios
    .get("/skills")
    .then(function (response) {
      console.log(response);
      console.log(response.statusText);
      if (response.status < 200 || response.status >= 300) {
        //throw new Error(response.statusText);
        //console.log(response);
      } else {
        // console.log("okokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"+response.data.length);
        if (response.data.length != 0) {
          console.log("INNNNNNNNNNNNN"+response.data.length);
          //var a=[];
          //     var tableone="";
          //     var s = '<div id="skilltable"><table><tr><th>Name</th><th>Details</th><th>Date added</th><th>btn</th></tr>';
          response.data.forEach((element) => {
            console.log(element);
           // a.push(element);
            this.state.skills.push(element);
            //const number = element.name;
            // this.setState(this.name.push(element));
          });
        // console.log(this.state.name[0]);
        
      }
     // this.renderTableData();
     this.setState({dataIsReturned:true});
      return response;
    }
    }.bind(this) )
    .catch(function (error) {
      console.log(error);
    });
  };

  // renderTableHeader(){
  //   let header=Object.keys(this.state.skills[0])
  //   return header.map((key,index)=>{
  //   return <th key={index}>{key.toUpperCase()}</th>
  //   })
  // }

renderTableData(){
  
   return this.state.skills.map((skill, index)=>{
    const{id,name,details,dateadded}=skill
    console.log(id)

      return( <tr>
        <td>{name}</td>
        <td>{details}</td>
        <td>{dateadded}</td>
        <td><button onClick={()=>{this.ViewSkill(skill.id)}}>View</button></td>
      </tr>)
  })
}

 ViewSkill(id) {
console.log("clicked"+id)
  localStorage.setItem("skillid",id);
  this.props.history.push("/skill");
}
createkill(){
  this.props.history.push("/createskill");
}
  render() {
    if (this.state.dataIsReturned == true){
      return (
        <div className="Home">
          <div className="header">
            <h2 id="title">Skills</h2>
          </div>
          <div id="skills-table">
            <table >
              <tbody id='table'>
                <tr>
                  <th>Name</th>
                  <th>Details</th>
                  <th>Created Date</th>
                  <th></th>
                </tr>
               {this.renderTableData()}
               </tbody>
            </table>
          </div>
                   <button id="newbtn" type="submit" onClick={()=>{this.createkill()}}>Create skill</button>

        </div>
        );
    }else{
       return( <h2>loading</h2>);
    }
    
    
  }
}
