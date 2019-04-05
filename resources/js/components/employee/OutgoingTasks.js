import React, { Component } from 'react';
class OutgoingTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outgoingTasks: []
        }
    }

    componentWillMount() {
        axios.get('/employees/outgoingtasks' + this.props.employeeID
        ).then(response => {
            this.setState({
                outgoingTasks: response.data.data,
            });
            console.log(response.data.data);
        }).catch(function (error) {
            console.log(error.response.data);
        });

    }
    deadline(task) {
        if (task.is_dead) {
            return (
                <div className="end-date text-danger">
                    <small>Deadline: </small>
                    {task.end_date}
                </div>);
        } else {
            return (
                <div className="end-date">
                    <small className="text-muted">Deadline: </small>
                    {task.end_date}
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="card-header">
                    <h4>Ongoing Tasks</h4>
                </div>
                <div className="card-body">
                    <div className="blue-bg">
                        <div className="doted-bg px-3 py-3">
                            <ul className="list-group">
                                {this.state.outgoingTasks.map((task, i) => (
                                    <a href={"employees/submit/view" + task.id} className="list-group-item task-wrapper task-wrapper-link" key={i}>

                                        <div className="project-name">
                                            {task.project_name}
                                        </div>
                                        <div className="task-name">
                                            {task.name}
                                        </div>
                                        <div className="start-date">
                                            <small className="text-muted">Start Date: </small>
                                            {task.start_date}
                                        </div>
                                        {this.deadline(task)}
                                    </a>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OutgoingTasks;
