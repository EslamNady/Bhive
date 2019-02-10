import React, { Component } from 'react';
class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.onDelete(this.props.id);
    }
    render() {

        return (
            <div className="skill mx-3 my-2 px-2 py-1 ">
                <div className="skill-name">{this.props.skill.name}</div>
                <div className="delete-btn ml-2" onClick={this.delete}><img src="/images/icons/cancel.png" alt="delete" /></div>

            </div>
        );
    }
}

export default Skill;
