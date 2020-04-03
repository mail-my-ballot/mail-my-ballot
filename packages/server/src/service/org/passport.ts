import passport from 'passport'
import Express, { Request } from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import flash from 'connect-flash'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

import { processEnvOrThrow } from '../../common'
import { FirestoreService } from '../firestore'
import { FirestoreStore } from '@google-cloud/connect-firestore'
import { toCSVSting } from '../csv'

const scope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

const firestoreService = new FirestoreService()

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
  done(null, uid)
})

passport.deserializeUser((uid, done) => {
  done(null, uid)
})

const authenticate = passport.authenticate(
  'google'
)

const validSession: Express.RequestHandler = (req, res, next) => {
  if (!req.user) {
    res.sendStatus(403)
  } else {
    next()
  }
}

const getUid = (req: Request): string => {
  const uid = req.user as string | undefined
  if (!uid) throw Error('Need a valid user object')
  return uid
}

export const registerPassportEndpoints = (app: Express.Application) => {
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
  }))

  app.use(flash())
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(bodyParser.urlencoded({ extended: true }))
  
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
    async (req, res) => {
      const uid = getUid(req)
      const [user, orgs] = await Promise.all([
        await firestoreService.fetchUser(uid),
        await firestoreService.fetchUserOrgs(uid)
      ])
      const frontEnd = 'https://vbmreg.org/'
      const richOrgs = orgs.map(org => ({
        ...org,
        isAdmin: org.user.admins.includes(uid),
        isPending: org.user.pendings.includes(uid)
      }))

      res.render('dashboard', {
        user,
        richOrgs,
        frontEnd,
        flash: req.flash(),
      })
    }
  )
      res.render('dashboard', {user, richOrgs, frontEnd})
    }
  )

  app.post('/claimNewOrg', validSession,
    async (req, res) => {
      const { org } = req.body
      const uid = getUid(req)
      await firestoreService.claimNewOrg(uid, org)
      req.flash('success', `Added new org "${org}"`)
      res.redirect('/dashboard')
    }
  )

  app.get('/download/:org', validSession,
    async (req, res) => {
      const { org } = req.params
      const uid = getUid(req)
      const stateInfos = await firestoreService.fetchRegistrations(uid, org) || []
      const csvString = toCSVSting(stateInfos)
      res.contentType('text/csv')
      res.setHeader('Content-Disposition', `attachment; filename=${org}.data.csv`)
      res.send(csvString)
    }
  )
}
