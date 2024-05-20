"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBase = exports.API_BASE_URL = void 0;
const firebase_1 = require("firebase");
exports.API_BASE_URL = process.env.ENVIRONMENT == "DEV"
    ? "http://localhost:3000"
    : "https://newchat-za33.onrender.com";
firebase_1.default.initializeApp({
    apiKey: "AIzaSyACD-PFhB7oZMNpkDK2JOxc0Rsqwdk_Pc8",
    authDomain: "el-fairbase.firebaseapp.com",
    databaseURL: "https://el-fairbase-default-rtdb.firebaseio.com",
});
exports.dataBase = firebase_1.default.database();
