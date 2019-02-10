import React, { Component } from 'react';
import Skill from "./Skill";
class SkillsWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            allskills: [],
            edit: false
        }
        this.edit = this.edit.bind(this);
        this.saveSkills = this.saveSkills.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.addSkills = this.addSkills.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
    }
    componentWillMount() {
        axios.get('/employee/skills' + this.props.employeeID
        )
            .then(response => {

                this.setState({
                    skills: response.data.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get("/skills").then(response => {
            this.setState({
                allskills: response.data.data
            });
            var newSkills = this.state.allskills.slice()


            for (var j = 0; j < this.state.skills.length; j++) {
                var index = -1;
                for (var i = 0; i < newSkills.length; i++) {
                    if (newSkills[i].id === this.state.skills[j].id) {
                        index = i;
                        break;
                    }
                }
                if (index == -1)
                    continue;
                else {

                    newSkills.splice(index, 1);
                }

            }
            console.log(newSkills);
            this.setState({ allskills: newSkills });

        });

    }
    edit() {
        this.setState({
            edit: true
        })
    }

    addSkills() {
        var array = this.state.skills.slice();
        var index = this.refs.allSkillsSelect.value;
        array.push({ id: this.state.allskills[index].id, name: this.state.allskills[index].name, level: this.refs.skillLevel.value });
        this.setState({ skills: array });
        var newSkills = this.state.allskills;
        newSkills.splice(index, 1);
        this.setState({ allskills: newSkills });
    }

    saveSkills(skillID, value) {
        var array = this.state.skills;
        array[skillID].level = value;
        this.setState({ skills: array });
    }
    deleteSkill(index) {
        var array = this.state.skills.slice();
        var allSkillsArr = this.state.allskills;
        allSkillsArr.push(array[index]);
        array.splice(index, 1);
        this.setState({ skills: array });
    }
    onFinish() {
        axios({
            method: 'post',
            url: '../../skills/submit',
            data: {
                skills: this.state.skills,
                employeeID: this.props.employeeID,
            },
        }
        ).then(response => {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error.response.data);
        });

        this.setState({
            edit: false
        })
    }

    render() {
        if (!this.state.edit) {
            return (
                <div className="skills-wrapper">
                    <div className="skills-box">
                        <div className="skills-box-insider  d-flex flex-wrap justify-content-start">
                            {this.state.skills.map((skill, i) => (
                                <Skill key={i} id={i} edit={false} onSave={this.saveSkills} name={skill.name} level={skill.level} allskills={this.state.allskills} ></Skill>
                            ))}

                        </div>

                    </div>
                    <button className="skills-edit-save-btn btn btn-primary d-block ml-auto mr-2 mt-2" onClick={this.edit}>Edit</button>
                </div>
            );
        }
        else {
            return (
                <div className="skills-wrapper">

                    <div className="form-group form-inline">
                        <select className="form-control" id="allSkillsSelect" ref="allSkillsSelect">
                            {this.state.allskills.map((skill, i) => (
                                <option key={i} value={i}>{skill.name}</option>
                            ))}
                        </select>
                        <select className="form-control ml-2" id="skill_level_select" ref="skillLevel">
                            <option value={1} >Little Knowledge</option>
                            <option value={2} >Beginner</option>
                            <option value={3} >Intermediate</option>
                            <option value={4} >Consultant</option>
                            <option value={5} >Professional</option>
                        </select>
                        <button className="btn btn-primary ml-2" onClick={this.addSkills}>Add Skill</button>

                    </div>

                    <div className="skills-box">
                        <div className="skills-box-insider d-flex flex-wrap justify-content-start">
                            {this.state.skills.map((skill, i) => (
                                <Skill key={i} id={i} edit={true} onDelete={this.deleteSkill} onSave={this.saveSkills} name={skill.name} level={skill.level} allskills={this.state.allskills} ></Skill>
                            ))}
                        </div>
                    </div>

                    <button className="skills-edit-save-btn btn btn-success d-block ml-auto mr-2 mt-2" onClick={this.onFinish}>Save</button>
                </div>
            );
        }
    }
}

export default SkillsWrapper;
