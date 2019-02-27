import React, { Component } from "react";
import ReactDOM from "react-dom";
class TemplateSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: [],
            //selectValue: 0
        };
        this.sendTemplateId = this.sendTemplateId.bind(this) //hna

    }
    componentDidMount() {
        axios.get("/templates").then(response => {
            this.setState({
                templates: response.data.data
            });
        });
    }
    sendTemplateId() {
        this.props.getTemp(document.getElementById("tempSelect").value)
    }

    render() {

        return (
            <div className="TemplatesSelector ml-2">
                <label>
                    Select from template
                <select id="tempSelect" className=" mx-3 py-1 px-1">
                        {this.state.templates.map((template, i) => (
                            <option key={i} value={template.id}>
                                {template.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button className="select-btn py-1 px-2" onClick={this.sendTemplateId}>Select</button>
            </div>
        );
    }
}

export default TemplateSelection;
