export default (): Record<string, any> => ({
  api: {
    port: process.env.API_PORT || 3000,
    ssl: true
  },
  auth: {
    passport: {
      // More Passport strategies at http://www.passportjs.org/packages/
      strategy: 'local'
    }
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
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT_CONTAINER || 27017,
    urlParams: process.env.MONGO_URL_PARAMS,
    db: process.env.MONGO_DB || 'starter',
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    secure: process.env.MONGO_SECURE

  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    db: process.env.MYSQL_DB || 'starter',
    user: process.env.MYSQL_USER,
    pass: process.env.MYSQL_PASS
  }
});
// @ts-ignore