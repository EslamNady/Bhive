import React, { Component } from 'react';
import jsPDF from 'jspdf'
import axios from 'axios';
import $ from 'jquery';
import html2canvas from 'html2canvas'
class ReportBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: {},
            loading: false,
        }
        this.downloadPDF = this.downloadPDF.bind(this);
    }
    downloadPDF() {
        var doc = new jsPDF("p", "mm", "a4")
        var len = $('.page').length;
        var i = 1;
        this.renderpdf(doc, i, len);
    }

    renderpdf(doc, i, len) {
        html2canvas(document.getElementById('page' + i)).then(canvas => {
            var imgData = canvas.toDataURL('image/png');
            var pageHeight = doc.internal.pageSize.getHeight() * 4.5;
            var imgHeight = canvas.height;
            var heightLeft = imgHeight;


            var position = 0;

            doc.addImage(imgData, 'PNG', 0, position);
            (heightLeft) -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                position /= 4.5;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position + 7);
                heightLeft -= pageHeight;
            }

            // doc.addImage(imgData, 'PNG', 0, 0);


            if (i == len) {
                if (this.props.info.type === 'employee') {
                    doc.save(`${this.state.content.personalInfo.first_name} ${this.state.content.personalInfo.last_name}.pdf`);
                }
                return;
            } else {
                doc.addPage(i);
                this.renderpdf(doc, i + 1, len)
            }
        });
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ loading: true });
        var info = nextProps.info; //{id:id,type:type}
        if (info.id !== null) {
            axios({
                method: "post",
                url: "reports/content",
                data: {
                    id: info.id,
                    type: info.type,
                }
            }).
                then(response => {
                    var data = response.data;
                    if (info.type === 'employee') {
                        var projects = [];
                        data.timeTable = this.orderDaysObject(data.timeTable);
                        data.tasks.forEach((task) => {
                            if (!projects.includes(task.project_id)) {
                                projects.push({ "id": task.project_id, "name": task.project_name });
                                //feh project name zy id blzabt
                            }
                        });
                        var projectsTasks = [];
                        projects.forEach((project) => {
                            var tasks = [];
                            data.tasks.forEach((task) => {
                                if (task.project_id === project.id) {
                                    tasks.push({
                                        'name': task.name,
                                        'duration': task.duration,
                                        'progress': task.progress,
                                        'start': task.startDate.date.substring(0, task.startDate.date.indexOf(' ')),
                                        'end': task.endDate.date.substring(0, task.endDate.date.indexOf(' '))
                                    })
                                }
                            });
                            projectsTasks.push({ 'projectID': project.id, 'projectName': project.name, 'tasks': tasks });
                        });
                        data.projectsTasks = projectsTasks;

                    }
                    else {

                    }
                    this.setState({ content: data }, () => {
                        console.log(this.state.content);
                        this.setState({ loading: false })
                    });

                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
    }
    orderDaysObject(days) {
        const sorter = {
            // "sunday": 0, // << if sunday is first day of week
            "mon": 1,
            "tue": 2,
            "wed": 3,
            "thu": 4,
            "fri": 5,
            "sat": 6,
            "sun": 7
        }

        const ordered = {};
        Object.keys(days).sort(function sortByDay(a, b) {
            let day1 = a.toLowerCase();
            let day2 = b.toLowerCase();
            return sorter[day1] - sorter[day2];
        }).forEach(function (key) {
            ordered[key] = days[key];
        });
        return ordered;
    }
    render() {

        if (this.props.info.id === null) {
            return (<div className="d-flex justify-content-center align-items-center " style={{ height: "100%" }}>
                <p>No seleted Report</p>
            </div>);
        } else {
            if (!this.state.loading) {
                if (this.props.info.type === 'employee') {

                    return (<div style={{ position: "relative", height: "100%" }} >
                        <div className="text-right" style={{ position: 'absolute', bottom: "0", height: "55px", width: "100%", backgroundColor: "rgba(0,0,0,0.4)" }}>
                            <button className="btn btn-danger btn-small mr-4 my-2" onClick={this.downloadPDF}>Download Report</button>
                        </div>
                        <div className="report-body p-3 " style={{ height: '100%', overflowY: 'auto' }}>
                            <div className="pages-wrapper pb-5">
                                <div className="bg-white my-3 mx-auto" style={{ minHeight: '1000px', width: '780px', boxShadow: ' 0px 8px 26px -12px rgba(0,0,0,0.75)', borderRadius: '3px' }}>
                                    <div className="page p-3" id='page1' style={{ minHeight: '1000px', width: '100%' }}>
                                        <div className="pdf-header py-2">
                                            <div className="text-center">
                                                <img src="/images/logo 1.png" style={{ width: '105px' }} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="page-body py-2">
                                            <div className="personal-info">
                                                <h5 className="pl-3 mb-2">Personal information</h5>
                                                <div className=" pl-5">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div><small className="text-muted">Title: </small>{`${this.state.content.personalInfo.title}`}</div>
                                                            <div><small className="text-muted">Name: </small>{`${this.state.content.personalInfo.first_name} ${this.state.content.personalInfo.last_name}`}</div>
                                                            <div>
                                                                <small className="text-muted">score: </small>{`${this.state.content.score.toFixed(2)}`}
                                                                <small className="d-inline-block ml-2 text-muted" >{`(Attedance: ${this.state.content.attendanceScore.toFixed(2)}  Tasks: ${this.state.content.tasksScore.toFixed(2)})`}</small>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div><small className="text-muted">Absence Persentage: </small>{`${this.state.content.absencePercent.toFixed(1)}%`}</div>
                                                            <div><small className="text-muted">Total working experience: </small>{`${this.state.content.totalHours.toFixed(1)}H`}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="timeTable">
                                                <h5 className="pl-3 mb-4">Time Table</h5>
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <div style={{ width: "85%" }}>
                                                        <table className="table text-center">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Day</th>
                                                                    <th scope="col">Enter</th>
                                                                    <th scope="col">Leave</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Object.keys(this.state.content.timeTable).map((key, i) => (
                                                                    <tr key={i}>
                                                                        <td className="font-weight-bold">{key}</td>
                                                                        <td>{this.state.content.timeTable[key]['in'] === 'null' ? 'Weekend' : this.state.content.timeTable[key]['in']}</td>
                                                                        <td>{this.state.content.timeTable[key]['out'] === 'null' ? 'Weekend' : this.state.content.timeTable[key]['out']}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>


                                    </div>
                                </div>
                                <div className="bg-white my-3 mx-auto" style={{ minHeight: '1000px', width: '780px', boxShadow: ' 0px 8px 26px -12px rgba(0,0,0,0.75)', borderRadius: '3px' }}>
                                    <div className="page p-3" id='page2' style={{ minHeight: '1000px', width: '100%' }}>
                                        <div className="pdf-header py-2">
                                            <div className="text-center">
                                                <img src="/images/logo 1.png" style={{ width: '105px' }} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="page-body py-2">
                                            <div className="projects">
                                                <h5 className="pl-3 mb-3">Projects</h5>
                                                <div className="pl-4">
                                                    {Object.keys(this.state.content.projectsTasks).map((key, i) => (
                                                        <div className="project-wrapper my-1 pl-5" key={i}>
                                                            <div className="row pl-4">
                                                                <div className="col-4">
                                                                    <h6 className="project-name"><small className="text-muted">Project name: </small>{`${this.state.content.projectsTasks[key]['projectName']}`}</h6>
                                                                </div>
                                                                <div className="col-8">
                                                                    <div className="tasks-wrapper pl-3 pt-3">
                                                                        {Object.keys(this.state.content.projectsTasks[key]['tasks']).map((key2, j) => (
                                                                            <div className="task-info my-1" key={j}>
                                                                                <div className="row">
                                                                                    <div className="col-4">
                                                                                        <span className="font-weight-bold">{this.state.content.projectsTasks[key]['tasks'][key2].name}</span>
                                                                                    </div>
                                                                                    <div className="col-8">
                                                                                        <div><small className="text-muted">starts in: </small>{this.state.content.projectsTasks[key]['tasks'][key2].start}</div>
                                                                                        <div><small className="text-muted">ends in: </small>{this.state.content.projectsTasks[key]['tasks'][key2].end}</div>
                                                                                        <div><small className="text-muted">Duration: </small>{this.state.content.projectsTasks[key]['tasks'][key2].duration} Days</div>
                                                                                        <div><small className="text-muted">Progress: </small>{this.state.content.projectsTasks[key]['tasks'][key2].progress}%</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='px-3 mx-5'><hr /></div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="px-5"><hr /></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </ div>)

                } else if (this.props.info.type === 'project') {
                    return (<div>hiiii</div>)
                }
            } else {
                return (<div className="d-flex justify-content-center align-items-center " style={{ height: "100%" }}>
                    <p>Loading...</p>
                </div>);
            }



            // return (<div style={{ position: "relative", height: "100%" }} >
            //     <div className="text-right" style={{ position: 'absolute', bottom: "0", height: "55px", width: "100%", backgroundColor: "rgba(0,0,0,0.4)" }}>
            //         <button className="btn btn-danger btn-small mr-3 my-2" onClick={this.downloadPDF}>Download Report</button>
            //     </div>
            //     <div className="report-body p-3 " style={{ height: '100%', overflowY: 'auto' }}>
            //         <div className="pb-5">
            //             <div className="page bg-white mx-auto" id='page1' style={{ height: '680px', width: '650px', boxShadow: ' 0px 8px 26px -12px rgba(0,0,0,0.75)', borderRadius: '3px' }}>
            //                 {`${this.props.info.id} ${this.props.info.type}`}

            //             </div>
            //         </div>
            //     </div>
            // </ div>)
        }
    }
}

export default ReportBody;