import React from 'react'
import ReactDOM from 'react-dom'
import 'muicss/dist/css/mui.min.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

// On mobile browsers the value 100vh is going to behave differently than
// the expected on desktop browsers, due to the mechanisms that hides UI
// elements (e.g. Top bars, URL field, status bar, etc.) when scrolling
// the viewport in these devices.
//
// A workaround for this issue is to record 1% of the window.innerHeight
// as a css variable and use the css function calc to get the desired units
// in vh. This approach allows us to access this value globally without having
// to resort on hooks, states, or any other JavaScript method.
//
// Example of usage:
// component {
//   height: calc(var(--vh, 1vh) * 5); /* This is equal to 5vh */
// }
//
// Note that there's a fallback in this method for browsers that don't
// support CSS variables (which nowadays are a rarity):
// https://caniuse.com/#feat=css-variables
//
// A good thing about this approach is that unlike using regular vh, when
// a on-screen keyboard is shown on the screen var(--vh) is still going
// to consider the initial viewport height, not the reduced one; in other
// words components using vh for height are not going to be crunched to
// smaller sizes if there's a keyboard on screen. This behavior can be avoided
// by assigning an event listener on ('resize' events of window) to update
// the value of this variable.
document.documentElement.style.setProperty(
  "--vh",
  `${window.innerHeight * 0.01}px`,
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
