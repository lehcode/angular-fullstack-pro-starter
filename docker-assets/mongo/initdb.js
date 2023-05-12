if (process.env.debug === 'yes') {
  console.log(process.env);
}

// Connect to the MongoDB instance
const conn = new Mongo();

// Initialize constants
const rootUser = process.env.root_user;
const rootPass = process.env.root_pass;
const adminDb = conn.getDB(process.env.admin_db.trim());
const dataDb = conn.getDB(process.env.data_db.trim());
const userName = process.env.user;
const userPass = process.env.pass;

adminDb.createUser({
  user: rootUser,
  pwd: rootPass,
  roles: ["root"]
});
adminDb.getUsers();
adminDb.auth(rootUser, rootPass);

// Create the user with read and write access to the specified collections
dataDb.createUser({
  user: userName,
  pwd: userPass,
  roles: ["readWrite"]
});
dataDb.getUsers();
dataDb.auth(userName, userPass);

sleep(1000);
