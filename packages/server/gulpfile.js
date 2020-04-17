const gulp = require('gulp')
const minimist = require('minimist')
const run = require('@tianhuil/gulp-run-command').default
const envs = require('./env/.env.js')

const options = minimist(process.argv.slice(2), {})

const runEnv = (cmd, env=undefined) => run(
  cmd,
  { env : env ? env : envs[options.env] }
)

const envRequired = async (cb) => {
  if (!envs.isEnv(options.env)) {
    throw Error('env is not set.  Must set valid env')
  }
  cb()
}

// start
gulp.task('start',
  runEnv(
    'ts-node-dev --respawn --transpileOnly src/index.ts',
    envs.development
  )
)

// proto
gulp.task('proto',
  runEnv(`ts-node-dev --transpileOnly ${options._[0]}`,
    envs.development
  )
)

// emulator
gulp.task('emulator',
  runEnv(`firebase emulators:exec --only firestore`)
)

// test
gulp.task('test', runEnv('jest \\.test\\.ts', envs.test ))

gulp.task('test:watch', runEnv('jest \\.test\\.ts --watchAll', envs.test))

gulp.task('test:e2e', runEnv('firebase emulators:exec --only firestore "jest \\.e2e\\.ts"', envs.test))

gulp.task('test:e2e-watch', runEnv('firebase emulators:exec --only firestore "jest \\.e2e\\.ts --watchAll"', envs.test))

// build
gulp.task('tsc', runEnv('tsc'))
gulp.task('link', runEnv('ln -sf ../../../src/service/zip/uszips.csv ./dist/service/zip/uszips.csv'))
gulp.task('pug', () => gulp.src('./src/views/*.pug').pipe(gulp.dest('./dist/views')))

gulp.task('build', gulp.series(
  envRequired,
  'link',
  'pug',
  'tsc',
))

// deploy
gulp.task('appsubst', runEnv('./appsubst.sh'))
gulp.task('gcloud', runEnv('gcloud app deploy --project mmb-staging'))
gulp.task('tag', runEnv(`./tag.sh server ${options.env}`))

gulp.task('deploy', gulp.series(
  envRequired,
  'build',
  'appsubst',
  'gcloud',
  'tag',
))

gulp.task('index', 
  runEnv('firebase --project mmb-staging deploy --only firestore:indexes')
)
