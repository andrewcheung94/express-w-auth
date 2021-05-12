const router = require("express").Router();

const { validateUser, encryptUserPasssword } = require('../controllers/authController');

const { seedUserData, getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/userController.js");

// /user/seed
router.get("/seed", seedUserData);

// /user
router.get("/", getUsers);

// /user/:id
router.get("/:id", getUserById);

// /user/add
router.post("/add", validateUser, encryptUserPasssword, createUser);

// /user/update
router.put("/update/:id", updateUser);

// /user/delete/:id
router.delete("/delete/:id", deleteUser);

module.exports = router;
