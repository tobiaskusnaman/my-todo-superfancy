const User = require('../models/user');
var jwt = require('jsonwebtoken');

class UserController {
  constructor() {

  }

  static login(req,res){
    User.findOne({
      email : req.body.email
    })
    .then(user => {
      if (user) {
        jwt.sign({
          data: user
        }, 'secret', { expiresIn: '1h' }, function(err, tokenJwt){
          res.status(200).send({
            msg : `${req.body.name} is log in`,
            tokenJwt
          })
        });
      } else {
        let newUser = {
          name : req.body.name,
          email : req.body.email,
          picture : req.body.picture
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

  static register(req,res){
    let newUser = {
      email : req.body.email,
      password : req.body.password,
      fullName : req.body.fullName,
      phone : req.body.phone
    }
    User.create(newUser)
    .then(user => {
      res.status(200).send({
        msg:'user has been created',
        data : user
      })
    })
    .catch(err=>{
      res.status(500).send({
        msg: 'register error',
        err
      })
    })
  }


}


module.exports = UserController;
