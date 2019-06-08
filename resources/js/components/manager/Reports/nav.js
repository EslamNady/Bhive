import React, { Component } from 'react';
import Tab from './Tab'
class NavColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const tabStyle = {
            borderRadius: 0,
            borderBottom: "2px solid #090c11"
        }
        return (<div style={{ backgroundColor: "#10171F", height: "100%" }}>
            <div style={{
                height: '100%', backgroundImage: ' url(/images/backgrounds/dots.png)'
                , backgroundPosition: "center center",
                backgroundSize: "cover"
            }}>
                <div className="bg-white">
                    <div className="py-3 text-center " style={{
                        backgroundImage: 'url("/images/backgrounds/back.png")',
                        backgroundPosition: "left center",

                    }} >
                        <img src="/images/logo 1.png" style={{ width: '60%' }} />
                    </div>
                </div>
                <hr style={{ margin: 0 }} />
                <div className="tabs-container pt-3" >
                    <div className="text-center btn btn-secondary btn-sm btn-block dropdown-toggle" data-toggle="collapse" data-target="#projects-wrapper" aria-expanded="false" style={tabStyle}>Projects</div>
                    <div className="collapse" id="projects-wrapper" >
                        <ul className="list-group">
                            {Object.keys(this.props.projects).map((key, i) => (
                                <Tab key={i} type="project" getID={this.props.getID} obj={this.props.projects[key]} />
                            ))}
                        </ul>
                    </div>
                    <div className="text-center btn btn-secondary btn-sm btn-block dropdown-toggle" data-toggle="collapse" data-target="#employees-wrapper" aria-expanded="false" style={tabStyle}>Employees</div>
                    <div className="collapse" id="employees-wrapper" >
                        <ul className="list-group">
                            {Object.keys(this.props.employees).map((key, i) => (
                                <Tab key={i} type="employee" getID={this.props.getID} obj={this.props.employees[key]} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default NavColumn;