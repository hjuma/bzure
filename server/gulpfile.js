const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const src_key = ['src/**/*.key', 'src/**/**/*.pem', 'src/**/*.key.pub'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function () {
    return gulp.src(JSON_FILES)
        .pipe(gulp.dest('dist'));
});

gulp.task('key', function () {
    gulp.src(src_key)
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['watch', 'assets', 'key']);

gulp.task('deploy', ['assets', 'key', 'scripts']);