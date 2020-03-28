import passport from 'passport'
import Express from 'express'
import session from 'express-session'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

import { processEnvOrThrow } from '../../common'
import { firestoreService } from '../firestore'
import { FirestoreStore } from '@google-cloud/connect-firestore'

const scope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

export const registerPassportEndpoints = (app: Express.Application) => {
  passport.use(
    new GoogleStrategy({
      clientID: processEnvOrThrow('GOOGLE_CLIENT_ID'),
      clientSecret: processEnvOrThrow('GOOGLE_CLIENT_SECRET'),
      callbackURL: processEnvOrThrow('GOOGLE_CLIENT_CALLBACK'),
    },
    function(accessToken, refreshToken, profile, done) {
      firestoreService.newUser(profile, accessToken || '', refreshToken || '').then(
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

  const authenticate = passport.authenticate(
    'google'
  )

  const validSession: Express.RequestHandler = (req, res, next) => {
    console.log(req.session)
    if (!req.session?.passport) {
      res.sendStatus(403)
    } else {
      next()
    }
  }

  app.use(Express.static("public"))
  app.use(session({
    store: new FirestoreStore({
      dataset: firestoreService.db,
      kind: 'express-sessions',
    }),
    secret: processEnvOrThrow('SESSION_SECRET'),
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  
  app.get('/auth/google',
    passport.authenticate(
      'google', {
        scope,
        prompt: 'consent'
      }
    )
  )

  app.get('/auth/google/callback', authenticate,
    (_, res) => res.redirect('/dashboard')
  )

  app.get('/auth/google/logout',
    (req, res) => {
      if (req.session) req.session.destroy(err => console.error(err))
      res.redirect('/')
    }
  )

  app.get('/dashboard', validSession,
    (_, res) => res.render('dashboard')
  )
}
