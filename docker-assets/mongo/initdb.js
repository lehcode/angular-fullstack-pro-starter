console.log(process.env);

// Connect to the MongoDB instance
const conn = new Mongo();

// Initialize constants
const collections = process.env.collections.split(",");
const rootUser = process.env.root_user;
const rootPass = process.env.root_pass;
const adminDb = conn.getDB('admin');
const dataDb = conn.getDB(process.env.db);
const userName = process.env.user;
const userPass = process.env.pass;

adminDb.createUser({ user: rootUser, pwd: rootPass, roles: ["root"] });
adminDb.auth(rootUser, rootPass);

// Create the user with read and write access to the specified collections
adminDb.createUser({
  user: userName,
  pwd: userPass,
  roles: [{ role: "readWrite", db: process.env.db }]
});

adminDb.auth(userName, userPass);

// const collection = dataDb.getCollection('i18n');
// const records = [{
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   lang: 'dev',
//   ns: 'default',
//   key: 'foo',
//   i18n: new Map([['en', 'foo'], ['dev', 'dev_foo']]),
//   modifiedDate: new Date()
// },
// {
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   lang: 'dev',
//   ns: 'default',
//   key: 'dev_bar',
//   i18n: new Map([['en', 'bar'], ['dev', 'dev_bar']]),
//   modifiedDate: new Date()
// }];

// const result = collection.insertMany(records, { ordered: true });
// console.log(`${result.insertedCount} documents were inserted`);
