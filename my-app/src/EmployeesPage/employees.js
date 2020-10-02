import React, { Component } from 'react';
import axios from "axios";
import ReactDOM from "react-dom";

class employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
          employees:[],
          dataIsReturned:false,
          currentSort:'default'
        };
   

        axios
        .get("/employees")
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
              response.data.forEach((element) => {
                console.log(element);
                this.state.employees.push(element);
              });
          }       
         this.setState({dataIsReturned:true});
          return response;
        }
        }.bind(this) )
        .catch(function (error) {
          console.log(error);
        });
      }
      renderTableData(){
    
        return this.state.employees.map((em, index)=>{
         const{id,name,surname,hiringdate}=em
         console.log(id)
     
           return( <tr>
             <td>{name}</td>
             <td>{surname}</td>
             <td>{hiringdate}</td>
             <td><button onClick={()=>{this.viewEmployee(em.id)}}>View</button></td>
           </tr>)
       })
     }

     viewEmployee(id) {
        console.log("clicked"+id)
          localStorage.setItem("employeeid",id);
          this.props.history.push("/employee");
        }
     

     onSortChange = () => {
		const { currentSort } = this.state;
		let nextSort;

		if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'default';
		else if (currentSort === 'default') nextSort = 'down';

		this.setState({
			currentSort: nextSort
		});
  };
  createEmp(){
    this.props.history.push("/createemployee");
  }

    render() {
   
        return (
            <div className="Home">
            <div className="header">
              <h2 id="title">Employees</h2>
            </div>
            <div id="employees-table">
              <table >
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Surname
                    <button onClick={this.onSortChange}>
						
					</button>
                    </th>
                    <th>Created Date</th>
                    <th></th>
                  </tr>
                  </thead>
                <tbody id='table'>  
                {this.renderTableData()}
                 </tbody>
              </table>
            </div>
            <button id="newbtn" type="submit" onClick={()=>{this.createEmp()}}>Create employee</button>

          </div>
        );
    }
}

export default employees;