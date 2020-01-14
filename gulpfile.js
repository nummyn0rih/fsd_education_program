const gulp = require('gulp');
const Builder = require('gulp-bem-bundle-builder');
const bundler = require('gulp-bem-bundler-fs');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const path = require('path');
const url = require('gulp-css-url-adjuster');
const autoprefixer = require('gulp-autoprefixer');
// const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
// const minifyCss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const del = require('del');

const params = {
  out: 'public',
  htmlSrc: 'index_guests_dropdown.html',
  levels: [
    'common.blocks',
    'desktop.blocks'
  ],
};

// gulp.task('styles', () => {
//   const AUTOPREFIXER_BROWSERS = [
//     'ie >= 10',
//     'ie_mob >= 10',
//     'ff >= 30',
//     'chrome >= 34',
//     'safari >= 7',
//     'opera >= 23',
//     'ios >= 7',
//     'android >= 4.4',
//     'bb >= 10'
//   ];

//   // For best performance, don't add Sass partials to `gulp.src`
//   return gulp.src([
//     'common.blocks/**/*.sass',
//     'common.blocks/**/*.css'
//   ])
//     .pipe(sourcemaps.init())
//     .pipe(sass({
//       precision: 10
//     }).on('error', sass.logError))
//     .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
//     .pipe(gulp.dest('.tmp/styles'))
//     // Concatenate and minify styles
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('public/styles'))
//     .pipe(gulp.dest('.tmp/styles'));
// });

// // Clean output directory
// gulp.task('clean', () => del(['.tmp', 'public/styles'], {dot: true}));

// // Watch files for changes & reload
// gulp.task('serve', ['styles'], () => {
//   browserSync({
//     notify: false,
//     // Customize the Browsersync console logging prefix
//     logPrefix: 'WSK',
//     // Allow scroll syncing across breakpoints
//     scrollElementMapping: ['main', '.mdl-layout'],
//     // Run as an https by uncommenting 'https: true'
//     // Note: this uses an unsigned certificate which on first access
//     //       will present a certificate warning in the browser.
//     // https: true,
//     server: ['.tmp', 'common.blocks'],
//     port: 3000
//   });

//   gulp.watch(['public/**/*.html'], reload);
//   gulp.watch(['public/styles/**/*.{sass,css}'], ['styles', reload]);
// });

// // Build production files, the default task
// gulp.task('default', ['clean'], cb =>
//   runSequence(
//     'styles',
//     cb
//   )
// );

// gulp.task('default', ['serve', 'build']);

gulp.task('server', () => {
  browserSync.init({
    server: params.out
  });

  gulp.watch('*.html', gulp.series('html'));
  gulp.watch('common.blocks/**/*.sass', gulp.series('sass'));
  gulp.watch('js/**/*.js', gulp.series('script'));

  // gulp.watch(params.levels.map((level) => {
  //   const cssGlob = level + '/**/*.css';
  //   return cssGlob;
  // }), ['css']);
});

// gulp.task('build', gulp.series('sass'));

gulp.task('html', () => {
  return gulp.src(params.htmlSrc)
    .pipe(rename('index.html'))
    .pipe(debug())
    .pipe(gulp.dest(params.out))
    .pipe(reload({ stream: true }));
});

gulp.task('sass', () => {
  return gulp.src('common.blocks/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(sourcemaps.write())
    .pipe(debug())
    .pipe(gulp.dest(params.out))
    .pipe(reload({ stream: true }));
});

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

gulp.task('script', () => {
  return gulp.src('js/**/*.js')
  .pipe(concat('index.js'))
  .pipe(gulp.dest(params.out))
  .pipe(reload({ stream: true }));
});

gulp.task('del', () => {
  return del(['public']);
});
