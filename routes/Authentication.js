const mongoose = require('mongoose');
const config = require('../config/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let isAuthenticated = function(req, res, next) {
  if(req.headers && req.headers['authorization']){
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token){
      //token = token.split(' ')[1];
      jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        }else {
          req.decoded = decoded;
          next();
        }
      });
    }else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  }else {
    return res.status(401).send({ 
      message: 'No token provided.' 
  });
  }
}
module.exports = {
  isAuthenticated
}