const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")

//User model
const User = require("../../models/UserSchema");

//route POST api/users
// Register new user
router.post("/", (req, res) => {
	const { name, email, password } = req.body;
    console.log("name", name);
    console.log("email", email);
    console.log("password", password);

    // validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: "User already exists" })

            const newUser = new User({
                name,
                email,
                password
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            res.json({
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        })
                })
            })
        })
});

module.exports = router;
