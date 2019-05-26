import React, { Component } from 'react';
import Calendar from 'react-calendar';
import $ from "jquery"
import Holiday from "./holiday"
class Holidays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            dateFormat: " ",
            holidays: " "
        }

    }
    componentDidMount() {
        this.setState({
            dateFormat: ("0" + (this.state.date.getMonth() + 1)).slice(-2) + "-" + ("0" + this.state.date.getDate()).slice(-2)
        })

        this.props.fireDB.child('Holidays').on('value', snap => {

            this.setState({
                holidays: snap.val()
            })
            console.log(this.state.holidays)
        })


        $(document).ready(() => {

            this.removeYearLabel();

            $('.react-calendar__navigation__arrow').click(() => {
                this.removeYearLabel();
            });


        });
    }
    removeYearLabel() {
        setTimeout(() => {

            var label = $(".react-calendar__navigation__label").html();
            label = label.substring(0, label.indexOf(" "));
            $('.react-calendar__navigation__label').html(label);
        }, 0.1)
    }
    changeDate(date) {
        this.setState({
            date: date,
            dateFormat: ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
        })

    }
    addHoli() {
        if (this.refs.holiName.value != "" && this.refs.holiName.value != " ") {
            this.props.fireDB.child("Holidays/" + this.state.dateFormat).set({ 'name': this.refs.holiName.value });
        }
    }

    showHolidays() {
        if (!this.isEmpty(this.state.holidays)) {
            return (
                <React.Fragment>
                    {Object.keys(this.state.holidays).map((key, i) => (
                        <Holiday key={i} date={key} name={this.state.holidays[key]["name"]} fireDB={this.props.fireDB} />

                    ))}
                </React.Fragment>
            );
        }
    }
    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render() {

        return (
            <div className="py-4">
                <div className="row">
                    <div className="col-4">
                        <Calendar onChange={this.changeDate.bind(this)} value={this.state.date} />
                        <div className="text-left">
                            <div className="badge badge-primary ml-2">
                                {this.state.dateFormat}
                            </div>
                        </div>
                        <div className="d-flex flex-row mt-1 justify-content-center align-items-center" >
                            <textarea type="text" className="form-control " ref="holiName" placeholder="Holiday name" style={{ resize: "none" }} />
                            <button onClick={this.addHoli.bind(this)} className="btn btn-sm btn-success ml-1 ">Add Holiday</button>
                        </div>
                    </div>
                    <div className="col-8">
                        <ul className="list-group" >
                            <li className="list-group-item" style={{ boxShadow: "black 0px 3px 6px -5px", zIndex: "2" }}>
                                <div className="row">
                                    <div className="col-2 text-center" style={{ borderRight: "1px solid black" }}>
                                        <strong className="text-danger">MM-DD</strong>
                                    </div>
                                    <div className="col-8 pl-2 text-nowrap" style={{ overflowX: "auto" }}>
                                        <strong>Holiday name</strong>
                                    </div>
                                    <div className="col-2 text-right">

                                    </div>
                                </div>
                            </li>
                            <div className="pt-1" style={{ maxHeight: "313px", overflowY: "auto" }}>
                                {this.showHolidays()}
                            </div>
                        </ul>
                    </div>
                </div>

            </div>

        );
    }
}

export default Holidays;