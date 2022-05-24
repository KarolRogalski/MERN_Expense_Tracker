export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map(obj => obj._id === action.payload._id ? { ...obj, transaction_name : action.payload.transaction_name, amount : action.payload.amount } : obj)
      };
    case "EDITED_TRANSACTION":
      return {
        ...state,
        editedTransaction: state.transactions.filter((transaction) => transaction._id === action.payload)[0],
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOAD_USER":
      return {
        ...state,
        expens_tracker_names: action.payload.expens_tracker_names,
        token: action.payload.token,
        user_id: action.payload.id,
        todos: action.payload.todos,
        transactions: action.payload.transactions,
        displayName: action.payload.displayName,
        loading: false,
        error: undefined,
      };
    case "LOAD_USER_FALSE":
      return {
        ...state,
        loading: false,
      };
    case "LOGIN_USER":
      return {
        ...state,
        token: action.payload.token,
        expens_tracker_names: action.payload.expens_tracker_names,
        user_id: action.payload.id,
        todos: action.payload.todos,
        transactions: action.payload.transactions,
        displayName: action.payload.displayName,
        loading: false,
        error: undefined,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        token: undefined,
        expens_tracker_names: [],
        user_id: undefined,
        todos: undefined,
        transactions: undefined,
        displayName: undefined,
        loading: false,
        error: undefined,
        currentAlbum: "",
      };
    case "USER_LOGIN_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: "",
      };
    case "ADD_NEW_ALBUM":
      return {
        ...state,
        expens_tracker_names: [...state.expens_tracker_names, action.payload],
      };
    case "NEW_ALBUM":
      return {
        ...state,
        expens_tracker_names: action.payload,
      };
    case "CHANGE_ALBUM_NAME":
      return {
        ...state,
        currentAlbum: action.payload,
      };
    default:
      return state;
  }
};
