import React from 'react'
import { Link, Outlet } from 'react-router'
import './AdminPage.css'

function AdminPage() {
  return (
    <div>
        <div className='links'>
            <Link to={'/admin/add-game'}>Добавить игры</Link>
            <Link to={'/admin/add-comp'}>Добавить компьютер</Link>
        </div>
        <div>
        <Outlet />
        </div>
    </div>
  )
}

export default AdminPage