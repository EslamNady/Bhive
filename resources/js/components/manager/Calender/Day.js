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

        this.setState({
            name: this.props.name,
            in: this.props.day.in,
            out: this.props.day.out,
            weekend: (this.props.day.in == "null" && this.props.day.out == "null") ? true : false,
        })
    }

    input() {
        console.log(this.state.in);
        if (!this.state.weekend) {
            return (<React.Fragment>
                <input className="form-control" onChange={this.changeIN} ref="in" value={this.state.in} type="time" />
                <input className="form-control" onChange={this.changeOut} ref="out" value={this.state.out} type="time" />
            </React.Fragment>)
        } else {
            return (<React.Fragment>
                <input className="form-control" onChange={console.log("a dah")} value={this.state.in} type="time" disabled />
                <input className="form-control" onChange={console.log("a dah")} value={this.state.out} type="time" disabled />
            </React.Fragment>)
        }
    }
    changeIN() {
        this.props.fireDB.child("TimeTable/" + this.state.name + "/in").set(this.refs.in.value)
    }
    changeOut() {
        this.props.fireDB.child("TimeTable/" + this.state.name + "/out").set(this.refs.out.value)
    }
    weekend(e) {
        if (e.target.checked) {
            this.props.fireDB.child("TimeTable/" + this.state.name).set({ in: "null", out: "null" })
        } else {
            this.props.fireDB.child("TimeTable/" + this.state.name).set({ in: "08:00", out: "19:00" })
        }
        this.setState({ weekend: e.target.checked });

    }

    render() {
        return (<div>
            <div className="form-group form-inline">
                <label>{this.state.name}</label>
                {this.input()}
                <label className="ml-2">weekend:</label><input onChange={this.weekend} checked={this.state.weekend} type="checkbox" />
            </div>
        </div>);
    }
}

export default Day;