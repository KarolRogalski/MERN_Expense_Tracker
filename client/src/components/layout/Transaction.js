import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import { numberWithCommas } from '../utils/format'

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext)
  const { updateEditedTransaction } = useContext(GlobalContext)

  const sign = transaction.amount < 0 ? '-' : '+'

  return (
    <li className={transaction.amount < 0 ? 'anim minus' : 'anim plus'}>
      {transaction.transaction_name}

      <span className='transaction-create-at'>
        {transaction.createAt.substr(0, 10)}
      </span>

      <span>
        {sign}£{numberWithCommas(Math.abs(transaction.amount))}
      </span>
      <button
        className='delete-btn'
        onClick={() => deleteTransaction(transaction._id)}
      >
        <i className='fa fa-trash'></i>
      </button>
      <button
        className='edit-btn'
        onClick={() => {
          updateEditedTransaction(transaction._id)
          document.querySelector('.modal-bg').style.display = 'block'
        }}
      >
        <i className='fa fa-pencil'></i>
      </button>
    </li>
  )
}
