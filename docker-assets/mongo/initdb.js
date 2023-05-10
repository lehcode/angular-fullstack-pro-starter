if (process.env.debug !== undefined && process.env.debug !== '') {
  console.log(process.env);
}

// Connect to the MongoDB instance
const conn = new Mongo();

// Initialize constants
const rootUser = process.env.root_user;
const rootPass = process.env.root_pass;
const adminDb = conn.getDB('admin');
const db = conn.getDB(process.env.db);
const userName = process.env.user;
const userPass = process.env.pass;

adminDb.createUser({ user: rootUser, pwd: rootPass, roles: ["root"] });
adminDb.auth(rootUser, rootPass);

// Create the user with read and write access to the specified collections
adminDb.createUser({
  user: userName,
  pwd: userPass,
  roles: [{ role: "readWrite", db: db.getName() }]
});

adminDb.auth(userName, userPass);
