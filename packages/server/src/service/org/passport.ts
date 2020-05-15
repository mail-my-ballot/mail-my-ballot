import passport from 'passport'
import Express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import flash from 'connect-flash'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

import { processEnvOrThrow, implementedStates, toStateMethod } from '../../common'
import { FirestoreService } from '../firestore'
import { FirestoreStore } from '@google-cloud/connect-firestore'
import { toCSVSting } from '../csv'
import { Org } from '../types'
import { storageFileFromId } from '../storage'
import { router as letterRouter } from '../letter/router'

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

const getUid = (req: Express.Request): string => {
  const uid = req.user as string | undefined
  if (!uid) throw Error('Need a valid user object')
  return uid
}

interface RequestWithOrg extends Express.Request {
  org: Org
}

const orgPermissions = (level: 'members' | 'admins'): Express.RequestHandler => {
  /* requires either member or admin permissions */
  return async (req, res, next) => {
    const { oid } = req.params
    const uid = getUid(req)
    const org = await firestoreService.fetchOrg(oid)
    if (!org) return res.sendStatus(404)
    if (!org.user[level].includes(uid)) return res.sendStatus(403);
    (req as RequestWithOrg).org = org
    return next()
  }
}

const maxOrgs = parseInt(processEnvOrThrow('USER_MAX_ORGS'))
const frontEnd = processEnvOrThrow('REACT_APP_URL')
const enrichOrg = (org: Org, uid: string) => ({
  ...org,
  isAdmin: org.user.admins.includes(uid),
  isPending: org.user.pendings.includes(uid),
  displayUrl: frontEnd + '#/org/' + org.id,
  editUrl: `/dashboard/${org.id}`,
  downloadUrl: `/download/${org.id}`,
  updateAnalyticsUrl: `/dashboard/${org.id}/updateAnalytics`,
})

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
      
      const richOrgs = orgs.map(org => enrichOrg(org, uid))

      res.render('dashboard', {
        maxOrgs,
        orgsFull: richOrgs.length >= maxOrgs,
        user,
        richOrgs,
        frontEnd,
        flash: req.flash(),
        implementedStates: new Array(...implementedStates).sort(),
        toStateMethod,
      })
    }
  )

  app.get('/dashboard/:oid', validSession, orgPermissions('members'),
    async (req, res) => {
      const uid = getUid(req)
      const { oid } = req.params
      const stateInfos = await firestoreService.fetchRegistrations(uid, oid, { limit: 5 }) || []
      const enrichedtateInfos = await Promise.all(stateInfos.map(async s => ({
        ...s,
        signedUrl: await storageFileFromId(s.id || '').getSignedUrl(60 * 60 * 1000)
      })))
      return res.render('org', {
        richOrg: enrichOrg((req as RequestWithOrg).org, uid),
        flash: req.flash(),
        stateInfos: enrichedtateInfos,
      })
    }
  )

  app.post('/dashboard/:oid/updateAnalytics', validSession, orgPermissions('admins'),
    async (req, res) => {
      const { oid } = req.params
      const { facebookId, googleId } = req.body
      await firestoreService.updateAnalytics(oid, { facebookId, googleId })
      req.flash('success', `Added Facebook Pixel Id for org "${oid}" to "${facebookId}"`)
      req.flash('success', `Added Google Pixel Id for org "${oid}" to "${googleId}"`)
      return res.redirect(`/dashboard/`)
    }
  )

  app.post('/claimNewOrg', validSession,
    async (req, res) => {
      const { oid } = req.body
      const uid = getUid(req)
      const success = await firestoreService.claimNewOrg(uid, oid)
      if (success) {
        req.flash('success', `Added new org "${oid}"`)
      } else {
        req.flash('danger', `Cannot add already claimed org "${oid}"`)
      }
      res.redirect('/dashboard')
    }
  )

  app.get('/download/:oid', validSession, orgPermissions('members'),
    async (req, res) => {
      const { oid } = req.params
      const uid = getUid(req)
      const stateInfos = await firestoreService.fetchRegistrations(uid, oid) || []
      const csvString = toCSVSting(stateInfos)
      res.contentType('text/csv')
      res.setHeader('Content-Disposition', `attachment; filename=${oid}-data.csv`)
      res.send(csvString)
    }
  )

  app.get('/status', validSession,
    (_, res) => {
      const env = {
        NODE_ENV: process.env.NODE_ENV,
        REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT,
        REACT_APP_EMAIL_FAX_OFFICIALS: process.env.REACT_APP_EMAIL_FAX_OFFICIALS,
        FIRESTORE_URL: process.env.FIRESTORE_URL,
      }
      res.render('status', { env })
    }
  )

  app.use('/letter', validSession, letterRouter)
}
