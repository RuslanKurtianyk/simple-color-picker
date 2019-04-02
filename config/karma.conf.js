const path = require("path");

module.exports = function (config) {
    const testReports = "test_reports";

    config.set({
        basePath: path.join(process.cwd()),
        frameworks: ["jasmine"],
        files: [
            { pattern: "src/base.spec.js" },
            { pattern: "src/**/*.spec.js" },
        ],
        exclude: [
            "./node_modules/*",
        ],
        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-jasmine-html-reporter"),
            require("karma-coverage-istanbul-reporter"),
            require("karma-junit-reporter"),
            require("karma-htmlfile-reporter"),
        ],
        reporters: ["junit", "html"],
        port: 5555,
        colors: true,
        autoWatch: true,
        browsers: ["Chrome"],
        singleRun: false,
        concurrency: Infinity,
        coverageOptions: {
            exclude: [/\.spec\.js?/, /.*node_modules.*/],
        },
        reports: {
            html: {
                directory: testReports,
                subdirectory: "coverage",
            }
        },
        htmlReporter: {
            outputFile: path.join(testReports, "html.tests.html"),
            subPageTitle: "Colorpicker test results",
            useCompactStyle: true,
        },

    });
}
