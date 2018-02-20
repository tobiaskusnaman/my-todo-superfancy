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
        }, 'secret', { expiresIn: '1h' }, function(err, tokenJwt){
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

        var keyValidation = new Promise(function(resolve, reject) {
          if (req.body.managerKey) {
            if (req.body.managerKey.toLowerCase() == 'manager') {
              resolve(newUser.role = 'manager')
            } else {
              reject('incorrect key')
            }
          } else {
            resolve(newUser.role = 'employee')
          }
        });

        keyValidation.then(response => {
          User.create(newUser)
          .then(user => {
            jwt.sign({ data : user }, 'secret', function(err, tokenJwt) {
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
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(err)
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
    .populate('bucket')
    .exec(function(err, userPopulate) {
      if (!err) {
        res.send({
          msg : 'get info',
          data : userPopulate
        })
        console.log('GAK ERROR',userPopulate);
      } else {
        res.send(err)
      }
    });
  }

  static addBucket(req,res){
    User.findOne({
      _id : '5a8075115a3fbf312c2bbdbf'
    })
    .then(user => {
      user.bucket.push(req.headers.itemid)

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
