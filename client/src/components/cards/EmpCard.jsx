import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import "../../assets/style/empcard.css"

function EmpPhoneNumber(props) {

  return (
    <>
      <p>
        {props.header ? (
          <>
          </>
        ) : (
          <>
            <strong>Phone #:</strong>
          </>
        )}
        {`(${props.number1}) ${props.number2}-${props.number3}`}
      </p>
    </>
  )
}

function EmpEmail(props) {

  return (
    <>
      <p>
        <strong>Email:</strong> {props.email}
      </p>
    </>
  )
}

function EmpTimeZone(props) {

  return (
    <>
      <p>
        <strong>Time:</strong> UTC -{props.timezone ? props.timezone : "0"}:00
      </p>
    </>
  )
}

export default function EmpCard(props) {
  const [formState, setFormState] = useState({ phone1: '', phone2: '', phone3: '', email: '', timezone: '', });
  const [phoneNumber, setPhoneNumber] = useState(() => props.number ? 
    ({ 
      groupOne: props.number.slice(0,3), 
      groupTwo: props.number.slice(3,6), 
      groupThree: props.number.slice(6,10) 
    }) : ({
      groupOne: "", 
      groupTwo: "", 
      groupThree: ""
    })
  )
  const [show, setShow] = useState(false);
  const [deleteConfirm, showDeleteConfirm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    console.log(phoneNumber);
    const phonenumbers = [formState.phone1.trim(), formState.phone2.trim(), formState.phone3.trim()];
    const email = formState.email.trim();
    console.log(phonenumbers[0])
    console.log(phonenumbers[1])
    console.log(phonenumbers[2])

    if(phonenumbers && email) {
      if(phonenumbers[0].length === 3 && phonenumbers[1].length === 3 && phonenumbers[2].length === 4) {
        const number = phonenumbers[0] + phonenumbers[1] + phonenumbers[2];

        await axios.put(`/api/managers/${props.managers[0].id}`, { phone: number, email: email })
          .then((res) => {
            console.log(`Manager updated`);

            setPhoneNumber((phoneNumber) => (
              { 
                groupOne: props.number.slice(0,3), 
                groupTwo: props.number.slice(3,6), 
                groupThree: props.number.slice(6,10) 
              }
            ));
          })
          .catch((err) => console.log(`Failed to update manager: ${err}`));
      }
    }

    setFormState(
      { 
        phone1: phoneNumber.groupOne, 
        phone2: phoneNumber.groupTwo, 
        phone3: phoneNumber.groupThree, 
        email: email, 
        timezone: '' 
      });

      console.log(formState);
      setEditing(!editing);
  }

  useEffect(() => {
    console.log(phoneNumber);
  }, [])

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
            <EmpPhoneNumber header={true}
              number1={phoneNumber.groupOne} 
              number2={phoneNumber.groupTwo} 
              number3={phoneNumber.groupThree} />
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
            setEditing(false);
          }, 300);
        }}>
        <div className='emp-card-modal-container'>
          <i className='fa-solid fa-xmark exit-button' onClick={() => handleClose()}></i>
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
            {editing ? (
              <>
                <form className='card-edit' onSubmit={handleEditSubmit}>
                  <p>
                    <strong>Phone #:</strong>
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
                  </p>
                  <p>
                    <strong>Email:</strong>
                    <input type="text" 
                      className='card-input'
                      name='email'
                      value={formState.email}
                      onChange={handleChange} />
                  </p>
                  <p>
                    <strong>Time:</strong> 
                    <button className='timezone-button'>Timezones <i className='fa-solid fa-caret-down'></i></button>
                  </p>
                  <div className='emp-card-button-container'>
                    <button 
                      className='edit-button' 
                      onClick={() => setEditing(!editing)}>
                        Cancel
                    </button>
                    <button 
                      className='submit-button' 
                      type='submit'>
                        Submit
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <EmpPhoneNumber header={false}
                  number1={phoneNumber.groupOne} 
                  number2={phoneNumber.groupTwo} 
                  number3={phoneNumber.groupThree} />
                <EmpEmail email={props.email} />
                <EmpTimeZone timezone={props.timeZone} />
                <div className='emp-card-button-container'>
                  <button 
                    className='edit-button' 
                    onClick={() => setEditing(!editing)}>
                      Edit
                  </button>

                  <button
                    className={deleteConfirm ? 'delete-button confirm' : 'delete-button'}
                    onClick={deleteConfirm ? deleteEmployee(props) : () => showDeleteConfirm(true)}>
                      {deleteConfirm ? 'Are you sure?' : 'Delete'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

