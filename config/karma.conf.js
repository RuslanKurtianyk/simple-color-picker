const path = require("path");

module.exports = function (config) {
    const testReports = "test_reports";

    config.set({
        basePath: path.join(process.cwd()),
        frameworks: ["jasmine"],
        files: [
            { pattern: "test-context.js" },
        ],
        preprocessors: {
            "test-context.js": ["webpack"]
        },
        webpack: {
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                          loader: "babel-loader"
                        }
                      }
                ]
            },
            watch: true
        },
        plugins: [
            require("karma-jasmine"),
            require("karma-webpack"),
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
