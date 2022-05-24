const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
  todo: [
    {
      todo_title: { type: String, require: true },
      todo_createAt: {
        type: Date,
        default: Date.now,
      },
      todo_complited: {
        type: Boolean,
        require: true,
        default: false,
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
    },
  ],

  expens_tracker_name: [{ type: String, require: true }],
  transactions: [
    {
      album_name: { type: String, required: true },

      transaction_name: {
        type: String,
        trim: true,
        required: [true, "Please add some text"],
      },
      amount: {
        type: Number,
        required: [true, "Pleaseadd a positive or negative number"],
      },
      createAt: {
        type: Date,
        default: Date.now,
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
    },
  ],
});

module.exports = User = mongoose.model("user", userSchema);
