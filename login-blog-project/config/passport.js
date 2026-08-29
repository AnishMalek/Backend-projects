const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Passport Local Strategy
// Login form mathi username ane password male chhe.
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            // Database ma username search karo
            const user = await User.findOne({ username });

            if (!user) {
                return done(null, false, {
                    message: "User not found"
                });
            }

            // Entered password ane hashed password compare karo
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return done(null, false, {
                    message: "Incorrect password"
                });
            }

            // Authentication successful
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

// User -> User ID -> Session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Session User ID -> Complete User Object
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
