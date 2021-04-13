import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { IoCloseOutline } from 'react-icons/io5';
import Axios from 'axios'
import './QuickAdd.css'
export default function QuickAdd(props) {


    const t = new Date().toLocaleDateString('en-CA');
    const [inputlist, setInputList] = useState();
    const [date, setDate] = useState(t);
    const [hide, setHide] = useState(false);

    const addTask = () => {
        Axios.post("/todos", {
            title: inputlist,
            date: date
        }).then(() => {

        });
        setInputList('');
        setDate(t);
        setHide(props.onHide)
    };


    return (
        <>
            <Modal show={props.show} onHide={props.onHide} style={{ marginTop: '50px' }}>
                <Modal.Body >

                    <div >
                        <b > Quick Add Task</b> <span><IoCloseOutline style={{ float: 'right', cursor: 'pointer', color: 'black' }} onClick={props.onHide} /></span>
                    </div>
                    <div className="quick-add">
                        <div>
                            <textarea type="text" rows="3" className="task-title m-2" value={inputlist} onChange={(e) => { setInputList(e.target.value) }} ></textarea>
                        </div>
                        <div>
                            <input type="date" className="task-date ml-2" value={date} onChange={(e) => { setDate(e.target.value) }} />
                        </div>
                    </div>
                    <div>
                        <Button disabled={!inputlist} id="btnadd" className=" m-1" onClick={addTask} >Add Task</Button>
                    </div>


                </Modal.Body>
            </Modal>


        </>
    )
}
