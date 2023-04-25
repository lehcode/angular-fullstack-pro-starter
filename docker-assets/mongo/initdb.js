console.log(process.env);

// Connect to the MongoDB instance
const conn = new Mongo();

// Initialize constants
const collections = process.env.mongo_collections.split(",");
const rootUser = process.env.mongo_root_user;
const rootPass = process.env.mongo_root_pass;
const dataDbName = process.env.db;
const adminDb = conn.getDB('admin');
const dataDb = conn.getDB(dataDbName);
const userName = process.env.mongo_user;
const userPass = process.env.mongo_pass;

adminDb.createUser({ user: rootUser, pwd: rootPass, roles: ["root"] });

// Create the user with read and write access to the specified collections
adminDb.createUser({
  user: userName,
  pwd: userPass,
  roles: collections.map(name => ({
    role: "readWrite",
    db: dataDbName,
    collection: name.trim()
  }))
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
