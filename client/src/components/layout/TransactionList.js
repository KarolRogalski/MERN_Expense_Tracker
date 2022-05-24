import React, { useContext, useEffect, useState } from "react";
import { Transaction } from "./Transaction";
import { GlobalContext } from "../../context/GlobalState";
import { Search } from "./Search";

export const TransactionList = () => {
  const { transactions, currentAlbum } = useContext(GlobalContext);
  const [searchtxt, setSearchtxt] = useState("");

  const [columnDisplayNumber, setColumnDisplayNumber] = useState(1);
  const [listItemsNumber, setListItemsNumber] = useState();

  let resolution = window.innerWidth;

  const liElement = document.querySelectorAll(".anim");

  let filteredTransactions = transactions
    .filter(
      (name) =>
        name.transaction_name.toLowerCase().indexOf(searchtxt.toLowerCase()) !==
        -1
    )
    .filter((transaction) => transaction.album_name === currentAlbum);

  let numberOfTransactions = filteredTransactions.length;
  if (numberOfTransactions != listItemsNumber) {
    setListItemsNumber(numberOfTransactions);
  }

  const list = document.querySelector(".list");

  useEffect(() => {
    if (resolution > 1200) setColumnDisplayNumber(2);
    if (resolution > 800 && resolution < 1200) setColumnDisplayNumber(1);

    let columnNumber;
    if (filteredTransactions.length > 0 && liElement.length > 0) {
      const transactionRowCount = document.querySelector(".list").clientHeight;
      const liHeight = liElement[0].clientHeight;
      const rows = transactionRowCount / (liHeight + 10);

      columnNumber = Math.ceil(listItemsNumber / rows);

    }
    const numberOfPages = document.querySelector("#list-pages");
    if (list) list.style.marginLeft = "0px";
    if (columnDisplayNumber < columnNumber) {
      const pages = columnNumber - columnDisplayNumber + 1;
      numberOfPages.innerHTML = "";
      for (let i = 1; i <= pages; i++) {
        let btn = document.createElement("BUTTON");
        btn.innerHTML = i;
        btn.value = i;
        btn.classList.add("list-page-btn");
        btn.onclick = (e) => pageBtnClicked(e.target);
        if (i === 1) btn.classList.add("active");
        numberOfPages.appendChild(btn);
      }
    } else {
      numberOfPages.innerHTML = "";
    }
  });

  const pageBtnClicked = (btn) => {
    if (btn.classList.contains("active")) {
      return;
    } else {
      const activeBtn = document.querySelector(".active");
      if (activeBtn) activeBtn.classList.remove("active");
      btn.classList.add("active");
      const margiLeft = -370 * (btn.value - 1);
      list.style.marginLeft = `${margiLeft}px`;
    }
  };

  return (
    <>
      <div>
        <div className="search-transactions">
          <h3>Transactions</h3>
          <Search onChange={(value) => setSearchtxt(value)} />
        </div>
      </div>
      <ul className="list">
        {filteredTransactions.map((transaction) => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
      <div id="list-pages">
        {/* <button
          value="1"
          className="list-page-btn active"
          onClick={(e) => pageBtnClicked(e.target)}
        >
          1
        </button>
        <button
          className="list-page-btn"
          value="2"
          onClick={(e) => pageBtnClicked(e.target)}
        >
          2
        </button> */}
      </div>
    </>
  );
};
