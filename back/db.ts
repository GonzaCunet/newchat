import * as admin from "firebase-admin";
// import * as serviceAccount from "./key.json";
const serviceAccount =
  process.env.ENVIRONMENT == "DEV"
    ? require("./key.json")
    : require("/etc/secrets/key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://el-fairbase-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
const rtdb = admin.database();

export { db, rtdb };
