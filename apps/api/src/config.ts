export default (): Record<string, any> => ({
  api: {
    port: process.env.API_PORT,
    ssl: process.env.SSL
  },
  hostname: process.env.HOSTNAME || 'localhost',
  services: {},
  env: process.env.NODE_ENV,
  i18n: {
    locales: ['en', 'uk', 'dev'],
    default: 'en',
    fallback: 'dev',
    defaultNs: 'default'
  },
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    urlParams: process.env.MONGO_URL_PARAMS,
    db: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS
  }
});
