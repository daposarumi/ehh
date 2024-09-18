// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
    < div className='sidebar-options'>
        <NavLink to="/orders" div className="sidebar-option">
          <p>Orders</p>
        </NavLink>
    </div>
    </div>
  )
}

export default Sidebar