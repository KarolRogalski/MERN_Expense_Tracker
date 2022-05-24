import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

export const EditTransaction = () => {
  const {editedTransaction, editTransaction} = useContext(GlobalContext);

  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [trans_id, setId] = useState("")


  useEffect(() => {
  if(editedTransaction){

  let tempAmount = editedTransaction.amount;
  let tempName = editedTransaction.transaction_name;
  let tempId = editedTransaction._id
  console.log("if");

 setTimeout(function(){
   setAmount(tempAmount);
   setText(tempName);
   setId(tempId)

 },100)
}
  },[editedTransaction]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { trans_id, text, amount };
    editTransaction(newTransaction);
    setText("");
    setAmount("");
    setId("");
    document.querySelector('.modal-bg').style.display = 'none'
  };


  return (
    <div className="modal-bg">
    <div className="edit-form">
    <button
        className="close-btn"
        onClick={() => {document.querySelector('.modal-bg').style.display = 'none' }}
      >
        X
      </button>
      <h3>Edit transaction</h3>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Name of transaction</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <input type="submit" value="submit" />
      </form>
      </div>
    </div>
  );
};
