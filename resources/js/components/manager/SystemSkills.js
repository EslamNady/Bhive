import React, { Component } from "react";
import Skill from "./Skill";
class SystemSkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            systemSkills: []
        };
        this.deleteSkill = this.deleteSkill.bind(this);
        this.addSkill = this.addSkill.bind(this);
    }
    componentWillMount() {
        axios
            .get("/skills")
            .then(response => {
                this.setState({
                    systemSkills: response.data.data
                });
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    deleteSkill(index) {
        axios
            .delete("/skills/delete" + index)
            .then(response => {
                this.setState({
                    systemSkills: response.data.data
                });
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }
    addSkill() {
        var name = this.refs.skillName.value;
        axios({
            method: "post",
            url: "../skills/add",
            data: {
                name: name
            }
        })
            .then(response => {
                this.setState({
                    systemSkills: response.data.data
                });
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    render() {
        return (
            <div className="mt-4">

                <h4>System skills</h4>
                <div className="form-group ml-2">
                    <label>
                        Skill Name:
                        <input type="text" ref="skillName" className="form-control " />
                    </label>
                    <button className="btn btn-primary ml-3" onClick={this.addSkill}>Add Skill</button>
                </div>
                <div className="skills-wrapper ml-2">
                    <div className="skills-box">
                        <div className="skills-box-insider d-flex flex-wrap justify-content-start">
                            {this.state.systemSkills.map((skill, i) => (
                                <Skill key={i} onDelete={this.deleteSkill} id={skill.id} skill={skill} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default SystemSkills;
