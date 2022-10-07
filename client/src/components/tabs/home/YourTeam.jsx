import React from "react";
import EmpCard from "../../cards/EmpCard";

export default function YourTeam(props) {


    return (
        <div className="your-team">
        <h2>Your Team</h2>
            <div className="container-body">
                <div className="managers">
                    <h5><strong>Managers</strong></h5>
                    <div className="card-container">
                    {props.managers.map(manager => {
                        const managerNameSplit = manager.name.split(" ");
                        const managerFirst = managerNameSplit[0].split("");
                        const managerNameAbbreviated = `${managerFirst[0]}. ${managerNameSplit[1]}`

                        return (
                            <>
                                <EmpCard managers={props.managers} key={props.id} id={props.id} abbreviatedName={managerNameAbbreviated} name={manager.name} role={manager.role} lead={manager.lead} number={manager.number} email={manager.email} timeZone={manager.timeZone}/>
                            </>
                    )})}
                    </div>
                </div>
            </div>
        </div>
    )
}