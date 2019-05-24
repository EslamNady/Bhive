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
        this.showWeekendCheckBox = this.showWeekendCheckBox.bind(this);



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
            if (this.props.editingMode) {
                return (<React.Fragment>
                    <input className="form-control" onChange={this.changeIN} ref="in" value={this.state.in} type="time" />
                    <input className="form-control" onChange={this.changeOut} ref="out" value={this.state.out} type="time" />
                </React.Fragment>)
            }
            else {
                return (<React.Fragment>
                    <input className="form-control" onChange={this.changeIN} ref="in" value={this.state.in} type="time" disabled />
                    <input className="form-control" onChange={this.changeOut} ref="out" value={this.state.out} type="time" disabled />
                </React.Fragment>)
            }
        } else {
            return (<React.Fragment>
                <input className="form-control text-center" onChange={console.log()} value={"Weekend"} type="text" disabled />
                {/* <input className="form-control" onChange={console.log("a dah")} value={this.state.out} type="time" disabled /> */}
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
                this.setState({ in: "null", out: "null", weekend: true }, () => {
                    this.sendUpdates()
                })
            }
            else {
                this.setState({ 'in': this.refs.in.value }, () => {
                    this.sendUpdates()
                });
            }


        }, 700);


    }
    changeOut() {

        clearTimeout(this.timerOut);

        this.setState({ out: this.refs.out.value });

        this.timerOut = setTimeout(() => {

            if (this.refs.out.value == "") {
                this.setState({ in: "null", out: "null", weekend: true }, () => {
                    this.sendUpdates()
                })
            }
            else {
                this.setState({ 'out': this.refs.out.value }, () => {
                    this.sendUpdates()
                });
            }


        }, 700);

    }
    showWeekendCheckBox() {
        if (this.props.editingMode) {
            return (<React.Fragment>
                <label className="ml-2">weekend:</label> <input className="ml-1 weekend-checkbox" onChange={this.weekend} checked={this.state.weekend} type="checkbox" />
            </React.Fragment>
            );
        }
    }
    weekend(e) {
        if (e.target.checked) {
            this.setState({ in: "null", out: "null" }, () => {
                this.sendUpdates()
            })

        } else {

            this.setState({ in: "09:00", out: "17:00" }, () => {
                this.sendUpdates()
            })
        }
        this.setState({ weekend: e.target.checked }, () => {
            this.sendUpdates()
        });



    }
    sendUpdates() {
        this.props.onUpdate(this.state);
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
                        {this.showWeekendCheckBox()}
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Day;