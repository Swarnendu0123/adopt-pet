const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://yourdomain:3000/auth/google/callback'
  },
  function(token, tokenSecret, profile, done) {
    // Use profile information (mainly profile id) to check if the user is registered in your DB
    // If yes, retrieve user info and call done(null, user)
    // If no, create a new user and call done(null, newUser)
  }
));

// Serialize user to store user information in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user to retrieve user information from the session
passport.deserializeUser((id, done) => {
  // Find user by ID in your DB
  done(null, user);
});
