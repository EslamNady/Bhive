import React, { Component } from 'react';
import axios from "axios";
import SubmittedTask from "./SubmittedTask";
class SubmittedTasksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subtasks: [],
        }
        this.showTasks = this.showTasks.bind(this);
    }

    componentWillMount() {
        axios.get('/project/submittedtasks' + this.props.project_id
        )
            .then(response => {


                var array = response.data.data;
                console.log(array);
                var modified = []
                for (var i = 0; i < array.length; i++) {
                    for (var j = 0; j < array[i].submissions.length; j++) {
                        if (array[i].submissions[j].submitted == 1) {
                            modified.push({ "name": array[i].name, "id": array[i].submissions[j].id, "emp_first_name": array[i].submissions[j].employee_first_name, "emp_title": array[i].submissions[j].employee_title, "note": array[i].submissions[j].note, "link": array[i].submissions[j].submission_link, "submission_date": array[i].submissions[j].submission_date, "gave_feedback": array[i].submissions[j].gave_feedback });
                        }
                    }

                }

                this.setState({
                    subtasks: modified,
                })
                console.log(this.state.subtasks);


            })
            .catch(function (error) {
                console.log(error);
            });


    }
    showTasks() {
        if (this.state.subtasks.length !== 0) {
            return (
                <React.Fragment>
                    {this.state.subtasks.map((task, i) => (
                        <div key={i} className="col-3">
                            <SubmittedTask key={i} task={task} />
                        </div>
                    ))}
                </React.Fragment>
            );

        }
        else {
            return (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100%", width: '100%' }}>
                    <h4 className="text-white">No Submitted Tasks</h4>
                </div>
            );
        }
    }

    render() {
        // console.log(this.state.subtasks)
        return (
            <div className="mt-5">
                <h4 className="pl-5 mb-4">Submissions</h4>
                <div className="blue-bg ">
                    <div className="doted-bg">
                        <div className="subTasksWrapper" style={{ height: "100%" }}>
                            <div className="row" style={{ height: "100%" }} >
                                {this.showTasks()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default SubmittedTasksList;