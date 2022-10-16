import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import "../../assets/style/empcard.css"

export default function EmpCard(props) {
  const [formState, setFormState] = useState({ phone1: '', phone2: '', phone3: '', email: '', timezone: '', });
  const [show, setShow] = useState(false);
  const [deleteConfirm, showDeleteConfirm] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let phonenumbers = [formState.phone1.trim(), formState.phone2.trim(), formState.phone2.trim()];
    let email = formState.email.trim();

    if(phonenumbers && email) {
      if(phonenumbers[0].length === 3 && phonenumbers[1].length === 3 && phonenumbers[2].length === 4) {

      }
    }
  }

  const deleteEmployee = (employee) => {
    if (employee.role === 'manager') {
      let index = employee.id - 1;
      delete props.managers[index];
    }
  };

  return (
    <>
      <div className='emp-card' onClick={handleShow}>
        <div className='emp-card-header'>
          <div className='emp-picture'>
            {props.picture ? (
              <>
                <img src={props.picture} alt='' />
              </>
            ) : (
              <>
                <i className='fa-solid fa-user'></i>
              </>
            )}
          </div>
          <div className='emp-info-header'>
            <h6 className='emp-name'>
              <strong>{props.abbreviatedname}</strong>
            </h6>
            <h6 className='emp-role'>
              {props.lead ? 'Team Lead' : props.role}
            </h6>
            <p>{props.number}</p>
          </div>
        </div>
      </div>

      <Modal
        {...props}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={show}
        onHide={() => {
          handleClose();
          setTimeout(() => {
            showDeleteConfirm(false);
          }, 300);
        }}
      >
        <div className='emp-card-modal-container'>
          <i
            className='fa-solid fa-xmark exit-button'
            onClick={() => handleClose()}
          ></i>
          <div className='emp-card-header-modal'>
            <div className='emp-picture'>
              {props.picture ? (
                <>
                  <img src={props.picture} alt='' />
                </>
              ) : (
                <>
                  <i className='fa-solid fa-user'></i>
                </>
              )}
            </div>
            <div className='emp-info-header'>
              <h6 className='emp-name'>
                <strong>{props.name}</strong>
              </h6>
              <h6 className='emp-role'>
                {props.lead ? 'Team Lead' : props.role}
              </h6>
            </div>
          </div>
          <div className='emp-contact-info'>
            <form className='card-edit' onSubmit={handleEditSubmit}>
              <p>
                <strong>Phone #:</strong> {editing ? (
                  <>
                    <input type="text" 
                      className='card-input number-input' 
                      id="number-input1"
                      name='phone1'
                      value={formState.phone1}
                      onChange={handleChange} />-
                    <input type="text" 
                      className='card-input number-input' 
                      id="number-input2"
                      name='phone2'
                      value={formState.phone2}
                      onChange={handleChange} />-
                    <input type="text" 
                      className='card-input number-input' 
                      id="number-input3"
                      name='phone3'
                      value={formState.phone3}
                      onChange={handleChange} />
                  </>
                ) : (
                  <>
                    {props.number}
                  </>
                )}
              </p>
              <p>
                <strong>Email:</strong> {editing ? (
                  <>
                    <input type="text" 
                      className='card-input'
                      name='email'
                      value={formState.email}
                      onChange={handleChange} />
                  </>
                ) : (
                  <>
                    {props.email}
                  </>
                )}
              </p>
              <p>
                <strong>Time:</strong> {editing ? (
                  <>
                    <button className='timezone-button'>Timezones <i className='fa-solid fa-caret-down'></i></button>
                  </>
                ) : (
                  <>
                    UTC -{props.timeZone}:00
                  </>
                )}
              </p>
              <div className='emp-card-button-container'>
                <button className='edit-button' onClick={() => setEditing(!editing)}>Edit</button>
                <button
                  className={
                    deleteConfirm ? 'delete-button confirm' : 'delete-button'
                  }
                  onClick={
                    deleteConfirm
                      ? deleteEmployee(props)
                      : () => showDeleteConfirm(true)
                  }
                >
                  {deleteConfirm ? 'Are you sure?' : 'Delete'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

