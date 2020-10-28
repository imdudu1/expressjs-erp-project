import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, userId) => {
    if (!!userId) {
      req.userId = userId;
    }
    next();
  })(req, res, next);

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      return done(null, payload.id);
    } catch (error) {
      return done(error, false);
    }
  })
);
passport.initialize();
