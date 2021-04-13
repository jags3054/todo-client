
import React, { useState } from 'react'

import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { Button, Collapse, OverlayTrigger, Tooltip, Toast } from 'react-bootstrap';
import './TodoList.css'
import { FaRegEdit, FaEdit } from 'react-icons/fa'
import Axios from 'axios'

export default function TodoList(props) {

  const t = new Date().toLocaleDateString('en-CA');
  const [inputTask, setInputTask] = useState(props.title);
  const [id, setId] = useState('')
  const [date, setDate] = useState(props.date)
  const [open, setOpen] = useState(false)
  const [isHoverDelete, setHoverDelete] = useState(false);
  const [isHoverEdit, setHoverEdit] = useState(false);
  const [show, setShow] = useState(false)

  const updateTask = () => {

    Axios.put(`/todos/${id}`, {

      title: inputTask,
      date: date

    }).then(() => {

    })
    setOpen(false)
    setShow(true)
  }
  return (
    <>

      <div className="border-bottom py-2" >
        <span >
          {props.title}
        </span>
        <span className="float-right">
          <OverlayTrigger placement="bottom" overlay={<Tooltip >Delete</Tooltip>}>
            <span onMouseLeave={() => { setHoverDelete(false); }} onMouseEnter={() => { setHoverDelete(true); }} style={{ cursor: 'pointer' }}>
              {
                isHoverDelete ?
                  <AiFillDelete className="text-danger" onClick={() => { props.onSelect(props.id); setOpen(false); }} />
                  : <AiOutlineDelete />
              }
            </span>

          </OverlayTrigger>
        </span>
        <span className="float-right mx-2">

          <OverlayTrigger placement="bottom" overlay={<Tooltip >Edit</Tooltip>}>
            <span onMouseLeave={() => { setHoverEdit(false); }} onMouseEnter={() => { setHoverEdit(true); }} style={{ cursor: 'pointer' }}>
              {
                isHoverEdit ?
                  < FaEdit onClick={() => { setOpen(!open); setId(props.id); setInputTask(props.title) }} />
                  : <FaRegEdit />
              }
            </span>
          </OverlayTrigger>

        </span>

      </div>


      <div className="row"
        aria-controls="collapse-text"
        aria-expanded={open}>
        <Collapse in={open}>
          <div className="col" id="collapse-text">
            <div className="addtask">
              <textarea className="task-title m-2" rows="2" value={inputTask} onChange={(e) => { setInputTask(e.target.value) }}></textarea>
              <input type="date" min={t} className="task-date m-2" value={date} onChange={(e) => { setDate(e.target.value) }} />

            </div>
            <div className="btn">
              <Button id="btnupdate" disabled={!inputTask} className=" m-1" onClick={updateTask}>Update Task</Button>
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
            <strong className=" text-success">updated successfully</strong>
          </Toast.Header>
        </Toast>
      </div>

    </>
  )
}
