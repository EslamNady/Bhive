import React, { Component } from 'react';
import ReactDOM from "react-dom";
import ProjectItem from "./ProjectItem";
import axios from 'axios';
class ProjectListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }
    componentDidMount() {
        axios.get('/project/list')
            .then(response => {
                this.setState({
                    projects: response.data.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <ul className="list-group projectsList">
                {this.state.projects.map((project, i) => (
                    <li key={i} className="list-group-item project-item py-2 mb-4">
                        <a href={"/project/view" + project.id} className="d-block"> <ProjectItem projectObj={project}></ProjectItem> </a>
                    </li>
                ))}
            </ul>
        );
    }
}

export default ProjectListView;