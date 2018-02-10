const todo = require('../models/todo');


class todoController {
  static create(req,res){
    let newTodo = {
      name : req.headers.token.data.name,
      duedate : new Date(),
      userId : req.headers.token.data._id,
      status : false
    }
    todo.create(newTodo)
    .then(todo => {
      res.status(200).send({
        msg : 'a to do has been added',
        data : todo
      })
    })
    .catch(err => {res.status(500).send({
      msg : 'create to do error',
      err
    })})
  }

  static findAll(req,res){
    todo.find()
    .then(todos => {
      res.status(200).send({
        msg : 'all todos',
        data : todos
      })
    })
    .catch(err => {
      res.status(500).send({
        msg : 'could not find todos',
        err
      })
    })
  }

  static findById(req,res){
    todo.find({
      '_id' : req.params.id
    })
    .then(todos=>{
      res.status(200).send({
        msg : 'list todos',
        data : todos
      })
    })
    .catch(err=>{
      res.status(500).send({
        msg : 'find todos error',
        err
      })
    })
  }

  static edit(req,res){
    todo.findOneAndUpdate({
      '_id' : req.params.id
    }, {
      name : req.body.name
    })
    .then(todo => {
      res.status(200).send({
        msg : 'todo has been edited',
        data : todo
      })
    })
    .catch(err=>{
      res.status(500).send({
        msg : 'edit todo error',
        err
      })
    })
  }

  static remove(req,res){
    todo.remove({
      '_id' : req.params.id
    })
    .then(todo => {
      res.status(200).send({
        msg : 'todo has been deleted',
        data : todo
      })
    })
    .catch(err=>{
      res.status(500).send({
        msg : 'delete todo error',
        err
      })
    })
  }

  static findComplete(req,res){
    todo.find({
      userId : req.headers.token.data._id,
      status : true
    })
    .then(todo => {
      res.status(200).send({
        msg : 'list of completes todo',
        data : todo
      })
    })
    .catch(err=>{
      res.status(500).send({
        msg : 'find complete todos error',
        err
      })
    })
  }

  static findIncomplete(req,res){
    todo.findOne({
      'status' : "false"
    })
    .then(todo => {
      res.status(200).send({
        msg : 'list of incomplete todo',
        data : todo
      })
    })
    .catch(err=>{
      res.status(500).send({
        msg : 'find incomplete todo error',
        err
      })
    })
  }

  static complete(req,res){
    todo.findOneAndUpdate({
      '_id' : req.params.id
    }, {
      'status' : true
    })
    .then(todo => {
      console.log(todo);
      res.status(200).send({
        msg : 'Congratulation you did it !',
        data : todo
      })
    })
    .catch(err => {
      res.status(500).send({
        msg : 'update todo is error',
        err
      })
    })
  }

  static incomplete(req,res){
    todo.findOneAndUpdate({
      '_id' : req.params.id
    }, {
      'status' : false
    })
    .then(todo => {
      res.status(200).send({
        msg : 'uncompleting todo',
        data : todo
      })
    })
    .catch(err => {
      res.status(500).send({
        msg : 'update uncomplete todo is error',
        err
      })
    })
  }


}

module.exports = todoController;
