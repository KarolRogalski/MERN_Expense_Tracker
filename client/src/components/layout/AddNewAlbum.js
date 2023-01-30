import React, { useState, useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import { useNavigate } from 'react-router-dom'
import ErrorNotice from '../misc/ErrorNotice'

export const AddNewAlbum = () => {
  const [newName, setNewETName] = useState('')
  const [errorMsg, setError] = useState()
  const {
    token,
    user_id,
    error,
    removeError,
    newAlbumName,
    onChangeAlbum,
    deleteAlbum,
    displayName,
    expens_tracker_names,
    transactions,
  } = useContext(GlobalContext)

  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    newAlbumName(newName)
    setNewETName('')
  }

  const deleteAlbumClick = (name) => {
    deleteAlbum(name)
  }

  useEffect(() => {
    if (error) setError(error)
    if (!user_id && localStorage.getItem('auth-token')) navigate('/')
    if (!token) navigate('/')
  }, [expens_tracker_names, error])

  const selectAlbum = (name) => {
    console.log(name)
    onChangeAlbum(name)
  }

  const totalBalance = (name) => {
    const amounts = transactions
      .filter((transaction) => transaction.album_name === name)
      .map((transaction) => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
    const sign = total < 0 ? '-' : '+'
    return `${sign}£${Math.abs(total)}`
  }
  const totalBalanceNumber = (name) => {
    const amounts = transactions
      .filter((transaction) => transaction.album_name === name)
      .map((transaction) => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
    return total
  }

  return (
    <div className='page'>
      <h1>{displayName}</h1>
      <h1>Welcome to your Expense Tracker</h1>

      {errorMsg && (
        <ErrorNotice
          message={error}
          clearError={() => {
            removeError()
            setError(undefined)
          }}
        />
      )}
      <form id='new_expense_tracker_name' className='form' onSubmit={submit}>
        <label>
          please enter new expense tracker name (for exsample YEAR 21/22)
        </label>
        <input
          value={newName}
          id='new_expense_tracker'
          type='text'
          onChange={(e) => setNewETName(e.target.value)}
        />

        <input type='submit' value='submit' />
      </form>
      <p>yours albums:</p>
      <ul className='list'>
        {expens_tracker_names.map((album, index) => (
          <li key={index}>
            {album}{' '}
            <button
              className='li-select-btn'
              onClick={() => selectAlbum(album)}
            ></button>
            <button
              className='delete-btn'
              onClick={() => deleteAlbumClick(album)}
            >
              X
            </button>
            <span
              className={
                totalBalanceNumber(album) < 0
                  ? 'album_list_balance minus'
                  : 'album_list_balance plus'
              }
            >
              {totalBalance(album)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
