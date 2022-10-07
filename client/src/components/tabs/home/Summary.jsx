import React, { useState } from "react";

export default function Summary(props) {
    const [collapsed, collapseStats] = useState(true);

    const origDate = new Date().toDateString();
    const dateArray = origDate.split(" ");
    const dateNum = dateArray[2].split("");
    const date = {
      weekDay: "",
      day: "",
      month: "",
      year: dateArray[3]
    }
    switch(dateArray[0]) {
      case "Mon":
        date.weekDay = "Monday";
        break;
      case "Tue":
        date.weekDay = "Tuesday";
        break;
      case "Wed":
        date.weekDay = "Wednesday";
        break;
      case "Thu":
        date.weekDay = "Thursday";
        break;
      case "Fri":
        date.weekDay = "Friday";
        break;
      case "Sat":
        date.weekDay = "Saturday";
        break;
      case "Sun":
        date.weekDay = "Sunday";
        break;
      default:
        break;
    }
    switch(dateArray[1]) {
      case "Jan":
        date.month = "January";
        break;
      case "Feb":
        date.month = "February";
        break;
      case "Mar":
        date.month = "March";
        break;
      case "Apr":
        date.month = "April";
        break;
      case "May":
        date.month = "May";
        break;
      case "Jun":
        date.month = "June";
        break;
      case "Jul":
        date.month = "July";
        break;
      case "Aug":
        date.month = "August";
        break;
      case "Sep":
        date.month = "September";
        break;
      case "Oct":
        date.month = "October";
        break;
      case "Nov":
        date.month = "November";
        break;
      case "Dec":
        date.month = "December";
        break;
      default:
        break;
    }
    switch(dateNum[1]) {
      case "1":
        date.day = dateArray[2] + "st";
        break;
      case "2":
        date.day = dateArray[2] + "2nd";
        break;
      case "3":
        date.day = dateArray[2] + "rd";
        break;
      default:
        date.day = dateArray[2] + "th";
        break;
  
    }

    const employeeCount = 5;


    return (
        <div className="summary">
            <h2>Summary</h2>
            <div className="summary-header">
                <h6>Welcome to TeamEZ! Today is</h6>
                <h5><strong>{date.weekDay}, {date.month} {date.day}, {date.year}</strong></h5>
            </div>
            <div className="divider"></div>
            <div className="card-body">
                <p>Your team currently has <strong>{props.managers.length}</strong> managers 
                and <strong>{employeeCount}</strong> employees <span className='more-stats-toggler' onClick={() => collapseStats(prevState => !prevState)}>More stats <i className={collapsed ? "fa-solid fa-caret-down" : "fa-solid fa-caret-down rotated"}></i></span></p>
                <div className={collapsed ? 'more-stats collapsed' : 'more-stats'}>
                    <p><strong>Payroll Total: </strong> </p>
                    <p><strong>Avg. Salary:</strong> </p>
                    {props.roles.map(role => {
                    console.log(role.roleName);
                    return (
                        <p>
                        <strong>Total {role.roleName}s:</strong> {role.empCount}
                        </p>

                    )})}
                </div>
                <div className="info">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <p>To edit your team name, manager, or delete your team, click the <i className='fa-solid fa-pen-to-square'></i> icon</p>
                </div>
                <div className="info">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <p>To add/edit roles or salaries, select the <strong>Manage</strong> tab</p>
                </div>
            </div>
        </div>
    )
}