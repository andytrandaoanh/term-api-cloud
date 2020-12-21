const express = require('express');
const router = express.Router();
const terms = require("../controllers/term-controller.js");
const authService = require("../services/uuid-auth-service.js");


router.post("/terms", authService, terms.create);

//get combination of orignal and translated terms
router.get("/terms/combined/:langId", authService, terms.listCombinedTerms);

//order by list 
router.get("/terms/list", authService, terms.listByQuery);

//search by query parameters
router.get("/terms/search", authService, terms.searchByQuery);

//Retrieve all terms
router.get("/terms", authService, terms.findAll);

//Retrieve a single term with termId
router.get("/terms/:termId", authService, terms.findOne);

//Update a term with termId
router.put("/terms/:termId", authService, terms.update);

//Delete a term with langId
router.delete("/terms/:termId", authService, terms.delete);

//Create a new term
router.delete("/terms", authService, terms.deleteAll);


module.exports = router;
