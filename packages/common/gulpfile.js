const gulp = require('gulp')
const run = require('@tianhuil/gulp-run-command').default

gulp.task('test', run('jest'))

// stub entries to prevent error
gulp.task('build', (cb) => { cb() })

gulp.task('test', (cb) => { cb() })

gulp.task('lint', (cb) => { cb() })
