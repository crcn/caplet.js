var gulp        = require("gulp");
var istanbul    = require("gulp-istanbul");
var react       = require("gulp-react");
var mocha       = require("gulp-mocha");
var plumber     = require("gulp-plumber");
var jshint      = require("gulp-jshint");
var browserify  = require("browserify");
var uglify      = require("gulp-uglify");
var source      = require("vinyl-source-stream");
var buffer      = require("vinyl-buffer");
var browserifyMiddlewate  = require("browserify-middleware");
var express  = require("express");

var karma    = require("karma").server;
var options  = require("yargs").argv;

/**

/**
 */

var paths = {
    testFiles: ["test/**/*-test.js"],
    appFiles: ["lib/**/*.js"],
    allFiles: ["test/**", "lib/**"],
    covFiles: ["coverage/**/*"]
};

/**
 */

var mochaOptions = {
    bail: options.bail !== 'false',
    reporter: options.reporter || 'dot',
    grep: options.grep || options.only
}

/**
 */

gulp.task("test-coverage", function (complete) {

    // reset coverage on each task cycle - keep this
    // here in case "watch" is called
    global.__coverage__ = {};

    gulp.
    src(paths.appFiles).
    pipe(istanbul()).
    pipe(istanbul.hookRequire()).
    on("finish", function () {
        gulp.
        src(paths.testFiles).
        pipe(plumber()).
        pipe(mocha(mochaOptions)).
        pipe(istanbul.writeReports({
            coverageVariable: "__coverage__",
            reporters: ["text","text-summary", "lcov"]
        })).
        on("end", complete);
    });
});

gulp.task("bundle", function() {


    return browserify("./lib/index.js")
    .bundle()
    .pipe(source('caplet.min.js')) 
    .pipe(buffer()) 
    .pipe(uglify()) 
    .pipe(gulp.dest('./dist'));

});

/**
 */

gulp.task("test-browser", function(complete) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, complete);
});


/**
 */

gulp.task("lint", function() {
    return gulp.run(["jsxhint", "jsxcs"]);
});

/**
 */

gulp.task("jsxcs", function() {
    return gulp.
    src(paths.appFiles).
    pipe(jsxcs({
        "preset": "google",
        "requireParenthesesAroundIIFE": true,
        "maximumLineLength": 120,
        "validateLineBreaks": "LF",
        "validateIndentation": 2,
        "validateQuoteMarks": "\"",

        "disallowKeywords": ["with"],
        "disallowSpacesInsideObjectBrackets": null,
        "disallowImplicitTypeConversion": ["string"],
        "requireCurlyBraces": [],

        "safeContextKeyword": "self"
    }))
});

/**
 * IMPORTANT: run this command AFTER watch - e.g: gulp test-coverage watch browser-sync
 */

gulp.task("browser-sync", function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        files: paths.covFiles
    })
});

/**
 */

gulp.task("test", function (complete) { 
    gulp.
    src(paths.testFiles, { read: false }).
    pipe(plumber()).
    pipe(mocha(mochaOptions)).
    on("end", complete);
});

var iofwatch = process.argv.indexOf("watch");

/**
 * runs previous tasks (1 or more)
 */

gulp.task("watch", function () {
    gulp.watch(paths.allFiles, process.argv.slice(2, iofwatch));
});

/**
 */

gulp.task("default", function () {
    return gulp.run("test-coverage");
});

/**
 */

gulp.task("example-server", function (complete) {
    var server = express();
    var port;
    server.use("/js/bundle.js", browserifyMiddlewate(__dirname + "/examples/" + (options.example || "default") + "/index.js", { extensions: [".jsx"],grep:/\.jsx$/,transform: [require("reactify")]}));
    server.use(express.static(__dirname + "/examples/_static"));
    server.listen(port = Number(options.port || 8080));
    console.log("running example server on port %d", port);
});

/**
 */

gulp.doneCallback = function (err) {


    // a bit hacky, but fixes issue with testing where process
    // doesn't exist process. Also fixes case where timeout / interval are set (CC)
    if (!~iofwatch) process.exit(err ? 1 : 0);
};