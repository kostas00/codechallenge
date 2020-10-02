import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";



import Home from "./Home/Home";

import Skill from "./SkillPage/skill";
import Employees from "./EmployeesPage/employees";
import employee from "./SelectedEmployee/employee"
import createemployee from "./CreateEmployee/createemployee"

import history from './history';
import createskill from "./CreateSkill/createskill"



export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/employee" component={employee} />
                    <Route path="/createemployee" component={createemployee} />
                    <Route path="/employees" component={Employees} />
                    <Route path="/skill" component={Skill} />                  
                    <Route path="/createskill" component={createskill} />
                 
                </Switch>
            </Router>
        )
    }
}
