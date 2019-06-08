var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("../config/index");
const Authentication = require('./Authentication');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login',async function(req, res, next) {
  try {
    const query = {
      username: req.body.username
    };
    let user = await mongoose.model('user').findOne(query);
    console.log(req.body.username);
    if(user){
      let isCorrect = await bcryptjs.compareSync(req.body.password, user.password);
      if(isCorrect){
        const payload = {
          _id:  user._id
        };
        const token = jwt.sign(payload, config.secret, {
          expiresIn: "12h"
        });
        user.password = null;
        return res.json({
          success: true,
          message: 'Login Success',
          data: {
            token: token,
            user
          }
        });
      }else {
        return res.status(403).send({
          success: false,
          message: 'password is incorrect'
        });
      }
    }else {
      return res.status(403).send({
        success: false,
        message: 'username is not found'
      });
    }
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
});

router.get('/getAllUser',Authentication.isAuthenticated,async function(req, res){
  try {
    let users = await mongoose.model('user').find();
    if(users){
      return res.json(users);
    }else{
      res.json({
        message: 'Users not Found'
      })
    }
  } catch (error) {
    console.log(error);
    return res.send('Error');
  }
});
module.exports = router;
