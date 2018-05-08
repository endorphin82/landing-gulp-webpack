var gulp = require('gulp'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream'),
  sass = require('gulp-sass');

gulp.task('scripts', function () {
  return gulp.src('./src/js/app.js')
    .pipe(webpackStream({
      output: {
        filename: 'app.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['env']
            }
          }
        ]
      },
      externals: {
        jquery: 'jQuery'
      }
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/'));
})
gulp.task('css', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
})
gulp.task('watch', function(){
  gulp.watch('src/**/*.scss', gulp.series('css'))
})