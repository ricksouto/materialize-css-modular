//dependencies
var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    rename        = require('gulp-rename'),
    minifyCss     = require('gulp-clean-css'),
    autoprefixer  = require('gulp-autoprefixer'),
    concat        = require('gulp-concat'),
    sourcemaps    = require('gulp-sourcemaps'),
    uglify        = require('gulp-uglify-es').default;

//js path
var jsfiles = [
  "_assets/js/vendor/initial.js",
  "_assets/js/vendor/jquery.easing.1.4.js",
  "_assets/js/vendor/animation.js",
  "_assets/js/vendor/velocity.min.js",
  "_assets/js/vendor/hammer.min.js",
  "_assets/js/vendor/jquery.hammer.js",
  "_assets/js/vendor/global.js",
  "_assets/js/vendor/collapsible.js",
  "_assets/js/vendor/dropdown.js",
  "_assets/js/vendor/modal.js",
  "_assets/js/vendor/materialbox.js",
  "_assets/js/vendor/parallax.js",
  "_assets/js/vendor/tabs.js",
  "_assets/js/vendor/tooltip.js",
  "_assets/js/vendor/waves.js",
  "_assets/js/vendor/toasts.js",
  "_assets/js/vendor/sideNav.js",
  "_assets/js/vendor/scrollspy.js",
  "_assets/js/vendor/forms.js",
  "_assets/js/vendor/slider.js",
  "_assets/js/vendor/cards.js",
  "_assets/js/vendor/chips.js",
  "_assets/js/vendor/pushpin.js",
  "_assets/js/vendor/buttons.js",
  "_assets/js/vendor/transitions.js",
  "_assets/js/vendor/scrollFire.js",
  "_assets/js/vendor/date_picker/picker.js",
  "_assets/js/vendor/date_picker/picker.date.js",
  "_assets/js/vendor/date_picker/picker.time.js",
  "_assets/js/vendor/character_counter.js",
  "_assets/js/vendor/carousel.js",
  "_assets/js/vendor/tapTarget.js",
  "_assets/js/main.js",
];

//generate css
gulp.task('sass', function(){
    gulp.src('_assets/scss/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: [
          'last 2 versions',
          'Chrome >= 30',
          'Firefox >= 30',
          'ie >= 10',
          'Safari >= 8'
        ]
      }))
      .pipe(rename('style.css'))
      .pipe(gulp.dest('css/'))
      .pipe(minifyCss())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('css/'));
});

//generate js
gulp.task('scripts', function (){
  return gulp.src(jsfiles)
    .pipe(concat('main.js'))
    .pipe(sourcemaps.init())
    .pipe(rename('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

//watch funcions
gulp.task('watch', function(){
  gulp.watch('_assets/scss/**/*.scss', ['sass']);
  gulp.watch(jsfiles, ['scripts']);
});

//browser sync
gulp.task('sync', function(){
  browserSync.init({
    proxy: 'localhost/sitename'
  });
  gulp.watch('**/*.php').on('change', browserSync.reload);
  gulp.watch('dist/js/*.js').on('change', browserSync.reload);
  gulp.watch('css/style.css').on('change', browserSync.reload);
});
