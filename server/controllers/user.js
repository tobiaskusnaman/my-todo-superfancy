const User = require('../models/user');
var jwt = require('jsonwebtoken');

class UserController {
  static login(req,res){
    User.findOne({
      email : req.body.data.email
    })
    .then(user => {
      if (user) {
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
          picture : req.body.data.picture
        }
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


}


module.exports = UserController;
