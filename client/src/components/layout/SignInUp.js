import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'
import ErrorNotice from '../misc/ErrorNotice'

export default function SignInUp() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorMsg, setError] = useState()
  const [passwordCheck, setPaswordCheck] = useState()
  const [displayName, setDisplayName] = useState()

  const { user_id, logIn, registUser, error, removeError } =
    useContext(GlobalContext)

  const navigate = useNavigate()

  const submitLogin = (e) => {
    e.preventDefault()

    const loginUser = { email, password }
    logIn(loginUser)
  }
  const submitRegister = (e) => {
    e.preventDefault()
    const newUser = { email, password, passwordCheck, displayName }
    registUser(newUser)
  }
  useEffect(() => {
    if (error) setError(error)
    if (localStorage.getItem('auth-token')) navigate('/')

    const signUpButton = document.getElementById('signUp')
    const signInButton = document.getElementById('signIn')
    const container = document.getElementById('container')

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active')
    })

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active')
    })

    const signLowResBtn = document.querySelector('.sign-lowres')
    const signInContainer = document.querySelector('.sign-in-container')
    const signUpContainer = document.querySelector('.sign-up-container')

    signLowResBtn.addEventListener('click', () => {
      signUpContainer.classList.toggle('sign-show')
      signInContainer.classList.toggle('sign-show')
      if (signInContainer.classList.contains('sign-show')) {
        signLowResBtn.innerText = 'sign up'
        console.log('sign in')
      } else {
        signLowResBtn.innerText = 'Login'
        console.log('sign up')
      }
    })
  }, [user_id, error])

  return (
    <div className='sign-in-up'>
      <div className='container' id='container'>
        <button className='sign-lowres'>sign up</button>
        <div className='form-container sign-up-container'>
          <form className='form' onSubmit={submitRegister}>
            <h1>Create Account</h1>
            {errorMsg && (
              <ErrorNotice
                message={error}
                clearError={() => {
                  removeError()
                  setError(undefined)
                }}
              />
            )}
            <input
              placeholder='Email'
              id='register-email'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder='Password'
              id='register-password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type='password'
              placeholder='verify password'
              onChange={(e) => setPaswordCheck(e.target.value)}
            />

            <input
              placeholder='Name'
              id='register-display-name'
              type='text'
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <input type='submit' value='Register' />
          </form>
        </div>
        <div className='form-container sign-in-container sign-show'>
          <form className='form' onSubmit={submitLogin}>
            <h1>Sign in</h1>
            {errorMsg && (
              <ErrorNotice
                message={error}
                clearError={() => {
                  removeError()
                  setError(undefined)
                }}
              />
            )}
            <input
              placeholder='Email'
              id='login-email'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder='Password'
              id='login-password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type='submit' value='Sing In' />
          </form>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className='ghost' id='signIn'>
                Sign In
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Hello</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className='ghost' id='signUp'>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
