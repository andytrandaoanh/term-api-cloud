const jwt = require("jsonwebtoken");
const secretKey =  process.env.SECRET;


function verifyLogin  (req, res, next) {

    console.log('user write auth is called')
    //console.log('header', req.headers);
    const auth = req.headers['authorization'];

    if (!auth) {
        res.status(500).send({
            message: "Empty authorization header"

        });

    }        
    else {
        //console.log('auth header', auth);
        const parts = auth.split(" ");
        //console.log('parts', parts.length);
        
        if (parts.length === 2 && parts[0] === "Bearer") {
            const token = parts[1];
            //console.log('token', token);
  
            jwt.verify(token, secretKey, (err, data) => {
                
                if (err) {
                    //console.log('error name', err.name);
                    if  (err.name === 'TokenExpiredError'){
                        console.log('Token expired');
                        res.sendStatus(400);
                    }
             
                    else next(err)



                //res.status(200).json(data);
                }
                else {

                    req.user = data;
                    next();
                   
                }
    
               
            })
   
        }

        else {
            res.status(500).send({
                message: "Invid authorization header"
    
            });
        }
        
    }

 

}



function verifyAdmin  (req, res, next) {

    console.log('user write auth is called')
    //console.log('header', req.headers);
    const auth = req.headers['authorization'];

    if (!auth) {
        res.status(500).send({
            message: "Empty authorization header"

        });

    }        
    else {
        //console.log('auth header', auth);
        const parts = auth.split(" ");
        //console.log('parts', parts.length);
        
        if (parts.length === 2 && parts[0] === "Bearer") {
            const token = parts[1];
            //console.log('token', token);
  
            jwt.verify(token, secretKey, (err, data) => {
                
                if (err) {
                    //console.log('error name', err.name);
                    if  (err.name === 'TokenExpiredError'){
                        console.log('Token expired');
                        res.sendStatus(400);
                    }
             
                    else next(err)



                //res.status(200).json(data);
                }
                else {
                    
                    if (data.admin === 1) {
                        req.user = data;
                        next();
                    }
                    else {
                        res.sendStatus(401);
                        console.log('User not authorized to write data');
                    }
                   
                   

                   
                }
    
               
            })
   
        }

        else {
            res.status(500).send({
                message: "Invid authorization header"
    
            });
        }
        
    }

 

}



function verifyEditor  (req, res, next) {

    console.log('user write auth is called')
    //console.log('header', req.headers);
    const auth = req.headers['authorization'];

    if (!auth) {
        res.status(500).send({
            message: "Empty authorization header"

        });

    }        
    else {
        //console.log('auth header', auth);
        const parts = auth.split(" ");
        //console.log('parts', parts.length);
        
        if (parts.length === 2 && parts[0] === "Bearer") {
            const token = parts[1];
            //console.log('token', token);
  
            jwt.verify(token, secretKey, (err, data) => {
                
                if (err) {
                    //console.log('error name', err.name);
                    if  (err.name === 'TokenExpiredError'){
                        console.log('Token expired');
                        res.sendStatus(400);
                    }
             
                    else next(err)



                //res.status(200).json(data);
                }
                else {
                    
                    if (data.editor === 1) {
                        req.user = data;
                        next();
                    }
                    else {
                        res.sendStatus(401);
                        console.log('User not authorized to write data');
                    }
                   
                   

                   
                }
    
               
            })
   
        }

        else {
            res.status(500).send({
                message: "Invid authorization header"
    
            });
        }
        
    }

 

}



module.exports = {verifyLogin, verifyAdmin, verifyEditor};