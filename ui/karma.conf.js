// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

process.env.CHROME_BIN = require("puppeteer").executablePath({executablePath: "/usr/bin/google-chrome"});

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-jasmine-html-reporter",
      "karma-coverage",
      "@angular-devkit/build-angular/plugins/karma",
    ],
    client: {
      captureConsole: true,
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    files: [],
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/ui"),
      subdir: ".",
      reporters: [{type: "html"}, {type: "text-summary"}],
      instrumenterOptions: {
        istanbul: {noCompact: true},
      },
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "coverage"),
      reports: [
        {type: "html", subdir: "report-html"},
        {type: "cobertura", subdir: ".", file: "cobertura.txt"},
        {type: "text-summary", subdir: ".", file: "text-summary.txt"},
      ],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 80,
        lines: 80,
        branches: 80,
        functions: 80,
      },
    },
    junitReporter: {
      outputFile: "test-results.xml",
    },
    htmlReporter: {
      outputFile: "test_results/index.html",
    },
    reporters: ["progress", "coverage", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: [
          "--no-sandbox",
          "--disable-gpu",
          "--headless",
          "--disable-setuid-sandbox",
          "--remote-debugging-address=0.0.0.0",
          "--remote-debugging-port=9222",
        ],
      },
    },
    singleRun: true,
    restartOnFileChange: true,
    browserNoActivityTimeout: 1920000, // 32min
    browserConsoleLogOptions: {
      level: "",
      format: "%b %T: %m",
      terminal: true,
    },
  });
};
