const gulp = require('gulp')
const minimist = require('minimist')
const run = require('@tianhuil/gulp-run-command').default
const env = require('./env/.env.js')
// const shell = require('gulp-shell')

const options = minimist(process.argv.slice(2), {})

gulp.task('test', async () => run('jest \\.test\\.ts --watchAll')())
gulp.task('start', async () => run('ts-node-dev --respawn --transpileOnly src/index.ts', { env: env.development })())
