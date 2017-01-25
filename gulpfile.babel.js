import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import del from 'del';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';
import mocha from 'gulp-mocha';
import flow from 'gulp-flowtype';

const paths = {
    allSrcJs: 'src/**/*.js?(x)',
    serverSrcJs: 'src/server/**/*.js?(x)',
    sharedSrcJs: 'src/shared/**/*.js?(x)',
    clientEntryPoint: 'src/client/app.jsx',
    gulpFile: 'gulpfile.bable.js',
    webpackFile: 'webpack.config.bable.js',
    libDir: 'lib',
    distDir: 'dist',
    clientBundle: 'dist/client-bundle.js?(.map)',
    allLibTests: 'lib/test/**/*.js',
};

gulp.task('clean', () => {
  return del([
    paths.libDir,
    paths.clientBundle,
  ]);
});

gulp.task('lint', () => {
    return gulp.src([
        paths.allSrcJs,
        paths.gulpFile,
        paths.webpackFile
    ])
    .pipe(eslint({ fix: true, rules: { 'no-console': 0 } }))
    .pipe(eslint.format())
    .pipe(flow());
});

gulp.task('build', ['lint', 'clean'], () => {
    return gulp.src(paths.allSrcJs)
        .pipe(babel())
        .pipe(gulp.dest(paths.libDir));
});

gulp.task('test', ['build'], () =>
  gulp.src(paths.allLibTests)
    .pipe(mocha())
);

gulp.task('main', ['test'], () => {
    return gulp.src(paths.clientEntryPoint)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.distDir));
});

gulp.task('watch', () => {
    gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);

