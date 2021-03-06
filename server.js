const express = require("express");
const mongoose = require("mongoose");



const app = express();

//Bodyparser middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;



//DB Config
const db = require("./config/keys").mongoURI;

//connect to mongo
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log("MongoDB Connected...."))
	.catch((err) => console.log(err));

app.use("/api/tasks", require("./routes/api/tasks"));
app.use("/api/users", require("./routes/api/users"))



app.listen(port, () => console.log(`Server started on port ${port}`));
