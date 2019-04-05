import React, { Component } from 'react';
class UpcomingTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upcomingTasks: [],
        }
    }
    componentWillMount() {
        axios.get('/employees/upcomingtasks' + this.props.employeeID
        ).then(response => {

            this.setState({
                upcomingTasks: response.data.data,
            });

        }).catch(function (error) {
            console.log(error.response.data);
        });

    }
    render() {

        return (
            <div>
                <div className="card-header">
                    <h4>Upcoming Tasks</h4>
                </div>
                <div className="card-body">
                    <div className="blue-bg">
                        <div className="doted-bg px-3 py-3">
                            <ul className="list-group">
                                {this.state.upcomingTasks.map((task, i) => (
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

export default UpcomingTasks;
