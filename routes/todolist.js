var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
const Authentication = require('./Authentication');

router.get('/',Authentication.isAuthenticated,async function(req, res){
  try {
    let todolists = await mongoose.model('todolists').find();
    if(todolists){
      return res.json(todolists);
    }else{
      res.json({
        message: 'schema todolists not found'
      })
    }
  } catch (error) {
    console.log(error);
    return res.send('Error');
  }
});

router.post('/',Authentication.isAuthenticated,async function(req, res){
  try {
    if(req.body){
      let insert = {
        name: req.body.name,
        leader: req.body.leader,
        members: req.body.members
      }
      let todolist = await mongoose.model("todolists").create(insert);
      res.json({
        success: true,
        todolist
      })
    }else {
      res.status(401).send('req.body not provided')
    }
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
});

router.get('/:id',Authentication.isAuthenticated,async function(req, res){
  try {
    const id = req.params.id;
    const todolist = await mongoose.model('todolists').findById(id);
    if(todolist){
      return res.json(todolist);
    }else{
      return res.status(403).send({
        message: 'todolist is not found'
      })
    }
    
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
});

router.put('/:id',Authentication.isAuthenticated,async function(req, res){
  try {
    if(req.body){
      const id = req.params.id;
      let newTodolist = {
        ...req.body
      };
      const todolist = await mongoose.model('todolists').findByIdAndUpdate(id, newTodolist, {new: true});
      return res.json(todolist);
    }else {
      return res.json({
        message: 'req.body is not provided'
      })
    }
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
});

module.exports = router;