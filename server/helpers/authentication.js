var jwt = require('jsonwebtoken');

function authentication(req,res,next){
  jwt.verify(req.headers.token, 'secret', function(err, decoded) {
    req.headers.userDecoded = decoded
    console.log('DECODED',decoded);
    next()
  });
}

module.exports = authentication ;
