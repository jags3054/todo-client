import React, { useEffect, useState } from 'react'
import { Toast, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap'

import Axios from 'axios'

import ShowList from '../compopent/ShowList'
import '../App'
export default function Upcoming() {
  const [show, setShow] = useState(false);
  const [Items, setItems] = useState([{}]);
  const [isloading, setIsloading] = useState(false);
  const t = new Date().toLocaleDateString('en-CA');


  const d = new Date()
  const dd = d.getDate() + 1
  const yyyy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const tomorrow = (yyyy + '-' + (mm < 9 ? '0' + mm : mm) + '-' + (dd < 9 ? '0' + dd : dd))

  useEffect(() => {

    Axios.get(`/todos/date/${tomorrow}`).then((response) => {
      setItems(response.data)
      setIsloading(true)
    })
  })



  const deleteItems = (id) => {
    if (window.confirm("Do you want to delete")) {
      Axios.delete(`/todos/${id}`)
        .then(() => setItems((inputlist) => {
          return Items.filter((arrElem, index) => {
            setShow(true)
            // console.log(arrElem)
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
              <div className="col text-center">
                <p>
                  <b>Upcoming Tasks</b>
                </p>

              </div>
            </div>

            {isloading ? (<div className="row">
              <div className="col">
                <ShowList data={Items} delete={deleteItems} />
              </div>
            </div>
            ) : <div className="text-center"><Spinner animation="border" variant="success" /></div>
            }
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


