const express = require('express');
const router = express.Router();
const users = require("../controllers/user-controller.js");
const authService = require("../services/uuid-auth-service.js");



router.post("/users", authService, users.create);

//search on user by query 
router.get("/users/auth", authService, users.authenticate);

//Retrieve all users
router.get("/users", authService, users.findAll);

//Retrieve a single user
router.get("/users/:id", authService, users.findOne);

router.put("/users/resetpassword/:id", authService, users.resetPassword);

//Update an exisiting user
router.put("/users/:id", authService, users.update);

//Delete an existing user
router.delete("/users/:id", authService, users.delete);

//Delete all users
router.delete("/users", authService, users.deleteAll);


module.exports = router;
