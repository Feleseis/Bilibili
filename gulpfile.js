const gulp = require('gulp');
const less = require('gulp-less');


gulp.task('less', () => {
    gulp.src('./public/less/*.less').pipe(less()).pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
    gulp.watch('./public/less/*.less', ['less']);
});
