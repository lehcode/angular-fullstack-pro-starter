// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage',
      '@angular-devkit/build-angular/plugins/karma',
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
      dir: require('path').join(__dirname, './coverage/ui'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
      instrumenterOptions: {
        istanbul: { noCompact: true },
      },
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: [
        { type: 'html', subdir: 'report-html' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
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
      outputFile: 'test-results.xml',
    },
    htmlReporter: {
      outputFile: 'test_results/index.html',
    },
    reporters: ['progress', 'coverage', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    singleRun: false,
    restartOnFileChange: true,
    browserNoActivityTimeout: 1920000, // 32min
    browserConsoleLogOptions: {
      level: '',
      format: '%b %T: %m',
      terminal: true,
    },
  });
};
