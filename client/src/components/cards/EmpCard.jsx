import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../../assets/style/empcard.css"

export default function EmpCard(props) {
  const [show, setShow] = useState(false);
  const [deleteConfirm, showDeleteConfirm] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteEmployee = (employee) => {
    if(employee.role === "manager") {
      let index = employee.id -1;
      delete props.managers[index];
    }
  }

  return (
    <>
      <div className="emp-card" onClick={handleShow}>
        <div className="emp-card-header">
          <div className="emp-picture">
            {props.picture ? (
              <>
                <img src={props.picture} alt="" />
              </>
            ) : (
              <>
                <i className='fa-solid fa-user'></i>
              </>
            )}
          </div>
          <div className="emp-info-header">
            <h6 className="emp-name"><strong>{props.abbreviatedName}</strong></h6>
            <h6 className="emp-role">{props.lead ? "Team Lead" : props.role}</h6>
            <p>{props.number}</p>
          </div>
        </div>
      </div>

      <Modal 
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show} 
        onHide={() => {
          handleClose();
          setTimeout(() => {
            showDeleteConfirm(false);
          }, 300)
        }}
      >
        <div className="emp-card-modal-container">
          <i className="fa-solid fa-xmark exit-button" onClick={() => handleClose()}></i>
          <div className="emp-card-header-modal">
            <div className="emp-picture">
              {props.picture ? (
                <>
                  <img src={props.picture} alt="" />
                </>
              ) : (
                <>
                  <i className='fa-solid fa-user'></i>
                </>
              )}
            </div>
            <div className="emp-info-header">
              <h6 className="emp-name"><strong>{props.name}</strong></h6>
              <h6 className="emp-role">{props.lead ? "Team Lead" : props.role}</h6>
            </div>
          </div>
          <div className="emp-contact-info">
            <p><strong>Phone #:</strong> {props.number}</p>
            <p><strong>Email:</strong> {props.email}</p>
            <p><strong>Time:</strong> UTC -{props.timeZone}:00</p>
            <div className="emp-card-button-container">
            <button className="edit-button">Edit</button>
            <button className={deleteConfirm ? "delete-button confirm" : "delete-button"} onClick={deleteConfirm ? deleteEmployee(props) : () => showDeleteConfirm(true)}>
              {deleteConfirm ? 'Are you sure?' : 'Delete'}
            </button>
          </div>
          </div>

        </div>
      </Modal>
    </>
  );
}

