const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require("gulp-rename");
const gcmq = require('gulp-group-css-media-queries');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
// const sass = require('gulp-sass')(require('scss'));

gulp.task('style', style)
function style() {
    return gulp.src('./app/precss/style.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        // .pipe(sass().on('error', sass.logError))
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: 'last 10 versions',
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(gulp.dest('./app/css/'))
        .pipe(csso())
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./app/css/'))
        .pipe(browserSync.stream());
}

gulp.task('watch', function () {
    watch('./app/precss/**/*.less', style)
    watch('./app/index.html', browserSync.reload)
    watch('./app/script.js', browserSync.reload)
    watch('./app/img/*.*', browserSync.reload)
})

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });
});

gulp.task('default', gulp.parallel('style', 'watch', 'server'));