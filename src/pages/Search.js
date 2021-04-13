import { useEffect, useState } from "react"
import React from 'react'
import Axios from "axios"
import { Toast, Spinner } from 'react-bootstrap'
import ShowList from "../compopent/ShowList";
import '../App.css'
export default function Search(props) {
    const [state, setState] = useState('')
    const [Items, setItems] = useState([{}]);
    const [show, setShow] = useState(false)


    useEffect(() => {
        setState(props.location.state);

        Axios.get(`/todos/${state}`).then((response) => {
            setItems(response.data)

        })
    })
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

    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-12 col-md-5 mx-auto">
                        <div className="row mt-3">
                            <div className="text-center">
                                <h3>Results for "{state}"</h3>
                            </div>

                        </div>
                        <div>

                            <ShowList data={Items} delete={deleteItems} />

                        </div>
                        <div>
                            <Toast className="toast-delete" onClose={() => setShow(false)} show={show} delay={3000} autohide >
                                <Toast.Header  >
                                    <strong className=" text-danger">1 task deleted successfully</strong>
                                </Toast.Header>
                            </Toast>


                        </div>
                    </div>

                </div>
            </div>

        </>

    )
}
