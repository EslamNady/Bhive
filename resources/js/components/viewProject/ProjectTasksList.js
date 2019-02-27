import React, { Component } from "react";
import TaskInfoCard from "./TaskInfoCard";
class ProjectTasksList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="blue-bg">
                <div className="doted-bg">
                    <ul className="list-group px-1">
                        {this.props.tasks.map((Task, i) => (
                            <li key={i} className="list-group-item mx-0 my-1">
                                <TaskInfoCard task={Task} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ProjectTasksList;
