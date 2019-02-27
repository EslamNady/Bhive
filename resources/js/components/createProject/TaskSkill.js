import React, { Component } from 'react';

class TaskSkill extends Component {

    constructor(props) {
        super(props);
        this.state = {

            allskills: [],
        }
        this.skillName = this.skillName.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }


    skillName(level) {
        if (level == 1) {
            return "Little Knowledge"
        }
        else if (level == 2) {
            return "Beginner"
        }
        else if (level == 3) {
            return "Intermediate"
        }

        else if (level == 4) {
            return "Consultant"
        }
        else if (level == 5) {
            return "Professional"
        }

    }
    save(event) {
        this.props.onSave(this.props.id, this.refs.levelSelect.value);
    }
    delete() {
        this.props.onDelete(this.props.id);

    }
    normalRender() {
        return (
            <div className="skill  mx-3 my-2 px-2 py-1 text-center">

                <div className="skill-name" >{this.props.name}</div>
                <div className="skill-level" >{this.skillName(this.props.level)}</div>
            </div>
        );
    }

    editRender() {

        return (
            <div className="skill  mx-3 my-2 px-2 py-1 text-center">

                <div className="skill-name" >{this.props.name}</div>
                <select className="skill-level ml-3" value={parseInt(this.props.level)} onChange={this.save} ref="levelSelect" id="skill_level_select">
                    <option value={1} >Little Knowledge</option>
                    <option value={2} >Beginner</option>
                    <option value={3} >Intermediate</option>
                    <option value={4}  >Consultant</option>
                    <option value={5} >Professional</option>
                </select>
                <div className="delete-btn ml-3" onClick={this.delete}><img src="/images/icons/cancel.png" /></div>
            </div>

        );
    }

    render() {

        if (this.props.edit) {
            return this.editRender();
        }
        else {
            return this.normalRender();
        }


    }
}

export default TaskSkill;
