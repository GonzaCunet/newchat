import firebase from "firebase";

export const API_BASE_URL =
  process.env.ENVIRONMENT == "DEV"
    ? "https://localhost:3000"
    : "https://newchat-za33.onrender.com";

export const dataBase = firebase.database();
