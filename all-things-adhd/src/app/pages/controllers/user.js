const {User} = require ("../models")
const bcrypt = require ("bcrypt")

async function createAccount (req,res) {
    try {
        const {username, password} = req.body
        if (!username|| !password) {
            return res.status(400).json({error: "Please fill out both fields"})
        }
        const currentUser = await User.findOne({username})
        if (currentUser) {
            return res.status(400).json({error: "Please use a different username"})
        }

        const newUser = new User ({username,password})
        await newUser.save()
        res.status(201).json({ message: "You can access your account now." });
    } catch (error) {
        res.status(500).json({error:"Internal Server Error."})
    }
}

module.exports = {createAccount}
