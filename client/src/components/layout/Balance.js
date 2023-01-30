import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { numberWithCommas } from "../utils/format";

export const Balance = () => {
  const { transactions, currentAlbum } = useContext(GlobalContext);

  const amounts = transactions
    .filter((transaction) => transaction.album_name === currentAlbum)
    .map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const sign = total < 0 ? "-" : "+";
  return (
    <>
      <h4>Your Balance</h4>
      <h1>
        {sign}£{numberWithCommas(Math.abs(total))}
      </h1>
    </>
  );
};
