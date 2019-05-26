import React, { Component } from 'react';
import EmployeeTimeTable from './EmployeeTimeTable'

class EmployeesWorkingDays extends Component {
    constructor(props) {
        super(props);
        this.state = { employees: {} }

    }
    componentWillMount() {

        this.props.fireDB.child('ChangeTimetableRequests/requests').on('value', snap => {

            this.setState({ employees: snap.val() });

        })

    }

    showEmpRequests() {
        if (!this.isEmpty(this.state.employees)) {
            return (
                <React.Fragment>
                    {Object.keys(this.state.employees).map((key, i) => (
                        <EmployeeTimeTable key={i} index={"emp" + i * Math.floor(Math.random() * 1000)} empID={key} fireDB={this.props.fireDB} />
                    ))}
                </React.Fragment>
            );
        }
    }
    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    render() {
        if (this.isEmpty(this.state.employees)) {
            return (<div className="d-flex justify-content-center align-items-center" style={{ height: "400px", overflowY: "auto", border: "1px solid #eee", borderRadius: "3px" }}>
                <div className="text-secondary">No pending requests.</div>
            </div>)
        }
        return (<div className="py-4">
            <div style={{ height: "420px", overflowY: "auto", border: "1px solid #eee", borderRadius: "3px" }}>
                {this.showEmpRequests()}
            </div>
        </div>);
    }
}

export default EmployeesWorkingDays;