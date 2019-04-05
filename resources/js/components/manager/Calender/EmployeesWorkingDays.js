import React, { Component } from 'react';
import EmployeeTimeTable from './EmployeeTimeTable'

class EmployeesWorkingDays extends Component {
    constructor(props) {
        super(props);
        this.state = { employees: "" }
    }
    componentWillMount() {

        this.props.fireDB.child('Employees').on('value', snap => {
            this.setState({ employees: snap.val() });

        })
    }
    render() {
        return (<div className="py-4">
            {Object.keys(this.state.employees).map((key, i) => (
                <EmployeeTimeTable key={i} index={"emp" + i} empID={key} emp={this.state.employees[key]} fireDB={this.props.fireDB} />

            ))}
        </div>);
    }
}

export default EmployeesWorkingDays;