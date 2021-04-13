import React, { useState, useEffect } from 'react'
import { VscMenu, VscAdd } from 'react-icons/vsc'
import QuickAdd from '../AddTask/QuickAdd'
import { FiHome } from 'react-icons/fi'
import { SidebarData } from './SidebarData'
import { NavLink, Link } from 'react-router-dom'
import './NavBar.css'
import { IconContext } from "react-icons"
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import DateOnIcon from './DateOnIcon'


export default function NavBar() {
  const [sidebar, setSidebar] = useState(true)
  const [modalShow, setModalShow] = useState(false);
  const [searchValue, setSearchValue] = useState('')
  const showSidebar = () => {
    setSidebar(!sidebar)
    // console.log(sidebar)
  }
  const onWindowResize = () => {
    if (window.innerWidth < 1024) {
      setSidebar(false)
    }
    else {
      setSidebar(true)
    }

  }
  useEffect(() => {
    window.addEventListener('resize', onWindowResize)
    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, [])

  return (
    <>

      <div className="navbar ">
        <IconContext.Provider value={{ color: 'white' }}>
          <OverlayTrigger placement="bottom" overlay={<Tooltip >Menu</Tooltip>}>

            <Link to="#" className="menu-bars">
              <VscMenu onClick={showSidebar} />
            </Link>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip >Home</Tooltip>}>

            <Link to="/" className="homebtn">
              < FiHome />
            </Link>
          </OverlayTrigger>

          <input type="text" name="search" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} placeholder="  Search.." />

          {searchValue ? <Link to={{ pathname: '/Search', state: searchValue }} >
            <button className=" btn btn-outline-light shadow-none ml-2 border-0 " onClick={() => { setSearchValue('') }}>Search</button>
          </Link> : null}
          <OverlayTrigger placement="bottom" overlay={<Tooltip >Add</Tooltip>}>

            <Link to="#" className="quick-addbtn">
              <VscAdd onClick={() => setModalShow(true)} />
              <QuickAdd
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Link>
          </OverlayTrigger>
        </IconContext.Provider>

      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <small className="dateonicon"><DateOnIcon /></small>
        <ul className="nav-menu-items" onClick={(window.innerWidth < 1024) ? showSidebar : null}>

          {
            SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path} activeClassName="current_page">
                    <span style={{ color: item.title === 'Today' ? 'green' : 'purple' }}> {item.icon}</span>
                    <span style={{ marginLeft: '16px' }}>{item.title}</span>
                  </NavLink>
                </li>
              )
            })
          }

        </ul>
      </nav>

    </>
  )
}


