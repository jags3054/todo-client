import React, { useState, useEffect } from 'react';
import { Button, Collapse, Toast, Spinner } from 'react-bootstrap';
import { IoAdd } from 'react-icons/io5';
import './AddTask.css'
import ShowList from '../compopent/ShowList'
import Axios from 'axios'

export default function AddTask() {

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputlist, setInputList] = useState('');
  const [Items, setItems] = useState([{}]);
  const [isloading, setIsloading] = useState(false);
  const today = new Date().toDateString();
  const t = new Date().toLocaleDateString('en-CA');
  const [date, setDate] = useState(t);

  const addTask = () => {
    Axios.post("/todos", {
      title: inputlist,
      date: date
    }).then(() => {

    });
    setInputList('');
    setDate(t);

  };




  const deleteItems = (id) => {
    if (window.confirm("Do you want to delete")) {
      Axios.delete(`/todos/${id}`)
        .then(() => setItems((inputlist) => {
          return Items.filter((arrElem, index) => {
            setShow(true)
            return index !== id;
          })

        }))
    }
  }


  useEffect(() => {
    Axios.get(`/todos/date/${t}`).then((response) => {
      setItems(response.data)
      setIsloading(true)
    })

  })



  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-10 col-md-5 mx-auto">
            <div className="row mt-3">
              <p>
                <b>Today</b>
                <small className="ml-2">{today}</small>
              </p>
            </div>

            {isloading ? (<div className="row">
              <div className="col ">
                <ShowList data={Items} delete={deleteItems} />
              </div>
            </div>) : <div className="text-center"> <Spinner animation="border" variant="success" /></div>
            }

            <div className="row">
              <p onClick={() => setOpen(!open)}
                aria-controls="collapse-text"
                aria-expanded={open}
                id="addicon"
              >
                <span ><IoAdd /></span>
                <span className='ml-2'>Add Task</span>
              </p>
            </div>
            <div className="row">
              <Collapse in={open}>
                <div className="col" id="collapse-text">

                  <div className="addtask">

                    <textarea className="task-title m-2" rows="2" value={inputlist} onChange={(e) => { setInputList(e.target.value) }}></textarea>
                    <input type="date" min={t} className="task-date m-2" value={date} onChange={(e) => { setDate(e.target.value) }} />

                  </div>


                  <div className="btn">
                    <Button disabled={!inputlist && date} id="btnadd" className="m-1" onClick={addTask}>Add Task</Button>
                    <Button className="ml-2 m-1" id="btncancel" onClick={() => setOpen(!open)} >Cancel</Button>
                  </div>





                </div>

              </Collapse>

            </div>
            <div
              aria-live="polite"
              aria-atomic="true"
              className="toast-delete">

              <Toast className="toast-msg" onClose={() => setShow(false)} show={show} delay={3000} autohide >
                <Toast.Header  >
                  <strong className=" text-danger">1 task deleted successfully</strong>
                </Toast.Header>
              </Toast>
            </div>


          </div>
        </div>
      </div>
    </>)
}

// <div
// aria-live="polite"
// aria-atomic="true"
// className="toast-delete">

// <Toast className="toast-msg" onClose={() => setShow(false)} show={show} delay={3000} autohide >
//   <Toast.Header  >
//     <strong className=" text-danger">1 task deleted successfully</strong>
//   </Toast.Header>
// </Toast>
// </div>