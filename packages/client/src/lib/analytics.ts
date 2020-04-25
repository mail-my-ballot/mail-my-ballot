import ReactPixel from 'react-facebook-pixel'
import ReactGA from 'react-ga'
import { Analytics, processEnvOrThrow } from '../common'

const fbOptions = {
  autoConfig: true, 	// set pixel's autoConfig
  debug: false, 		  // enable logs
}

export const initializeAnalytics = ({ facebookId, googleId }: Analytics) => {
  if (facebookId) {
    ReactPixel.init(facebookId, undefined, fbOptions)
    ReactPixel.pageView()
  }

  const clientTracker: ReactGA.Tracker[] = googleId ? [{
    trackingId: googleId,
    gaOptions: { name: 'ClientTracker' }
  }] : []
  
  const trackers: ReactGA.Tracker[] = [
    {
      trackingId: processEnvOrThrow('REACT_APP_GOOGLE_UA'),
      gaOptions: { name: 'MMBTracker' }
    },
    ...clientTracker,
  ]

  ReactGA.initialize(trackers)
  ReactGA.pageview(window.location.hash, ['ClientTracker', 'MMBTracker'])
}

/* run this after history push to have up to date url */
export const pageView = () => {
  ReactPixel.pageView()
  ReactGA.pageview(window.location.hash, ['ClientTracker', 'MMBTracker'])
}
