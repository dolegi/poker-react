import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import del from 'del';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';
import mocha from 'gulp-mocha';
import flow from 'gulp-flowtype';

const configFile = './.eslintrc.js';
const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientSrcJs: 'src/client/**/*.js?(x)',
  clientEntryPoint: 'src/client/app.jsx',
  gulpFile: 'gulpfile.bable.js',
  webpackFile: 'webpack.config.bable.js',
  libDir: 'lib',
  distDir: 'dist',
  clientBundle: 'dist/client-bundle.js?(.map)',
  allLibTests: 'lib/test/**/*.js',
};

gulp.task('clean', () => del([
  paths.libDir,
  paths.clientBundle,
]));

gulp.task('lint', () => gulp.src([
    paths.clientSrcJs,
    paths.gulpFile,
    paths.webpackFile
  ])
  .pipe(eslint({
    fix: true,
    configFile
  }))
  .pipe(eslint.format())
  .pipe(flow()));

gulp.task('build', ['lint', 'clean'], () => gulp.src(paths.allSrcJs)
  .pipe(babel())
  .pipe(gulp.dest(paths.libDir)));

gulp.task('test', ['build'], () =>
  gulp.src(paths.allLibTests)
  .pipe(mocha()),
);

gulp.task('dist', () => gulp.src(paths.clientEntryPoint)
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(paths.distDir)));

gulp.task('main', ['test'], () => gulp.src(paths.clientEntryPoint)
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(paths.distDir)));

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);