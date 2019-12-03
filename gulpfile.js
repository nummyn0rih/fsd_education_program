const gulp = require('gulp');
const debug = require('gulp-debug');
const concat = require('gulp-concat');

gulp.task('build', () => {
  return gulp.src('common.blocks/button/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist'))
    .pipe(debug());
});

gulp.task('watch', () => {
  gulp.watch('common.blocks/button/*.css', gulp.series('build'));
});
