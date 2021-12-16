const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

// var fs = require("fs");

const {findByEmail, createUser, findIDByUsername} = require("../models/user");


exports.signup = async (req, res, next) => {
    if (req.body === {}) throw {status:400, msg:"les champs ne sont pas remplis"};
    const userInfo = await findByEmail(req.body.email);
    if (userInfo !== undefined) throw (res.status(401).json({message : "mail déja utilisé pour un compte"}));
    else {
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        if(req.body.admin){
          createUser(req.body.username, hash, req.body.email, req.body.admin)
          .then(res.status(201).json({message : "compte utilisateur créé !"}))
          .catch(error => res.status(401).json({ error }));
        }
        else{
          createUser(req.body.username, hash, req.body.email)
          .then(res.status(201).json({message : "compte utilisateur créé !"}))
          .catch(error => res.status(401).json({ error }));
        }
        
      })
      .catch(error => res.status(500).json({ error }));
    }
  
  };

  exports.login = async (req, res, next) => {
    try{
      console.log("...",req.body)
      if (req.body === {}) throw {status:400, msg:"les champs ne sont pas remplis"};
      const userInfo = await findByEmail(req.body.email);
      if (userInfo === undefined) throw {status:400, msg:"l'utilisateur n'existe pas"};
      const valid = await bcrypt.compare(req.body.password, userInfo.password)
      if (!valid)  throw {status:401, msg:"mot de pâsse non valide"};
      const userid = await findIDByUsername(userInfo.username);
      console.log(userid)
      res.status(200).json({
        user_id: userid.id,
        username: userInfo.username,
        message : "utilisateur connecté !",
        token: jwt.sign(
          { userId: userInfo._id },
          process.env.SECRET,
          { expiresIn: '48h' }
        )
      });
    }
    catch( err ){
      console.error(err);
      if (err.status) {
        res.status(err.status).json({error : err.msg})
      }
    }
  };