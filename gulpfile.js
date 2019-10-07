const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const rev = require('gulp-rev');
const del = require('del');


gulp.task('css', function(done){
    console.log('minifying css...');
    
    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({cwd: 'public', merge: true}))
    .pipe(gulp.dest('./public/assets'));

    done();
});

gulp.task('js', function(done){
    console.log('minifying js...');
    
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({cwd: 'public', merge: true}))
    .pipe(gulp.dest('./public/assets'));

    done();
});

gulp.task('image', function(done){
    console.log('minifying images...');
    
    gulp.src('./assets/**/*.*(png|jpg|jpeg|gif|svg)')//*(png|jpg|jpeg|gif|svg) is a regex(i.e. regular expression) helps to match any of the strings.
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({cwd: 'public', merge: true}))
    .pipe(gulp.dest('./public/assets'));

    done();
});

//Empty the public assets directory
gulp.task('clean-assets', function(done){
    del.sync('./public/assets');
    done(); 
});

gulp.task('build', gulp.series('clean-assets', 'css', 'js', 'image'), function(done){
    console.log('Running Build');
    done();
});     