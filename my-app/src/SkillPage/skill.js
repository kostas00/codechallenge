import React, { Component } from "react";


import "./skill.css";

import axios from "axios";
import ReactDOM from "react-dom";
export class skill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        details:'',
        createddate:'',
        newdetails:'',
        showupdate:false
    };
    this.handleChange = this.handleChange.bind(this);

    axios.get('/viewskill?skillid='+localStorage.getItem("skillid"))
    .then(response => {
        console.log(response);
        this.setState({name:response.data.name});
        this.setState({details:response.data.details});
        this.setState({createddate:response.data.dateadded});

    })
    .catch(error => {
        console.log(error);
      });
  }
  updateskill(){
      const apdata={
          "id":localStorage.getItem("skillid"),
          "name":this.state.name,
          "details":this.state.newdetails,
          "dateadded":this.state.createddate
      }
      console.log(this.state.newdetails)
    axios({
        url: "/skills/"+localStorage.getItem("skillid"),
        method: "put",
        mode: "no-cors",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
          "Access-Control-Allow-Origin": "*",
        },
        data:apdata
        
      })
        .then((response) => {
          console.log(response);
          console.log("data inserted to appointment--------------");
          //console.log(this.state.slots+"old slots");
          //refresh();
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log("data inserted to appointment--------------");
          console.log(error);
        });

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  deleteskill(){
    axios.get('/deleteskill/?skillid='+localStorage.getItem("skillid"))
    .then(response => {
        console.log(response);
        this.props.history.push("/");
    })
    .catch(error => {
        console.log(error);
      });

  }

 

  showfrom(){
      if(!(this.state.showupdate))
      {
      const element=(
      <div>
        <input id="fin" type="text" name="newdetails" onChange={this.handleChange} placeholder="new details"
         />
        <button id="sbtn" type="submit" onClick={()=>{this.updateskill()}}>Update</button>
     </div>
      )
      ReactDOM.render(element, document.getElementById("renderform"));
      this.setState({showupdate:true});

    }else{
          const element =(
              <div></div>
          )
          ReactDOM.render(element, document.getElementById("renderform"));
          this.setState({showupdate:false});
      }
  }

  render() {
    return (
      <div id="Home">
     <div id="skillpage">
         <div id="skilltable">
         <table>
             <tbody>
                 <tr>
                     <th>Skill</th>
                     <th>Details</th>
                     <th>Creation Date</th>
                 </tr>
                 <tr>
                     <td>{this.state.name}</td>
                     <td>{this.state.details}</td>
                     <td>{this.state.createddate}</td>
                 </tr>
             </tbody>
         </table>
         </div>
         <div id="skilloptions">
         <button id="fbtn" type="submit" onClick={()=>{this.showfrom()}}>Update skill details</button>
         <button id="delbtn" type="submit" onClick={()=>{this.deleteskill()}}>Delete skill</button>

         </div>
         <div id="renderform"></div>
     </div>
     </div>
    )
  }
}
export default skill;