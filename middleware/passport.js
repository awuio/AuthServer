var User = require("../models/user");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var config = require("../config/config");
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};
module.exports = new JwtStrategy(opts, function (jwt_payload, done) {
  User.findById(jwt_payload.id)
    .then((user) => {
      if (user) {
        //พบ User ID
        return done(null, user);
      } else {
        //ไม่พบ User
        return done(null, false);
      }
    })
    .catch((err) => {
      return done(err, false);
    });
});
