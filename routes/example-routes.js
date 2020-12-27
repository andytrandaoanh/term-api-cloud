const express = require('express');
const router = express.Router();
const examples = require("../controllers/example-controller.js");
const authService = require("../services/uuid-auth-service.js");
const {verifyEditor } = require("../services/login-auth-service.js");

router.post("/examples", verifyEditor, examples.create);

//Retrieve examples by termID
router.get("/examples/term/:termId", authService, examples.findByTerm);

//Retrieve a single Example with exampleId
router.get("/examples/:exampleId", authService, examples.findOne);

//Retrieve all Examples
router.get("/examples", authService, examples.findAll);

//Update a Example with exampleId
router.put("/examples/:exampleId", verifyEditor, examples.update);

//Delete a Example with exampleId
router.delete("/examples/:exampleId", verifyEditor, examples.delete);

//Create a new Example
router.delete("/examples", verifyEditor, examples.deleteAll);


module.exports = router;

