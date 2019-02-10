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
                    <div>{this.props.task.name}</div>
                    <div>Slack: {this.props.task.slack}</div>
                    <div>no employee is assigned</div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div>{this.props.task.name}</div>
                    <div>Slack: {this.props.task.slack}</div>
                    <div>{this.state.employee.title} / {this.state.employee.name}</div>
                </div>
            );
        }
    }
}

export default TaskInfoCard;
