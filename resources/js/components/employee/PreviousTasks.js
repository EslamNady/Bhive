import React, { Component } from 'react';
class PreviousTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previousTasks: [],
        }
    }
    componentWillMount() {
        axios.get('/employees/previoustasks' + this.props.employeeID
        ).then(response => {
            this.setState({
                previousTasks: response.data.data,
            });

        }).catch(function (error) {
            console.log(error.response.data);
        });

    }

    render() {
        return (
            <div>
                <div className="card-header">
                    <h4>Previous Tasks</h4>
                </div>
                <div className="card-body">
                    <div className="blue-bg">
                        <div className="doted-bg px-3 py-3">
                            <ul className="list-group ">
                                {this.state.previousTasks.map((task, i) => (
                                    <li className="list-group-item task-wrapper" key={i}>
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
                                        <div className="end-date">
                                            <small className="text-muted">Deadline: </small>
                                            {task.end_date}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PreviousTasks;
