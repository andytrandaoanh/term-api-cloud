const express = require('express');
const router = express.Router();
const languages = require("../controllers/language-controller.js");
const authService = require("../services/uuid-auth-service.js");



router.post("/languages", authService, languages.create);

//Retrieve all Languages
router.get("/languages", authService, languages.findAll);

//Retrieve a single language with termId
router.get("/languages/:langId", authService, languages.findOne);

//Update a language with langId
router.put("/languagues/:langId", authService, languages.update);

//Delete a language with langId
router.delete("/languages/:langId", authService, languages.delete);

//Create a new language
router.delete("/languages", authService, languages.deleteAll);


module.exports = router;
