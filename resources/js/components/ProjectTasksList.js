import React, { Component } from "react";
import TaskInfoCard from "./TaskInfoCard";
class ProjectTasksList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <ul className="list-group">
                {this.props.tasks.map((Task, i) => (
                    <li key={i} className="list-group-item mx-0">
                        <TaskInfoCard task={Task} />
                    </li>
                ))}
            </ul>
        );
    }
}

export default ProjectTasksList;
