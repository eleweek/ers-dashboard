var fs = require('fs'),
    rimraf = require('rimraf'),
    stylish = require('jshint-stylish'),
    gulp = require('gulp'),
    changed = require('gulp-changed'),
    plumber = require('gulp-plumber'),
    order = require('gulp-order'),
    dest = require('gulp-dest'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    pxtorem = require('postcss-pxtorem'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    imagehelper = require('gulp-compass-imagehelper'),
    filter = require('gulp-filter');

    rmFile = function (file) {
        fs.stat(file, function (err, stats) {
            if (!err) {
                fs.unlink(file);
            }
        });
    };

gulp.task('css', function () {
    var processors = [
        autoprefixer({
          browsers: ['last 2 versions', 'IE 9'],
          cascade: false
        }),
        pxtorem({
          prop_white_list: []
        })
    ];

    gulp.src(['src/sass/**/*.scss', '!src/sass/themes/custom-theme.scss', '!src/sass/themes/custom-theme.scss.master'])
        .pipe(changed('css'))
        .pipe(sourcemaps.init())
        .pipe(sass()
          .on('error', sass.logError))
        .pipe(cssnano({
            autoprefixer: false,
            mergeLonghand: false,
            zindex: false,
            convertValues: false
        }))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest('./css'))
        .pipe(filter("**/*.css"))
        .pipe(livereload());
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(changed('js'))
        .pipe(plumber({
            errorHandler: function (err) {
                files = [
                    'js/scripts.js',
                    'js/min/scripts.min.js',
                    'js/min/scripts.min.js.map'
                ];

                for (var i = 0; i < files.length; i++) {
                    rmFile(files[i]);
                }

                this.emit('end');
            }
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(order([
			'lib/modernizr-appearence.js',
			'lib/jquery.validate.min.js',
			'lib/jquery.validate.additionalMethods.min.js',
            'env.js',
            'utils/**/*.js',
            'app/**/*.js',
            'template/**/*.js',
            'app.js'
        ]))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('js'))
        .pipe(uglify({mangle: false}))
        .pipe(dest('js/min', {ext: '.min.js'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});

gulp.task('jsadmin', function () {
    return gulp.src('src/admin/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(changed('js'))
        .pipe(plumber({
            errorHandler: function (err) {
                files = [
                    'js/admin/scripts.js',
                    'js/admin/min/scripts.min.js',
                    'js/admin/min/scripts.min.js.map'
                ];

                for (var i = 0; i < files.length; i++) {
                    rmFile(files[i]);
                }

                this.emit('end');
            }
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(concat('admin-scripts.js'))
        .pipe(gulp.dest('js/admin'))
        .pipe(uglify({mangle: false}))
        .pipe(dest('js/admin/min', {ext: '.min.js'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});

gulp.task('images-compile', function () {
    rimraf('images', function () {
        return gulp.src('src/images/**/*{.jpg,.jpeg,.png,.svg}')
            .pipe(imagemin({
                progressive: true
            }))
            .on('error', function (error) {
                console.error(error);

                this.emit('end');
            })
            .pipe(gulp.dest('images'))
            .pipe(livereload());
    });
});

gulp.task('images-watch', function () {
    return gulp.src('src/images/**/*{.jpg,.jpeg,.png,.svg,.gif}')
        .pipe(changed('images'))
        .pipe(imagemin({
            progressive: true
        }))
        .on('error', function (error) {
            console.error(error);

            this.emit('end');
        })
        .pipe(gulp.dest('images'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('src/sass/**/*.scss', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/admin/js/**/*.js', ['jsadmin']);
    gulp.watch(['*.php','**/*.php'], livereload.reload);
    gulp.watch('src/images/**/*{.jpg,.jpeg,.png,.svg,.gif}', ['images-watch', 'imagehelper']);
});

gulp.task('imagehelper', function() {
    return gulp.src('src/images/**/*.+(jpeg|jpg|png|gif|svg)')
        .pipe(imagehelper({
            targetFile: '_imagehelper.scss',
            images_path: 'images/',
            css_path: 'css/'
        }))
        .pipe(gulp.dest('src/sass/global'));
});

gulp.task('default', ['watch']);
gulp.task('compile', ['css', 'js', 'jsadmin', 'images-compile', 'imagehelper']);
