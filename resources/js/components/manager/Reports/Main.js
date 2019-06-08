import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios'
import NavColumn from './nav'
import ReportBody from "./ReportBody"
class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: {},
            employees: {},
            seletedTabInfo: { "id": null, "type": null }
        }
        this.getID = this.getID.bind(this);
    }
    componentWillMount() {

        axios.get("/reports/getAllData").then(response => {
            this.setState({
                employees: response.data[0],
                projects: response.data[1],
            })
        });
    }
    getID(info) {
        this.setState({ seletedTabInfo: info })
    }


    render() {
        return (<div>
            <div className="row m-0">
                <div className="col-2  p-0" style={{ height: "100vh", overflowY: "auto", boxShadow: "14px -1px 35px -27px rgba(0,0,0,0.75)" }}>
                    <NavColumn employees={this.state.employees} getID={this.getID} projects={this.state.projects} />
                </div>
                <div className="col-10  p-0" style={{ overflowY: "hidden", height: "100vh" }}>
                    <div style={{
                        backgroundImage: 'url("/images/backgrounds/back.png")',
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        height: "100%"
                    }}>
                        <ReportBody info={this.state.seletedTabInfo} />
                    </div>

                </div>
            </div>
        </div>)
    }
}
export default Reports;
if (document.getElementById("ReportsContainer")) {
    ReactDOM.render(
        <Reports />,
        document.getElementById("ReportsContainer")
    );
}
