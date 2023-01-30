import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'
import ErrorNotice from '../misc/ErrorNotice'

export default function Register() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordCheck, setPaswordCheck] = useState()
  const [displayName, setDisplayName] = useState()

  const [errorMsg, setError] = useState()

  const { registUser, user_id, error, removeError } = useContext(GlobalContext)

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const newUser = { email, password, passwordCheck, displayName }
    registUser(newUser)
  }

  useEffect(() => {
    if (error) setError(error)
    if (localStorage.getItem('auth-token')) navigate('/')
  }, [user_id, error])

  return (
    <div className='page'>
      <h2>Register</h2>
      {errorMsg && (
        <ErrorNotice
          message={errorMsg}
          clearError={() => {
            removeError()
            setError(undefined)
          }}
        />
      )}
      <form className='form' onSubmit={submit}>
        <label htmlFor='register-email'> Email</label>
        <input
          id='register-email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='register-password'> Password</label>
        <input
          id='register-password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='password'
          placeholder='verify password'
          onChange={(e) => setPaswordCheck(e.target.value)}
        />

        <label htmlFor='register-display-name'> Name</label>
        <input
          id='register-display-name'
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <input type='submit' value='Register' />
      </form>
    </div>
  )
}
