const bcrypt = require('bcrypt');
const saltRounds =  parseInt(process.env.SALT);
const secretKey =  process.env.SECRET;
const jwt = require("jsonwebtoken");


exports.getHash = function (plainText, callback) {
    
    bcrypt.genSalt(saltRounds, function(err, salt) {

        if(err) {
            console.log(err);
            callback({message: 'Error generating salt.'}, null);

        }

        bcrypt.hash(plainText, salt, function(err, hash) {
            
            if(err) {
                console.log(err);
                callback({message: 'Error generating hash.'}, null);            
            }

            callback(null, hash)
        });
    });
      
  
}

exports.compareHash = function(plainPassword, hashPassword, callback) {

    bcrypt.compare(plainPassword, hashPassword, function(err, result) {

        if(err) {
            console.log(err);
            callback({message: 'Error checking hash.'}, null);            
        }

        callback(null, result);

    });

};



exports.generateToken = function (payload){
    const jwtToken = jwt.sign(payload, secretKey, { expiresIn: '6h' });
    return jwtToken;
}