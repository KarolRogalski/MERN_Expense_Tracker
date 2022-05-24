import React, { useContext, useEffect, useState } from "react";
import SignInUp from "../layout/SignInUp";
import { Balance } from "../layout/Balance";
import { IncomeExpenses } from "../layout/IncomeExpenses";
import { TransactionList } from "../layout/TransactionList";
import { AddTransaction } from "../layout/AddTransaction";
import { EditTransaction } from "../layout/EditTransaction";
import { ETName } from "../layout/ETName";
import { GlobalContext } from "../../context/GlobalState";
import { AddNewAlbum } from "../layout/AddNewAlbum";

export default function Home() {
  const {
    checkLoggedIn,
    user_id,
    loading,
    expens_tracker_names,
    currentAlbum,
    onChangeAlbum,
  } = useContext(GlobalContext);

  const [resolution, setResolution] = useState();

  const reportWindowSize = () => {
    setResolution(window.innerWidth);
  };
  window.addEventListener("resize", reportWindowSize);

  useEffect(() => {
    checkLoggedIn();
    if (!loading && user_id && expens_tracker_names.length === 0)
      onChangeAlbum("...newAlbum...");
    setResolution(window.innerWidth);
  }, [loading, currentAlbum]);

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          {!user_id ? (
            <SignInUp />
          ) : (
            <div className="ETcontainer">
              {currentAlbum === "...newAlbum..." ? (
                <>
                  <ETName />
                  <AddNewAlbum />
                </>
              ) : (
                <>
                  {resolution > 799 ? (
                    <div className="high-res">
                      <div className="left-panel">
                        <ETName />
                        <Balance />
                        <EditTransaction />
                        <IncomeExpenses />
                        <AddTransaction />
                      </div>
                      <div className="right-panel">
                        <TransactionList />
                      </div>
                    </div>
                  ) : (
                    <div className="low-res">
                      <ETName />
                      <Balance />
                      <EditTransaction />
                      <IncomeExpenses />
                      <TransactionList />
                      <AddTransaction />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
