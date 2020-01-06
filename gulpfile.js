const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const path = require('path');
const url = require('gulp-css-url-adjuster');
const autoprefixer = require('gulp-autoprefixer');
// const postcss = require('gulp-postcss');
// const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
// const minifyCss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');

const params = {
  out: 'public',
  htmlSrc: 'buttons.html',
  levels: ['common.blocks, desktop.blocks'],
};

gulp.task('default', () => {
  return gulp.src('common.blocks/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('styles.css'))
    // .pipe(url({ prepend: 'images/'}))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(params.out))
    .pipe(debug());
    // .pipe(reload({ stream: true }));  
});

// gulp.task('default', ['server', 'build']);

// gulp.task('server', () => {
//   browserSync.init({
//     server: params.out
//   });

//   gulp.watch('*.html', ['html']);
//   gulp.watch(params.levels.map((level) => {
//     const cssGlob = level + '/**/*.css';
//     return cssGlob;
//   }), ['css']);
// });

// gulp.task('build', [ 'css']);

// gulp.task('html', () => {
//   gulp.src(params.htmlSrc)
//   .pipe(rename('index.html'))
//   .pipe(gulp.dest(params.out))
//   .pipe(reload({ stream: true }));
// });

// gulp.task('css', () => {
//   gulp.src(['common.blocks/**/*.css', 'desktop.blocks/**/*.css'])
//   .pipe(sourcemaps.init())
//   .pipe(concat('styles.css'))
//   .pipe(url({ prepend: 'images/'}))
//   .pipe(postcss([ autoprefixer() ]))
//   .pipe(sourcemaps.write())
//   .pipe(gulp.dest(params.out))
//   .pipe(reload({ stream: true }));  
// });

// gulp.task('images', () => {
//   gulp.src(source.dirs.map((dir) => {
//     const imgGlobe = path.resolve(dir) + '/*.{jpg,png,svg}';
//     return imgGlobe;
//   }))
//   .pipe(imagemin({
//     progressive: true,
//     svgoPlugins: [{ removeViewBox: false }],
//     use: [ pngquant() ],
//     interlaced: true
//   }))
//   .pipe(gulp.dest(path.join(params.out, 'images')));
// });

// gulp.task('clean', function (cb) {
//   rimraf(path.clean, cb);
// });

gulp.task('build', () => {
  return gulp.src('common.blocks/button/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public'))
    .pipe(debug());
});
