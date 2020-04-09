const gulp = require('gulp')
const run = require('@tianhuil/gulp-run-command').default

gulp.task('test', run('jest'))
