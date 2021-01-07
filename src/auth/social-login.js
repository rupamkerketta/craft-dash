if (process.env.NODE_ENV !== 'production') {
	const result = require('dotenv').config()

	if (result.error) {
		console.log(result.error)
	}
}
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy

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
			clientID:
				process.env.NODE_ENV === 'production'
					? process.env.GOOGLE_CLIENT_ID
					: process.env.GOOGLE_CLIENT_ID_LOCAL,
			clientSecret:
				process.env.NODE_ENV === 'production'
					? process.env.GOOGLE_CLIENT_SECRET
					: process.env.GOOGLE_CLIENT_SECRET_LOCAL,
			callbackURL: `${
				process.env.NODE_ENV === 'production' ? 'https://craftdash.xyz' : ''
			}/auth/google/callback`
		},
		(accessToken, refreshToken, profile, done) => {
			// console.log('*********************** PROFILE **********************')
			// console.log(profile)
			// console.log('******************************************************')
			// Check if this user already exists in the database
			try {
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
						}).save(async (err, result) => {
							if (err) {
								console.log(`***** ${err.message} *****`)
								// Email
								if (err.message.includes('duplicate key error')) {
									const user = await User.findOne({
										email: profile._json.email
									})
									done(null, user)
									return
								} else {
									throw err
								}
							}
							done(null, result)
						})
					}
				})
			} catch (err) {
				console.log(err)
				done(err, null)
			}
		}
	)
)
