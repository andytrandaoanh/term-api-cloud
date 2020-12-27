const User = require("../models/user-model.js");
const authService = require("../services/user-auth-service");


//Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  //console.log('request verified user', req.user);

 
  if (!req.body) {
    res.sendStatus(400);
    console.log('Request body is empty');
  }



  authService.getHash(req.body.password, function(err, hash) {

    if(err) {
        console.log(err);
        res.status(500).send({
            message: "Error generating hash"
            });
    }

    //Create a User
    const user = new User({
      name: req.body.name,
      fullName: req.body.fullName,
      password: hash,
      admin: req.body.admin,
      editor : req.body.editor,
      status: req.body.status || 0
      
      
    });
    User.create(user, (err, data) => {

      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      res.send(data);
    });
    
    //res.send(user);
    //console.log('created new user:', user )
    //res.sendStatus(200);
  })



};



// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};


// Find a single User with a userId
exports.findOne = (req, res) => {  
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  //console.log('user data', req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  User.updateById(
    req.params.id,
    req.body,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};



// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};


exports.authenticate = (req, res) => {  
  
  User.searchByQueryParams(req.query, (err, data) => {
  if (err) { 

    if (err.kind === "not_found") {
      res.status(404).send({
        errorcode: 1,  
        message: `User not found!`,
      });
    }

    else if (err.kind === "invalid_param") { 

        res.status(500).send({
          message: `Params supplied are invalid`,
        });
    }

    else {

        res.status(500).send({
          message: "Error retrieving user params",
        });

    }  


  }


  else {
    //found user with specified name from database
    
    if (data.status === 0) {
      const plainPass = req.query.password;
      const hash = data.password;
      console.log({plainPass, hash});
      authService.compareHash(plainPass, hash, function(err, compareOK){
        if (err) {
          res.status(500).send({
            message: "Error verifying password",
          });
        }
  
        if (compareOK) {
          const {id, name, admin, editor } = data;
          const payload = {id, name, admin, editor};
          const jwtToken = authService.generateToken(payload);
          res.status(200).json({...payload, token: jwtToken, login: true});
;  
        }

        else {
          res.status(500).send({
            errorcode: 3,
            message: "Password does not match",
          });          
        }

      })
    }
      //user status other than zero
    else {
      res.status(500).send({
        errorcode: 2,
        message: "User is disabled",
      });
    }
    

  } 

  });
  
};


exports.resetPassword = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  authService.getHash(req.body.password, function(err, hash) {
    if(err) {
      console.log(err);
      res.status(500).send({
          message: "Error generating hash"
      });
    }

    //console.log('hash', hash);
    //res.status(200).send({ message: 'ok'});

    
    User.updatePasswordById(
      req.params.id,
      hash,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error resetting password for User with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
    
    
  })

};

