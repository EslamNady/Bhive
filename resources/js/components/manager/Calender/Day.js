import React, { Component } from 'react';
class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            in: "",
            out: "",
            weekend: false
        }
        this.input = this.input.bind(this)
        this.weekend = this.weekend.bind(this)
        this.changeIN = this.changeIN.bind(this);
        this.changeOut = this.changeOut.bind(this);


    }
    componentWillReceiveProps(nextProps) {

        this.setState({
            name: nextProps.name,
            in: nextProps.day.in,
            out: nextProps.day.out,
            weekend: (nextProps.day.in == "null" && nextProps.day.out == "null") ? true : false,
        })
    }
    componentWillMount() {
        this.timerIn = null;
        this.timerOut = null;
        this.setState({
            name: this.props.name,
            in: this.props.day.in,
            out: this.props.day.out,
            weekend: (this.props.day.in == "null" && this.props.day.out == "null") ? true : false,
        })
    }

    input() {

        if (!this.state.weekend) {
            if (this.props.EditingMode) {
                return (<React.Fragment>
                    <input className="form-control" onChange={this.changeIN} ref="in" value={this.state.in} type="time" />
                    <input className="form-control" onChange={this.changeOut} ref="out" value={this.state.out} type="time" />
                </React.Fragment>)
            } else {
                return (<React.Fragment>
                    <input className="form-control" onChange={this.changeIN} ref="in" value={this.state.in} disabled type="time" />
                    <input className="form-control" onChange={this.changeOut} ref="out" value={this.state.out} disabled type="time" />
                </React.Fragment>)
            }
        } else {
            return (<React.Fragment>
                <input className="form-control text-center" onChange={console.log()} value={"Weekend"} type="text" disabled />
            </React.Fragment>)
        }
    }
    dayLabel() {
        if (!this.state.weekend) {
            return (
                <React.Fragment>
                    <label className="text-success">{this.state.name}</label>
                </React.Fragment>
            )
        } else {
            return (

                <label className="text-secondary">{this.state.name}</label>
            )
        }
    }
    changeIN() {

        clearTimeout(this.timerIn);

        this.setState({ in: this.refs.in.value });

        this.timerIn = setTimeout(() => {


            if (this.refs.in.value == "") {
                this.props.fireDB.child(this.props.target + this.state.name).set({ in: "null", out: "null" })
                this.setState({ weekend: true })
            }
            else
                this.props.fireDB.child(this.props.target + this.state.name + "/in").set(this.refs.in.value)

        }, 700);

        // if (this.props.target.substring(0, this.props.target.indexOf('/')) == "Employees") {
        //     this.props.fireDB.child(this.props.empPath + "timeTableStatus").set("custom");
        // }
    }
    changeOut() {

        clearTimeout(this.timerOut);

        this.setState({ out: this.refs.out.value });

        this.timerOut = setTimeout(() => {

            if (this.refs.out.value == "") {
                this.props.fireDB.child(this.props.target + this.state.name).set({ in: "null", out: "null" })
                this.setState({ weekend: true })
            }
            else
                this.props.fireDB.child(this.props.target + this.state.name + "/out").set(this.refs.out.value)

        }, 700);
        // if (this.props.target.substring(0, this.props.target.indexOf('/')) == "Employees") {
        //     this.props.fireDB.child(this.props.empPath + "timeTableStatus").set("custom");
        // }
    }
    weekend(e) {
        if (e.target.checked) {
            this.props.fireDB.child(this.props.target + this.state.name).set({ in: "null", out: "null" })
        } else {
            this.props.fireDB.child(this.props.target + this.state.name).set({ in: "09:00", out: "17:00" })
        }
        this.setState({ weekend: e.target.checked });

        if (this.props.target.substring(0, this.props.target.indexOf('/')) == "Employees") {
            this.props.fireDB.child(this.props.empPath + "timeTableStatus").set("custom");
        }

    }
    showWeekendCheckbox() {
        if (this.props.EditingMode)
            return (<React.Fragment>
                <label className="ml-2">weekend:</label> <input className="ml-1 weekend-checkbox" onChange={this.weekend} checked={this.state.weekend} type="checkbox" />
            </React.Fragment>
            );
    }

    render() {
        return (<div>
            <div className="container mb-1">

                <div className="row mx-auto" style={{ width: "80%" }}>
                    <div className="col-1 text-right text-uppercase font-weight-bold pt-2 pr-0 " >

                        {this.dayLabel()}
                    </div>
                    <div className="col-10">
                        <div className="d-flex flex-row justify-content-center">

                            {this.input()}

                        </div>
                    </div>
                    <div className="col-1 pt-2 pl-0 text-nowrap">
                        {this.showWeekendCheckbox()}
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Day;