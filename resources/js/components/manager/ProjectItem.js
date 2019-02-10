import React, { Component } from 'react';
class ProjectItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="projectContainer">
                <h4>{this.props.projectObj.name}</h4>
            </div>
        );
    }
}

export default ProjectItem;