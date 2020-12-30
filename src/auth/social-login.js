const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy

const keys = require('./keys')

// User Model
const User = require('../models/user')

passport.serializeUser((user, done) => {
	console.log('[passportSerialize] ' + user)
	done(null, user._id)
})

passport.deserializeUser((id, done) => {
	// Do Nothing
})

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.google.clientID,
			clientSecret: keys.google.clientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			// console.log('*********************** PROFILE **********************')
			// console.log(profile)
			// console.log('******************************************************')
			// Check if this user already exists in the database
			User.findOne({ googleId: profile.id }, async (err, doc) => {
				if (err) throw err
				if (doc) {
					// already have this user
					done(null, doc)
				}
				if (!doc) {
					const user = await User({
						username: profile._json.name,
						email: profile._json.email,
						googleId: profile.id,
						thumbnail: profile._json.picture
					})
					const result = await user.save()
					done(null, result)
				}
			})
		}
	)
)
