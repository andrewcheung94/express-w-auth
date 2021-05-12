const bcrypt = require('bcrypt');
const User = require("../model/User");
const { userData } = require("../data/users");

// console.log(userData);

//crud = create, read, update, delete
const seedUserData = async (req, res) => {
    const hashedUser = [];
    
    const rounds = 10;

    for (let i = 0; i < userData.length; i++) {
        const salt = await bcrypt.genSalt(rounds);
        const hashPass = await bcrypt.hash(userData[i].password, salt);
        hashedUser.push({ ...userData[i], password: hashPass });
    }
    
    User.create(hashedUser)
        .then((user) => res.status(200).json({ user }))
        .catch((err) => res.status(500).json({ Error: err }));
};

//create
const createUser = async (req, res) => {
    


    let user = req.body;
    User.create(user)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json({ Error: err.message }));
};

//read
const getUsers = (req, res) => {
    User.find().exec((err, docs) => {
        if (err)
            return res.status(500).json({
                message: `there was an error with out database: ${err}`,
            });
        if (docs.length === 0)
            return res.status(404).json({
                message: `there were no user founds in the database.`,
            });
        return res.status(200).json(docs);
    });
};

const getUserById = (req, res) => {
    User.findById(req.params.id).exec((err, user) => {
        if (!user)
            return res
                .status(404)
                .json({ message: "could not dind a user with that id" });
        if (err)
            return res
                .status(500)
                .json({ message: "there was an error with our database" });
        return res.status(200).json(user);
    });
};
//update
const updateUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(
        req.params.id,
        { id, $set: req.body },
        { new: true },
        (err, user) => {
            if (err)
                return res.status(404).json({
                    message: `could not find a user with the id: ${id}`,
                });
            return res.json(user);
        }
    );
};
//delete
const deleteUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id, (err, user) => {
        if (err)
            return res
                .status(400)
                .json({ message: `could not find a user with id ${id}` });
        return res.status(200).json(user);
    });
};

module.exports = { seedUserData, getUsers, getUserById, createUser, updateUser, deleteUser };
