import React, { Component } from 'react';
class TaskInfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {},
        }
    }
    componentWillMount() {
        axios.get('/tasks/employee' + this.props.task.id
        )
            .then(response => {
                if (response.data != "")
                    this.setState({
                        employee: response.data.data
                    });
                else {
                    this.setState({
                        employee: null
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        if (this.state.employee === null) {
            return (
                <div>
                    <div className="h3">{this.props.task.name}</div>
                    <div><label className="text-muted">Slack:</label> {this.props.task.slack}</div>
                    <div><small className="text-muted">no employee is assigned</small></div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="h3">{this.props.task.name}</div>
                    <div><label className="text-muted">Slack:</label> {this.props.task.slack}</div>
                    <div><label className="text-muted">{this.state.employee.title}</label> /<span className="font-weight-bold"> {this.state.employee.name}</span></div>
                </div>
            );
        }
    }
}

export default TaskInfoCard;
