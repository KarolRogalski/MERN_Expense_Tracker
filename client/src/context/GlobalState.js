import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//Initial state

const initialState = {
  token: undefined,
  loading: true,
  currentAlbum: "",
  expens_tracker_names: [],
  error: undefined,
  transactions: [],
  editedTransaction: undefined,
};

// Create Context

export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transactions");
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      const header = {
        "x-auth-token": state.token,
      };
      const deletedTransaction = {
        user_id: state.user_id,
        transaction_id: id,
      };
      const registerRes = await axios.delete(
        "/api/transactions/delete",
        { headers: header, data: deletedTransaction }
      );
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function addTransaction(transaction) {
    try {
      const headers = {
        "x-auth-token": state.token,
      };
      const addNewTransaction = {
        user_id: state.user_id,
        album_name: state.currentAlbum,
        transaction_name: transaction.text,
        amount: transaction.amount,
      };

      const transactionRes = await axios.post(
        "/api/transactions/addtransaction",
        addNewTransaction,
        { headers: headers }
      );
      console.log("res.data");
      console.log(transactionRes);
      const newTransaction = transactionRes.data.newTransaction;
      console.log(newTransaction);

      dispatch({
        type: "ADD_TRANSACTION",
        payload: newTransaction,
      });
    } catch (err) {}
  }

  function updateEditedTransaction(id){
    dispatch({
      type: "EDITED_TRANSACTION",
      payload: id,
    });
  }

  async function editTransaction(transaction) {
    try {
      const headers = {
        "x-auth-token": state.token,
      };
      const updatedTransaction = {
        user_id: state.user_id,
        transaction_id: transaction.trans_id,
        transaction_name: transaction.text,
        amount: transaction.amount,
      };
      const transactionRes = await axios.put(
        "/api/transactions/edittransaction",
        updatedTransaction,
        { headers: headers }
      );
      const newTransaction = transactionRes.data[0];

      dispatch({
        type: "EDIT_TRANSACTION",
        payload: newTransaction,
      });
    } catch (err) {}
  }

  async function checkLoggedIn() {
    try {
      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "/api/users/tokenIsValid",
        null,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (!tokenRes.data) {
        localStorage.setItem("auth-token", "");
        dispatch({
          type: "LOAD_USER_FALSE",
        });
      }

      if (tokenRes.data) {
        const userRes = await axios.get("/api/users/", {
          headers: { "x-auth-token": token },
        });

        const data = { ...userRes.data, token };
        dispatch({
          type: "LOAD_USER",
          payload: data,
        });
      }
    } catch (error) {
      console.log("err " + error);
      //   error.response.statusText + " = " + error.response.data.error
      // );
      localStorage.setItem("auth-token", "");
      dispatch({
        type: "LOAD_USER_FALSE",
      });
    }
  }

  async function logIn(loginUser) {
    try {
      const loginRes = await axios.post(
        "/api/users/login",
        loginUser
      );
      localStorage.setItem("auth-token", loginRes.data.token);
      dispatch({
        type: "LOGIN_USER",
        payload: loginRes.data,
      });
    } catch (err) {
      if (err.response.data.msg) {
        dispatch({
          type: "USER_LOGIN_ERROR",
          payload: err.response.data.msg,
        });
      } else {
        return;
      }
    }
  }

  const logOut = async () => {
    localStorage.setItem("auth-token", "");
    dispatch({
      type: "LOGOUT_USER",
      payload: {},
    });
  };

  const registUser = async (newUser) => {
    try {
      const registerRes = await axios.post(
        "/api/users/register",
        newUser
      );
      console.log(registerRes);
      if (registerRes.data) {
        const loginUser = { email: newUser.email, password: newUser.password };
        logIn(loginUser);
      }
    } catch (err) {
      console.log(newUser)
      console.log(err)
      console.log(err.response.data.msg);
      dispatch({
        type: "USER_LOGIN_ERROR",
        payload: err.response.data.msg,
      });
    }
  };

  const newAlbumName = async (newName) => {
    try {
      const headers = {
        "x-auth-token": state.token,
      };
      const user_id = state.user_id;
      const newETName = { user_id, newName };

      const registerRes = await axios.post(
        "/api/transactions/newtransactionalbum",
        newETName,
        { headers: headers }
      );
      dispatch({
        type: "ADD_NEW_ALBUM",
        payload: newName,
      });
    } catch (err) {
      dispatch({
        type: "USER_LOGIN_ERROR",
        payload: err.response.data.msg,
      });
    }
  };

  const deleteAlbum = async (name) => {
    try {
      const header = {
        "x-auth-token": state.token,
      };
      const albumReq = {
        user_id: state.user_id,
        album_name: name,
      };

      const albumRes = await axios.delete(
        "/api/transactions/deletealbum",
        { headers: header, data: albumReq }
      );

      const albums = state.expens_tracker_names;
      const newAlbums = albums.filter((album) => album !== name);
      dispatch({
        type: "NEW_ALBUM",
        payload: newAlbums,
      });
    } catch (err) {
      dispatch({
        type: "USER_LOGIN_ERROR",
        payload: err.response.data.msg,
      });
      return;
    }
  };

  const onChangeAlbum = (name) => {
    dispatch({
      type: "CHANGE_ALBUM_NAME",
      payload: name,
    });
  };

  const removeError = () => {
    dispatch({
      type: "CLEAR_ERROR",
      payload: {},
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        token: state.token,
        user_id: state.user_id,
        currentAlbum: state.currentAlbum,
        expens_tracker_names: state.expens_tracker_names,
        todos: state.todos,
        displayName: state.displayName,
        transactions: state.transactions,
        editedTransaction: state.editedTransaction,
        error: state.error,
        loading: state.loading,
        getTransactions,
        updateEditedTransaction,
        editTransaction,
        deleteTransaction,
        addTransaction,
        checkLoggedIn,
        logIn,
        logOut,
        registUser,
        newAlbumName,
        deleteAlbum,
        removeError,
        onChangeAlbum,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
