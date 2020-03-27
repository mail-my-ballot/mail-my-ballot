import passport from 'passport'
import Express from 'express'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

import { processEnvOrThrow } from '../../common'
import { firestoreService } from '../firestore'

export const registerPassportEndpoints = (app: Express.Application) => {
  passport.use(
    new GoogleStrategy({
      clientID: processEnvOrThrow('GOOGLE_CLIENT_ID'),
      clientSecret: processEnvOrThrow('GOOGLE_CLIENT_SECRET'),
      callbackURL: processEnvOrThrow('GOOGLE_CLIENT_CALLBACK'),
    },
    function(accessToken, refreshToken, profile, done) {
      firestoreService.newUser(profile, accessToken, refreshToken).then(
        (uid) => done(null, uid)
      )
    })
  )

  passport.serializeUser((uid, done) => {
    done(null, uid);
  })
  
  passport.deserializeUser((uid, done) => {
    done(null, uid);
  })
  
  app.get('/auth/google',
    passport.authenticate(
      'google', {
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile'
        ]
      }
    )
  )

  app.get('/auth/google/callback', 
    passport.authenticate(
      'google',
      { failureRedirect: '/login' })
    ,
    function(req, res) {
      res.redirect('/');
    }
  )
}
