console.log(process.env);

// Connect to the MongoDB instance
const conn = new Mongo();

// Initialize constants
const collections = process.env.mongo_collections.split(",");
const rootUser = process.env.mongo_root_user;
const rootPass = process.env.mongo_root_pass;
const adminDb = conn.getDB('admin');
const dataDb = conn.getDB(process.env.db);
const userName = process.env.mongo_user;
const userPass = process.env.mongo_pass;

adminDb.createUser({ user: rootUser, pwd: rootPass, roles: ["root"] });

// Create the user with read and write access to the specified collections
adminDb.createUser({
  user: userName,
  pwd: userPass,
  roles: collections.map(name => ({
    role: "readWrite",
    db: process.env.db,
    collection: name.trim()
  }))
});

adminDb.auth(userName, userPass);
