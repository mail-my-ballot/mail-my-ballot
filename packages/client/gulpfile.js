const gulp = require('gulp')
const minimist = require('minimist')
const run = require('@tianhuil/gulp-run-command').default
const envs = require('../../env/env.js')

const options = minimist(process.argv.slice(2), {})

const runEnv = (cmd, env=undefined) => run(
  cmd,
  { env : env ? env : envs[options.env] }
)

const envRequired = async (cb) => {
  if (!envs.hasOwnProperty(options.env)) {
    throw Error('env is not set.  Must set valid env')
  }
  cb()
}

// start
gulp.task('start',
  runEnv(
    'react-app-rewired start',
    envs.development
  )
)

// build
gulp.task('build', gulp.series(
  envRequired,
  runEnv('react-app-rewired build')
))
  
// test
gulp.task('test', runEnv('react-app-rewired test --watchAll=false', envs.test))

gulp.task('test:watch', runEnv('react-app-rewired test', envs.test))

// lint
gulp.task('lint', runEnv('eslint . --ext .ts,.tsx'))
gulp.task('lint::fix', runEnv('eslint . --ext .ts,.tsx --fix'))

// analyze
gulp.task('source-map', runEnv("source-map-explorer 'build/static/js/*.js'"))

gulp.task('analyze', gulp.series(
  'build',
  'source-map',
))

// deploy
gulp.task('now', runEnv(`now --prod ./build --local-config=./now.${options.env}.json --confirm`))
gulp.task('tag', runEnv(`./tag.sh client ${options.env}`))

gulp.task('deploy', gulp.series(
  envRequired,
  'build',
  'now',
  'tag',
))

// serve
gulp.task('serve', runEnv('serve -s ./build'))
