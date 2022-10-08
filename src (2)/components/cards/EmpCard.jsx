import React from 'react';
import "../../assets/style/empcard.css"

export default function EmpCard(props) {
  return (
    <>
        <div className="emp-card">
          <div className="emp-card-header">
            <h6 className="emp-name"><strong>{props.name}</strong></h6>
            <h6 className="emp-role">{props.lead ? "Team Lead" : props.role}</h6>
          </div>

          <div className="emp-contact-info">
              <p><strong>Phone #:</strong> {props.number}</p>
              <p><strong>Email:</strong> {props.email}</p>
              <p><strong>Time:</strong> UTC -{props.timeZone}:00</p>
          </div>
        </div>
    </>
  );
}

