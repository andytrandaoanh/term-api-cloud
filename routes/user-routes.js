const express = require('express');
const router = express.Router();
const users = require("../controllers/user-controller.js");
const authService = require("../services/uuid-auth-service.js");
const {verifyEditor, verifyAdmin } = require("../services/login-auth-service.js");

//router.post("/users/create", authService, users.create);

router.post("/users", verifyAdmin, users.create);

//search on user by query 
router.get("/users/auth", authService, users.authenticate);

//Retrieve all users
router.get("/users", authService, users.findAll);

//Retrieve a single user
router.get("/users/:id", authService, users.findOne);

//editor changes their own password
router.put("/users/resetpassword/:id", verifyEditor, users.resetPassword);

//admin change user password
router.put("/users/resetuserpassword/:id", verifyAdmin, users.resetPassword);


//Update an exisiting user
router.put("/users/:id", verifyAdmin, users.update);

//Delete an existing user
router.delete("/users/:id", verifyAdmin, users.delete);

//Delete all users
router.delete("/users", verifyAdmin, users.deleteAll);


module.exports = router;
