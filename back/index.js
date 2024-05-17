"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db_1 = require("./db");
// import { v4 as uuidv4 } from "uuid";
const nanoid_1 = require("nanoid");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
const usersCollection = db_1.db.collection("users");
const roomsCollection = db_1.db.collection("rooms");
app.post("/signup/", (req, res) => {
    const email = req.body.email;
    const nombre = req.body.nombre;
    usersCollection
        .where("email", "==", email)
        .get()
        .then((searchResponse) => {
        if (searchResponse.empty) {
            usersCollection
                .add({
                email,
                nombre,
            })
                .then((newUserRef) => {
                res.json({ id: newUserRef.id, new: true });
            });
        }
        else {
            res.status(400).json({
                message: "user already exists",
            });
        }
    });
});
app.post("/auth", (req, res) => {
    const { email } = req.body;
    usersCollection
        .where("email", "==", email)
        .get()
        .then((searchResponse) => {
        if (searchResponse.empty) {
            res.status(404).json({
                message: "not found",
            });
        }
        else {
            res.json({
                id: searchResponse.docs[0].id,
            });
        }
    });
});
app.post("/rooms", (req, res) => {
    const { userId } = req.body;
    usersCollection
        .doc(userId.toString())
        .get()
        .then((doc) => {
        if (doc.exists) {
            const roomsRef = db_1.rtdb.ref("rooms/" + (0, nanoid_1.nanoid)());
            roomsRef
                .set({
                messages: [],
                owner: userId,
            })
                .then(() => {
                const roomLongId = roomsRef.key;
                const roomId = 1000 + Math.floor(Math.random() * 999);
                roomsCollection
                    .doc(roomId.toString())
                    .set({ rtdbRoomId: roomLongId })
                    .then(() => {
                    res.json({
                        id: roomId.toString(),
                    });
                });
            });
        }
        else {
            res.status(401).json({ message: "no existis" });
        }
    });
});
app.get("/rooms/:roomId", (req, res) => {
    const { userId } = req.query;
    const { roomId } = req.params;
    if (!userId) {
        return;
    }
    usersCollection
        .doc(userId.toString())
        .get()
        .then((doc) => {
        if (doc.exists) {
            roomsCollection
                .doc(roomId)
                .get()
                .then((snap) => {
                const data = snap.data();
                res.json(data);
            });
        }
        else {
            res.status(401).json({ message: "no existis" });
        }
    });
});
app.get("/mensajes/:rtdbRoomId", function (req, res) {
    const { rtdbRoomId } = req.params;
    const chatRoomsRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId + "/data");
    chatRoomsRef.get().then((snapshot) => {
        const usersData = [];
        snapshot.forEach((doc) => {
            usersData.push(doc);
        });
        res.json(usersData);
    });
});
app.post("/mensajes/:rtdbRoomId", function (req, res) {
    const { rtdbRoomId } = req.params;
    const chatRoomRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId + "/data/");
    chatRoomRef.push(req.body, function () {
        res.json({ chatRoomRef });
    });
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
