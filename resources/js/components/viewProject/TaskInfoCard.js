import React, { Component } from 'react';
class TaskInfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: [],
        }
    }
    componentWillMount() {
        axios.get('/tasks/employee' + this.props.task.id
        )
            .then(response => {
                if (response.data.data.length != 0)
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
                    <div className="h5 taskName">{this.props.task.name}</div>
                    <div><small className="text-muted">Slack:</small> {this.props.task.slack}</div>
                    <div><small className="text-muted">no employee is assigned</small></div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="h5 taskName">{this.props.task.name}</div>
                    <div><small className="text-muted">Slack:</small> {this.props.task.slack}</div>
                    {this.state.employee.map((employee, j) => (
                        <div key={j}><small className="text-muted">{employee.title}</small> /<span className="font-weight-bold"> {employee.first_name}</span></div>
                    ))}

                </div>
            );
        }
    }
}

export default TaskInfoCard;
