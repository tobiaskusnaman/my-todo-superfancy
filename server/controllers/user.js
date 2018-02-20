const User = require('../models/user');
// const Manager = require('../models/manager');
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
    res.send({
      msg : 'data user',
      data : req.headers.userDecoded
    })
  }

  static addBucket(req,res){
    User.findOne({
      _id : req.headers.userDecoded.data._id
    })
    .then(user => {

      console.log(user);


      let itemObj = {
        itemId : req.headers.itemid
      }
      console.log(itemObj);
      console.log(user.bucket);

      // console.log('INI BUCKET',user.bucket);
      let basket = user.bucket.push(itemObj)
      console.log('INI BASKET',basket);
      console.log('=======>>>>>>>>>>>>',user);
      // user.bucket.push()
      // User.findOneAndUpdate({
      //   '_id' : req.headers.userDecoded.data._id
      // }, {
      //   bucket : this.bucket.push(req.headers.itemid)
      // })
      // .then(user => {
      //   res.send({
      //     msg : 'bucket has been added',
      //     data : user
      //   })
      // })
      // .catch(err => {
      //   res.send({
      //     msg : 'error adding to bucket',
      //     err
      //   })
      // })
    })
    .catch(err => {
      res.send(err)
    })

  }


}


module.exports = UserController;
