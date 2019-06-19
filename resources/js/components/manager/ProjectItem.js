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
                <h5>{this.props.projectObj.name}</h5>
            </div>
        );
    }
}

export default ProjectItem;