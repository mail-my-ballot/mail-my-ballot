const gulp = require('gulp')
const minimist = require('minimist')
const run = require('gulp-run-command').default

const options = minimist(process.argv.slice(2), {})

gulp.task('test', run('echo hello'))
