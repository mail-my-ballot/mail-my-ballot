const fs = require('fs')
const yaml = require('js-yaml')
const gulp = require('gulp')
const minimist = require('minimist')
const run = require('@tianhuil/gulp-run-command').default
const envs = require('../../env/.env.js')

// Helper functions

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

function setAppYaml(cb, env) {
  // gcloud requires env vars to be written into app.yaml file directly
  const inputStr = fs.readFileSync('app.tmpl.yaml')
  const data = yaml.safeLoad(inputStr)
  data.env_variables = env
  const outputStr = yaml.safeDump(data)
  fs.writeFileSync('app.yaml', outputStr, 'utf8')
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
  runEnv(`ts-node-dev --transpileOnly ${options.file}`,
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
gulp.task('appsubst', gulp.series(
  envRequired,
  (cb) => setAppYaml(cb, envs[options.env])
))
gulp.task('gcloud', // --quiet disables interaction in gcloud
  runEnv('gcloud app deploy --quiet --project mmb-staging')
)
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
