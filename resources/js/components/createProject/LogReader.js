import React, { Component } from "react";
class LogReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileData: "",
            project: {
                projectName: "",
                tasks: []
            },
            Task: {
                id: 0,
                name: "",
                duration: "",
                predecessors: [],
                skills: [],
                empNum: 1
            }
        };
        this.submit = this.submit.bind(this);
    }

    submit() {
        var array = this.state.project.tasks.slice();
        this.props.getLog(array);
    }
    remove_duplicates(arr) {
        let s = new Set(arr);
        let it = s.values();
        return Array.from(it);
    }
    readLog(f) {
        let files = f.target.files;
        let reader = new FileReader();
        reader.readAsText(files[0]);
        var tasks_array = [];
        reader.onload = f => {
            this.setState({ fileData: f.target.result });
            var show = document.getElementById("show"); // for testing purposes
            var data = this.state.fileData;
            var lines = data.split("\n");

            var W = [];

            for (let i = 0; i < lines.length; i++) {
                var w1 = lines[i].split(",");
                var taskinW = [];
                var id = parseInt(w1[0].toString());
                for (let j = 0; j < lines.length; j++) {
                    var w2 = lines[j].split(",");
                    if (parseInt(w2[0].toString()) == id) {
                        taskinW.push(w2[1].toString().trim());
                    }
                }
                W.push(taskinW);
            }
            W = [...new Set(W.map(v => JSON.stringify(v)))].map(v =>
                JSON.parse(v)
            );

            var names = [];
            for (let i = 0; i < lines.length; i++) {
                var words = lines[i].split(",");
                if (
                    words[1]
                        .toString()
                        .trim()
                        .localeCompare("") !== 0
                ) {
                    names.push(words[1].toString().trim());
                }
            }
            names = this.remove_duplicates(names);

            for (let i = 0; i < names.length; i++) {
                var task = this.state.Task;
                task.name = names[i].toString();
                var copyTask = Object.assign({}, task);
                tasks_array.push(copyTask);
            }
            var IDNumber = 0;
            /* Duration for each task */
            for (let t = 0; t < tasks_array.length; t++) {
                var name = tasks_array[t].name.toString();
                var startDate, endDate;
                for (let l = 0; l < lines.length; l++) {
                    var cols = lines[l].split(",");
                    if (
                        cols[1]
                            .toString()
                            .trim()
                            .localeCompare(name) == 0 &&
                        cols[3]
                            .toString()
                            .trim()
                            .localeCompare("started") == 0
                    ) {
                        startDate = new Date(cols[4].toString().trim());
                    } else if (
                        cols[1]
                            .toString()
                            .trim()
                            .localeCompare(name) == 0 &&
                        cols[3]
                            .toString()
                            .trim()
                            .localeCompare("completed") == 0
                    ) {
                        endDate = new Date(cols[4].toString().trim());
                    }
                }
                tasks_array[t].id = IDNumber;
                IDNumber++;
                tasks_array[t].duration = parseInt(
                    (endDate - startDate) / (1000 * 60 * 60 * 24)
                );

            }

            /**************************/
            var predecessor_names_all = [];
            for (let i = 0; i < tasks_array.length; i++) {
                var predecessor_names = [];
                var task_name = tasks_array[i].name.toString();
                for (let j = 0; j < W.length; j++) {
                    for (let k = 0; k < W[j].length; k++) {
                        var element = W[j][k].toString();
                        if (element.toString().localeCompare(task_name) == 0) {
                            if (typeof W[j][k - 1] !== "undefined") {
                                var prevTask = W[j][k - 1].toString();
                                predecessor_names.push(prevTask);
                            }
                        }
                    }
                }
                predecessor_names = this.remove_duplicates(predecessor_names);
                predecessor_names_all.push(predecessor_names);
            }
            for (let i = 0; i < tasks_array.length; i++) {
                var predecessor_tasks = [];
                var task_names = predecessor_names_all[i];
                for (let k = 0; k < task_names.length; k++) {
                    for (let t = 0; t < tasks_array.length; t++) {
                        if (
                            tasks_array[t].name.localeCompare(
                                task_names[k]
                            ) == 0
                        ) {
                            let objCopy = Object.assign({}, tasks_array[t]);
                            predecessor_tasks.push(objCopy);
                        }
                    }
                }
                // let objCopy = Object.assign({}, predecessor_tasks);
                tasks_array[i].predecessors = predecessor_tasks;
            }

            // to get file name
            var fullPath = document.getElementById("logButton").value;
            if (fullPath) {
                var startIndex =
                    fullPath.indexOf("\\") >= 0
                        ? fullPath.lastIndexOf("\\")
                        : fullPath.lastIndexOf("/");
                var filename = fullPath.substring(
                    startIndex,
                    fullPath.length - 4
                );
                if (
                    filename.indexOf("\\") === 0 ||
                    filename.indexOf("/") === 0
                ) {
                    filename = filename.substring(1, fullPath.length - 4);
                }
            }

            this.project = {
                projectName: filename,
                tasks: tasks_array,
            };
            this.setState({
                project: this.project
            })
        };
    }
    render() {
        return (
            <div>
                <div className="ml-2 log-wrapper">
                    <label>
                        {"Upload a log "}
                        <input id="logButton" className=" mr-3 py-1 px-1" type="file" onChange={f => this.readLog(f)}
                        />
                    </label>
                    <button className="select-btn py-1" onClick={this.submit}>Submit</button>
                    <button className="select-btn py-1 ml-2" data-toggle="modal" data-target="#log-example">log example</button>
                    <p id="show" />
                </div>

                <div className="modal fade" id="log-example" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">

                            <div className="modal-body log-example">
                                <div><small className="text-danger">*log example* <span className="text-muted">(file.txt comma seprated fields)</span></small></div>
                                <img src="/images/log 2.png" style={{ width: 100 + "%" }} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogReader;
