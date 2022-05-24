const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");

// @desc add transaction album name
// @route POST /newtransactionalbum
// @access Private

router.post("/newtransactionalbum", auth, async (req, res) => {
  try {
    let { user_id, newName } = req.body;

    const user = await User.findById(user_id);
    const hasName = user.expens_tracker_name.includes(newName);
    if (hasName)
      return res.status(400).json({
        msg:
          "An album with this name already exists. Please provide new unique name",
      });
    if (newName.length < 3) {
      return res.status(400).json({
        msg: "Please provide new unique name with min 3 characters long",
      });
    }

    console.log(user_id);
    console.log(newName);
    User.findByIdAndUpdate(
      { _id: user_id },
      { $push: { expens_tracker_name: newName } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(`new Album Added: ${newName}`);
        }
      }
    );
    return res.status(200).json({
      msg: `new album added ${newName}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc delete transaction album
// @route DELETE /deletealbum
// @access Private
router.delete("/deletealbum", auth, async (req, res) => {
  try {
    let { user_id, album_name } = req.body;
    User.findByIdAndUpdate(
      { _id: user_id },
      { $pull: { expens_tracker_name: album_name } },
      function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log("tr del elese");
          const deleteAllAlbumTransactions = async () => {
            console.log("fc deleted");
            const user = await User.findById(user_id);
            const tranToDelete = user.transactions.filter(
              (tran) => tran.album_name === album_name
            );
            tranToDelete.map((tran) => {
              User.findByIdAndUpdate(
                { _id: user_id },
                { $pull: { transactions: { _id: tran._id } } },
                function (error) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("transaction has been removed");
                  }
                }
              );
            });
          };
          deleteAllAlbumTransactions();
        }
      }
    );

    // const user = await User.findById(req.body.user_id);
    // const transactions = user.transactions;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc add new transaction
// @route POST /addTransaction
// @access Private
router.post("/addtransaction", auth, async (req, res) => {
  try {
    let { user_id, album_name, transaction_name, amount } = req.body;

    const transaction = {
      album_name,
      transaction_name,
      amount,
    };

    User.findByIdAndUpdate(
      { _id: user_id },
      { $push: { transactions: transaction } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(`new transaction added ${transaction.transaction_name}`);
          returnNewTransaction();
        }
      }
    );
    const returnNewTransaction = async () => {
      const user = await User.findById(user_id);
      const newTransaction = user.transactions[user.transactions.length - 1];
      console.log(newTransaction);
      return res.status(200).json({
        newTransaction: newTransaction,
      });
    };
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// @desc delete transaction
// @route DELETE /deleteTransaction:id
// @access Private

router.delete("/delete", auth, async (req, res) => {
  try {
    let { user_id, transaction_id } = req.body;
    User.findByIdAndUpdate(
      { _id: req.body.user_id },
      { $pull: { transactions: { _id: req.body.transaction_id } } },
      function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log("transaction has been removed");
        }
      }
    );

    const user = await User.findById(req.body.user_id);
    const transactions = user.transactions;
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// @desc Edit transaction
// @route PUT /editTransaction:id
// @access Private

router.put("/edittransaction", auth, async (req, res) => {
  try {
    let { user_id, transaction_id, transaction_name, amount } = req.body;
    console.log(user_id+transaction_id+transaction_name+amount )
    User.updateOne(
      { _id: user_id, "transactions._id" : transaction_id },
      { $set: { "transactions.$.transaction_name" : transaction_name, "transactions.$.amount" : amount } },
      function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log("transaction has been updated");
          returnUpdatedTransaction();
        }
      }
    );
    const returnUpdatedTransaction = async () => {
    const user = await User.findById(user_id);
    // console.log(user.transactions)
    // console.log(transaction_id)
    const updatedTransaction = user.transactions.filter((t) => t._id == transaction_id);
    res.json(updatedTransaction);
    console.log(updatedTransaction)}
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc add TODO
// @route POST /addTodo
// @access Private
router.post("/addtodo", auth, async (req, res) => {
  try {
    const { user_id, todo_title } = req.body;

    User.findByIdAndUpdate(
      { _id: user_id },
      { $push: { todo: { todo_title: todo_title } } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(`new todo added ${todo_title}`);
        }
      }
    );
    return res.status(200).json({
      msg: `new todo added ${todo_title}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// @desc delete TODO
// @route DELETE /deleteTodo
// @access Private
router.delete("/deletetodo", auth, async (req, res) => {
  try {
    User.findByIdAndUpdate(
      { _id: req.body.user_id },
      { $pull: { todo: { _id: req.body.todo_id } } },
      function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log("todo has been removed");
        }
      }
    );
    return res.status(200).json({
      msg: `todo removed`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
