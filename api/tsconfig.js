module.exports = {
  compilerOptions: {
    emitDecoratorMetadata: true,
    esModuleInterop: true,
    experimentalDecorators: true,
    forceConsistentCasingInFileNames: true,
    inlineSourceMap: true,
    sourceMap: true,
    lib: ['es2019', 'es2020.bigint', 'es2020.string', 'es2020.symbol.wellknown'],
    module: 'commonjs',
    noImplicitAny: true,
    outDir: './dist',
    rootDir: './src',
    resolveJsonModule: true,
    skipLibCheck: true,
    strict: true,
    strictNullChecks: true,
    target: 'es2015',
    types: ['jest', 'node']
  },
  include: [
    'src/**/*.ts',
    'node_modules/@types/jest/index.d.ts',
    'node_modules/@types/node/index.d.ts'
  ],
  exclude: [
    'node_modules',
    '*.js'
  ]
}
