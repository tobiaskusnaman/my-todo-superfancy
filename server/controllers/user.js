const User = require('../models/user');
var jwt = require('jsonwebtoken');

class UserController {
  static login(req,res){
    User.findOne({
      email : req.body.data.email
    })
    .then(user => {
      if (user !== null) {
        jwt.sign({
          data: user
        }, process.env.SECRET, { expiresIn: '1h' }, function(err, tokenJwt){
          res.status(200).send({
            msg : `${req.body.data.name} is log in`,
            tokenJwt
          })
        });
      } else {
        let newUser = {
          name : req.body.data.name,
          email : req.body.data.email,
          picture : req.body.data.picture.data.url
        }
        User.create(newUser)
        .then(user => {
          jwt.sign({ data : user }, process.env.SECRET, function(err, tokenJwt) {
            if (!err && tokenJwt) {
              res.status(200).send({
                msg : 'user has been created',
                tokenJwt
              })
            } else {
              res.status(500).send({
                msg : 'jwt error',
                err
              })
            }
          });
        })
        .catch(err=>{
          res.status(500).send({
            msg : 'register failed',
            err
          })
        })
      }
    })
    .catch(err=>{
      res.status(500).send({
        msg : 'create error',
        err
      })
    })
  }


  static findAll(req,res){
    User.find().
    then(response => {
      res.status(200).send({
        msg : 'user list',
        data : response
      })
    })
  }

  static quotes(req,res){
    var quotes = require('awesome-quotes');
      quotes.getQuote('computers','en', function(err, data) {
        if(!err) {
          res.status(200).send({
            msg : 'get quote is success',
            data
          })
        } else {
          res.send({
            msg : 'failed to get quote',
            err
          })
        }
      });
  }
  static getInfo(req,res){
    User.findOne({
      _id : req.headers.userDecoded.data._id
    })
      .then(userInfo => {
        res.send({
          msg : 'get info',
          data : userInfo
        })
      })
      .catch(err => {
        res.send({
          msg: 'failed to retrieve data user',
          err
        })
      })
  }

  static addBucket(req,res){
    User.findOne({
      _id : req.headers.userDecoded.data._id
    })
    .then(user => {
      user.bucket.push(req.headers.itemname)
      user.save(function (err,data){
        if (err) {
          res.send({
            msg : 'add to bucket error',
            err
          })
        } else {
          res.send({
            msg : 'add to basket is success',
            data
          })
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.send(err)
    })
  }
}


module.exports = UserController;
