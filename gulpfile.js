const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

function styles() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], cascade: true }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

function html() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: { baseDir: './dist' },
    notify: false
  });

  gulp.watch('./src/scss/**/*.scss', styles);
  gulp.watch('./src/*.html', html);
  gulp.watch('./src/js/**/*.js', scripts);
}

exports.styles = styles;
exports.html = html;
exports.scripts = scripts;
exports.watch = watch;

exports.default = gulp.series(
  gulp.parallel(html, styles, scripts),
  watch
);
