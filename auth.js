
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Staff = require("./models/Staff");

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            console.log("Received Credentials:", username);

            const user = await Staff.findOne({ username: username });

            if (!user) {
                return done(null, false, {
                    message: "Incorrect username"
                });
            }

            // Plain password comparison
             const isPasswordMatch = await user.comparePassword(password);

            if (!isPasswordMatch) {
                return done(null, false, {
                    message: "Incorrect password"
                });
            }

            return done(null, user);

        } catch (error) {
            return done(error);
        }
    })
);

module.exports = passport;
