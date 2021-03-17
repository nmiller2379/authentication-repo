const mongoose = require("mongoose");
const { boolean } = require("yargs");
const Schema = mongoose.Schema;

//creating Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
    password: {
		type: String,
		required: true,
	},
    register_date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model("user", UserSchema);