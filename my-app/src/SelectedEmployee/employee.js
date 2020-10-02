import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";

import "./employee.css";
import history from "./../history";
import axios from "axios";
import Select from "react-select";
import ReactDOM from "react-dom";
export class employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      name: "",
      surname: "",
      options: [],
      hiringdate: "",
      dataIsReturned: false,
      selectedItem: "",
      showoptions: false,
      showupdate:false,
      newname:'',
      newsurname:'',
      newhiringdate:''
    };
    this.handleChange = this.handleChange.bind(this);
    axios
      .get("/employeeid/?employeeid=" + localStorage.getItem("employeeid"))
      .then((response) => {
        console.log(response);
        this.setState({ name: response.data.name });
        this.setState({ surname: response.data.surname });
        this.setState({ hiringdate: response.data.hiringdate });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/employeeskills?emid=" + localStorage.getItem("employeeid"))
      .then((response) => {
        console.log(response);
        response.data.forEach((element) => {
          console.log(element);

          this.state.skills.push(element);
        });
        this.setState({ dataIsReturned: true });
        console.log("list filled");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.skills);

    axios
      .get(
        "/employeediffkills/?employeeid=" + localStorage.getItem("employeeid")
      )
      .then((response) => {
        // console.log(response.data);
        response.data.forEach((element) => {
          const obj = Object.values(element);
          //  console.log("obj===== "+obj)
          this.setState((state) => {
            state.options.push({
              label: obj[1] + "=> " + obj[2],
              value: obj[0],
            });
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("options" + this.state.options);
    // const dt = data.data;
    // console.log("dt=== "+ dt)
    //const last = dt.slice()
    //       dt.forEach((element) => {
    //         const obj = Object.values(element);
    //   console.log("obj===== "+obj)
    //         // this.setState((state) => {
    //         //   const options = state.options.push({ label: obj[1], value: obj[0] });
    //         // });
    //       });
  }

  renderListData() {
    return this.state.skills.map((em, index) => {
      const { id, name, details, dateadded } = em;
      console.log(id);

      return (
        <ul>
          <span id="wrapper">
            <span id="first">
              <li>{name}</li>
              <p>{details}</p>
            </span>
            <span id="second">
              <button
                id="addbtn"
                type="submit"
                onClick={() => {
                  this.deletekill(id);
                }}
              >
                Delete
              </button>
            </span>
          </span>
        </ul>
      );
    });

    
  }
  deletekill(id) {
    axios
    .get("deleteskillfromemployee?emid="+ + localStorage.getItem("employeeid")+"&skillid="+id)
    .then((response) => {
       // this.renderListData();
        window.location.reload(false);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  showskills() {
    if (!this.state.showoptions) {
      const element = (
        <div className="flex-child-left">
          <Select
            className="drop"
            name="selectedItem"
            value={this.state.selectedItem}
            options={this.state.options}
            onChange={this.change.bind(this)}
          >
            {this.state.selectedItem}
          </Select>
        </div>
      );
      ReactDOM.render(element, document.getElementById("dropdown"));
      this.setState({ showoptions: true });
    } else {
      const element = <div></div>;
      ReactDOM.render(element, document.getElementById("dropdown"));
      this.setState({ showoptions: false });
    }
  }

  change = (selectedOption) => {
    console.log(
      "selecgted option" + selectedOption.label,
      selectedOption.value
    );
    axios
      .get(
        "/addskilltoemployee?emid=" +
          localStorage.getItem("employeeid") +
          "&skillid=" +
          selectedOption.value
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload(false);
  };

  updateEmp(){
    if(!(this.state.showupdate))
    {
    const element=(
    <span>
      <input  type="text" name="newname" onChange={this.handleChange} placeholder="new name"
       />
       <input  type="text" name="newsurname" onChange={this.handleChange} placeholder="new surname"
       />
       <input type="text" name="newhiringdate" onChange={this.handleChange} placeholder="new date"
       />
      <button id="sbtn" type="submit" onClick={()=>{this.updateemployee()}}>Update</button>
   </span>
    )
    ReactDOM.render(element, document.getElementById("updform"));
    this.setState({showupdate:true});

  }else{
        const element =(
            <div></div>
        )
        ReactDOM.render(element, document.getElementById("updform"));
        this.setState({showupdate:false});
    }
  }

  deleteEmp(){
    axios.get('/employee/{employee_id}?emid='+localStorage.getItem("employeeid"))
    .then(response => {
        console.log(response);
        this.props.history.push("/employees");
    })
    .catch(error => {
        console.log(error);
      });

  }

  updateemployee(){
    const apdata={
      "id":localStorage.getItem("employeeid"),
      "name":this.state.newname,
      "surname":this.state.newsurname,
      "hiringdate":this.state.newhiringdate
  }
  console.log(this.state.newdetails)
axios({
    url: "/employee/{employee_id}?emid="+localStorage.getItem("employeeid"),
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
     
      window.location.reload(false);
    })
    .catch(function (error) {
      console.log("eroooorrrrrrrrrrrrr--------------");
      console.log(error);
    }); 
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

 

  render() {
    if (this.state.dataIsReturned == true) {
      return (
        <div id="employeepage">
          <div id="employeetable">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Hiring Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.name}</td>
                  <td>{this.state.surname}</td>
                  <td>{this.state.hiringdate}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
              <button id="delbtn" type="submit" onClick={() => {this.deleteEmp();}}>Delete </button>
              <button id="upbtn" type="submit" onClick={() => {this.updateEmp();}}> Update </button>

          </div>
          <div id="updform">

          </div>
          <div id="employeeskills">
            <div>
              <h4>Employee's Skillset</h4>
            </div>
            {this.renderListData()}
          </div>
          <div>
            <button
              id="addbtn"
              type="submit"
              onClick={() => {
                this.showskills();
              }}
            >
              Add skill
            </button>
          </div>
          <div id="dropdown"></div>
        </div>
      );
    } else {
      return <h2>loading</h2>;
    }
  }
}
export default employee;
