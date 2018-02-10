var jwt = require('jsonwebtoken');

function authentication(req,res,next){
  jwt.verify(req.headers.token, 'secret', function(err, decoded) {
    req.headers.token = decoded
    next()
  });
}

module.exports = authentication ;
