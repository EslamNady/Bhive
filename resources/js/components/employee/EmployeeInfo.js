import React, { Component } from 'react';
class EmployeeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="employee-info  ">
                <div className="bg px-5 py-4">
                    <div className="employee-name">{this.props.name}</div>
                    <div className="employee-title ml-2 my-2"><label className="text-muted"><small>Title/</small></label> {this.props.title}</div>
                    <div className="score ml-2 my-2"><label className="text-muted"><small>Score:</small></label> {this.props.score}</div>
                </div>
            </div>

        );
    }
}

export default EmployeeInfo;
