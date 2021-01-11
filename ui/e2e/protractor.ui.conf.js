// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
var config = exports.config = require('./protractor.conf.js').config;
config.capabilities.chromeOptions.args = ['--window-size=1680,1050', '--no-sandbox'];

process.env.CHROME_BIN = require("puppeteer").executablePath({executablePath: "/usr/bin/google-chrome"});

const {SpecReporter, StacktraceOption} = require("jasmine-spec-reporter");

/**
 * @type { import("protractor").Config }
 */
exports.config = {
    allScriptsTimeout: 11000,
    specs: ["./src/**/*.e2e-spec.ts"],
    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            binary: process.env.CHROME_BIN,
            args: ["--headless", "--disable-gpu", "--window-size=1280,1024", "--no-sandbox"]
        }
    },
    directConnect: true,
    //SELENIUM_PROMISE_MANAGER: false,
    baseUrl: "http://localhost:4200/", // SSR server port
    framework: "jasmine",
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function () {
        },
    },
    onPrepare() {
        require("ts-node").register({
            project: require("path").join(__dirname, "tsconfig.e2e.json"),
        });

        jasmine.getEnv().addReporter(
            new SpecReporter({
                spec: {
                    displayStacktrace: StacktraceOption.PRETTY,
                },
            })
        );
    },
};
