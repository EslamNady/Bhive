import React, { Component } from 'react';

class EmployeeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empKey: "",
            timeTable: '',
            score: 0,
        }
    }
    componentWillMount() {
        var empKey = this.props.email.replace(/\./g, ',');
        this.setState({ empKey: empKey });

        this.props.fireDB.child("Employees/" + empKey + "/timeTable").on('value', snap => {
            var timeTable = snap.val()
            this.setState({
                timeTable: snap.val(),
            })

            // console.log("Employees/" + this.state.empKey + "/timeTable")
        });

        this.props.fireDB.child("Employees/" + empKey + "/totalScore").on('value', snap => {
            var timeTable = snap.val()
            this.setState({
                score: snap.val(),
            })

            // console.log("Employees/" + this.state.empKey + "/timeTable")
        });


    }

    render() {
        return (
            <div className="employee-info  ">
                <div className="bg px-5 py-4">
                    <div className="row">
                        <div className="col-6">
                            <div className="employee-name">{this.props.name}</div>
                            <div className="employee-title ml-2 my-2"><label className="text-muted"><small>Title/</small></label> {this.props.title}</div>
                            <div className="score ml-2 my-2"><label className="text-muted"><small>Score:</small></label> {this.state.score}</div>
                        </div>


                    </div>
                </div>
            </div>

        );
    }
}

export default EmployeeInfo;
