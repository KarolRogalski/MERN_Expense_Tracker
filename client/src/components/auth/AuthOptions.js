import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'

export default function AuthOptions() {
  const { user_id, logOut } = useContext(GlobalContext)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem('auth-token', '')
    logOut()
    navigate('/')
  }
  return (
    <nav className='auth-options'>
      {user_id ? <button onClick={logout}>Logout</button> : <></>}
    </nav>
  )
}
