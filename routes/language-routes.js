const express = require('express');
const router = express.Router();
const languages = require("../controllers/language-controller.js");
const authService = require("../services/uuid-auth-service.js");
const {verifyEditor } = require("../services/login-auth-service.js");


router.post("/languages", verifyEditor, languages.create);

//Retrieve all Languages
router.get("/languages", authService, languages.findAll);

//Retrieve a single language with termId
router.get("/languages/:langId", authService, languages.findOne);

//Update a language with langId
router.put("/languagues/:langId", verifyEditor, languages.update);

//Delete a language with langId
router.delete("/languages/:langId", verifyEditor, languages.delete);

//Create a new language
router.delete("/languages", verifyEditor, languages.deleteAll);


module.exports = router;
