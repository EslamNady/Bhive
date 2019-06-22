import React, { Component } from 'react';
import jsPDF from 'jspdf'
import axios from 'axios';
import $ from 'jquery';
import html2canvas from 'html2canvas'
import Crm from '../../viewProject/Crm'
class ReportBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: {},
            loading: false,
        }
        this.downloadPDF = this.downloadPDF.bind(this);
        this.skills = this.skills.bind(this);
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
            var pageHeight = doc.internal.pageSize.getHeight() * 4.0;
            var imgHeight = canvas.height;
            var heightLeft = imgHeight;


            var position = 0;

            doc.addImage(imgData, 'PNG', 0, position);
            (heightLeft) -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                position /= 4.0;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position + 10);
                heightLeft -= pageHeight;
            }

            // doc.addImage(imgData, 'PNG', 0, 0);


            if (i == len) {
                if (this.props.info.type === 'employee') {
                    doc.save(`${this.state.content.personalInfo.first_name} ${this.state.content.personalInfo.last_name}.pdf`);
                } else if (this.props.info.type === 'project') {
                    doc.save(`${this.state.content.project.name}.pdf`);
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
                        data.timeTable = this.orderDaysObject(data.timeTable);
                        var projects = [];
                        data.tasks.forEach((task) => {

                            if (!(projects.filter(e => e.id === task.project_id).length > 0)) {
                                projects.push({ "id": task.project_id, "name": task.project_name });
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
                        var projectProgress = 0;
                        var endDate = "";
                        data.taskDetails.forEach((task) => {
                            projectProgress = projectProgress + parseFloat(task.progress);
                            task.endDate.date = task.endDate.date.substring(0, task.endDate.date.indexOf(" "));
                            task.startDate.date = task.startDate.date.substring(0, task.startDate.date.indexOf(" "));
                            if (task.endDate.date > endDate) {
                                endDate = task.endDate.date;
                            }
                        });
                        projectProgress /= data.taskDetails.length;
                        data.project.progress = projectProgress;
                        data.project.endDate = endDate;

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
    skills() {
        if (this.state.content.skills.length === 0) {
            return (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50px', width: "100%" }}>
                    <p>
                        No Assigned skills
                    </p>
                </div>
            );
        }
        else {
            var levels = ['Little knowledge', 'Beginner', 'Intermediate', 'Consultant', 'Professional'];
            return (
                <React.Fragment>
                    {this.state.content.skills.map((skill, i) => (
                        <div key={i} style={{ backgroundColor: '#e6efff', color: "#001433", borderRadius: "4px" }} className="px-2 py-1 mx-2 my-2 font-weight-bold">
                            <span className='d-inline-block pr-2'>{skill.skill_name}</span>
                            <span className='d-inline-block  text-muted'>{levels[parseInt(skill.pivot.skill_level)]}</span>
                        </div>
                    ))}
                </React.Fragment>
            );
        }
    }
    render() {
        var d = new Date();
        var date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        if (this.props.info.id === null) {
            return (<div className="d-flex justify-content-center align-items-center " style={{ height: "100%" }}>
                <p>No seleted Report</p>
            </div>);
        } else {
            if (!this.state.loading) {
                if (this.props.info.type === 'employee') {

                    return (
                        <div style={{ position: "relative", height: "100%" }} >
                            <div className="text-right" style={{ position: 'absolute', bottom: "0", height: "55px", width: "100%", backgroundColor: "rgba(0,0,0,0.4)", zIndex: 2 }}>
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
                                                <div style={{ position: 'relative', bottom: '0px' }} className="page-footer pb-2 px-3">

                                                    <div>
                                                        <span className='font-weight-bold'>Reported at: </span>
                                                        <small>{date}</small>
                                                    </div>

                                                </div>
                                                <hr />
                                                <div className="personal-info">
                                                    <h5 className="pl-3 mb-2">Personal information</h5>
                                                    <div className=" pl-5">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div><small className="text-muted">Title: </small>{`${this.state.content.personalInfo.title}`}</div>
                                                                <div><small className="text-muted">Name: </small>{`${this.state.content.personalInfo.first_name} ${this.state.content.personalInfo.last_name}`}</div>
                                                                <div>
                                                                    <small className="text-muted">score: </small>{`${this.state.content.score}`}
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
                                                <hr />
                                                <div className="skills">
                                                    <h5 className="pl-3 mb-2">Skills</h5>
                                                    <div className="pl-4">
                                                        <div className="skills-wrapper d-flex  flex-wrap justify-content-start" style={{ border: '2px solid rgba(0,0,0,0.4)', backgroundColor: '#fafafa' }}>
                                                            {this.skills()}
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
                    return (
                        <div style={{ position: "relative", height: "100%" }} >
                            <div className="text-right" style={{ position: 'absolute', bottom: "0", height: "55px", width: "100%", backgroundColor: "rgba(0,0,0,0.4)", zIndex: 2 }}>
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
                                                <div style={{ position: 'relative', bottom: '0px' }} className="page-footer pb-2 px-3">

                                                    <div>
                                                        <span className='font-weight-bold'>Reported at: </span>
                                                        <small>{date}</small>
                                                    </div>

                                                </div>
                                                <hr />
                                                <div className="Project-info">
                                                    <h5 className="pl-3 mb-2">Project information</h5>
                                                    <div className=" pl-5">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div><small className="text-muted">Project name: </small>{`${this.state.content.project.name}`}</div>
                                                                <div><small className="text-muted">Manager: </small>{`${this.state.content.project.manager_name}`}</div>
                                                                <div><small className="text-muted">Progress: </small>{`${this.state.content.project.progress.toFixed(1)}%`}</div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div><small className="text-muted">Starts in: </small>{`${this.state.content.project.startDate}`}</div>
                                                                <div><small className="text-muted">Ends in: </small>{`${this.state.content.project.endDate}`}</div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="row  mt-1">
                                                                    <div className="col-2 pr-1">
                                                                        <small className=" text-muted">Description: </small>
                                                                    </div>
                                                                    <div className="col-10 pl-0">
                                                                        <span className="d-inline-block mt-2 p-1" style={{ minHeight: '58px', width: "95%", border: '1px solid rgba(0,0,0,0.3', borderRadius: '3px' }}>{`${this.state.content.project.description}`}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />

                                                <div className="Project-tasks">
                                                    <h5 className="pl-3 mb-4">Project Tasks</h5>
                                                    <div className='d-flex justify-content-center align-items-center'>
                                                        <div style={{ width: "85%" }}>
                                                            <table className="table text-center">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Task name</th>
                                                                        <th scope="col">Assigned to</th>
                                                                        <th scope="col">Progress</th>
                                                                        <th scope="col">Start date</th>
                                                                        <th scope="col">End date</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Object.keys(this.state.content.taskDetails).map((key, i) => (
                                                                        <tr key={i}>
                                                                            <td className="font-weight-bold">{this.state.content.taskDetails[key]['name']}</td>
                                                                            <td>
                                                                                {Object.keys(this.state.content.taskDetails[key]['employees']).map((key2, j) => (
                                                                                    <div key={j}>
                                                                                        <div>
                                                                                            <small className="text-muted">{`${this.state.content.taskDetails[key]['employees'][key2]['title']}/ `}</small>
                                                                                            <span>{`${this.state.content.taskDetails[key]['employees'][key2]['first_name']} ${this.state.content.taskDetails[key]['employees'][key2]['last_name']}`}</span>
                                                                                        </div>
                                                                                        <hr style={{ marginTop: '0px' }} />
                                                                                    </div>
                                                                                ))}
                                                                            </td>
                                                                            <td>{this.state.content.taskDetails[key]['progress']}%</td>
                                                                            <td>{this.state.content.taskDetails[key]['startDate']['date']}</td>
                                                                            <td>{this.state.content.taskDetails[key]['endDate']['date']}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                </div>
                                                <hr />

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
                                                <div className="project-gantt">
                                                    <h5 className="pl-3 mb-2">Gantt chart</h5>
                                                    <div style={{ zIndex: 1 }}>
                                                        <Crm projectTasks={this.state.content.taskDetails} />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    )
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