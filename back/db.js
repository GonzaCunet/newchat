"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtdb = exports.db = void 0;
const admin = require("firebase-admin");
// import * as serviceAccount from "./key.json";
const serviceAccount = process.env.ENVIRONMENT == "DEV"
    ? require("./key.json")
    : require("/etc/secrets/key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://el-fairbase-default-rtdb.firebaseio.com",
});
const db = admin.firestore();
exports.db = db;
const rtdb = admin.database();
exports.rtdb = rtdb;
