const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const exampleRoutes = require('./routes/example-routes');
const languageRoutes = require('./routes/language-routes');
const termRoutes = require('./routes/term-routes');


const app = express();

app.use(cors());

app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Technical Terms API." });
});

app.use('/api', exampleRoutes);
app.use('/api', languageRoutes);
app.use('/api', termRoutes);

// set port, listen for requests
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
