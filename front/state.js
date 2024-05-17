"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
const rtdb_1 = require("./rtdb");
const lodash_1 = require("lodash");
const rtdb_2 = require("./rtdb");
const state = {
    data: {
        rtdbId: "",
        myName: "",
        myMail: "",
        roomId: "",
        userId: "",
        messages: [],
    },
    listeners: [], // los callbacks
    getState() {
        return this.data;
    },
    setState(newState) {
        this.data = newState;
    },
    subscribe(callback) {
        this.listeners.push(callback);
    },
    pushMensaje(mensaje) {
        const rtdbId = this.data.rtdbId;
        const remitente = this.data.myName;
        fetch(rtdb_2.API_BASE_URL + "/mensajes/" + rtdbId, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ nombre: remitente, mensaje: mensaje }),
        });
    },
    setMensajes(mensajes) {
        const currentState = this.getState();
        const datoguardado = (0, lodash_1.values)(mensajes);
        currentState.messages = datoguardado;
    },
    setName(nombre) {
        const currentState = this.getState();
        currentState.myName = nombre;
        this.setState(currentState);
    },
    setUserId(id) {
        const currentState = this.getState();
        currentState.userId = id;
        this.setState(currentState);
    },
    async joinRoom(roomId, userId) {
        return fetch(rtdb_2.API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId, {
            method: "get",
            headers: { "content-type": "application/json" },
        }).then((res) => {
            return res.json();
        });
    },
    setRoomId(roomId) {
        const currentState = this.getState();
        currentState.roomId = roomId;
        this.setState(currentState);
    },
    async createRoom(userId) {
        return fetch(rtdb_2.API_BASE_URL + "/rooms", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ userId: userId }),
        }).then((res) => {
            return res.json();
        });
    },
    async signup(nombre, mail) {
        return fetch(rtdb_2.API_BASE_URL + "/signup", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ nombre: nombre, email: mail }),
        }).then((res) => {
            return res.json();
        });
    },
    logIn(mail) {
        return fetch(rtdb_2.API_BASE_URL + "/auth", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email: mail }),
        }).then((res) => {
            return res.json();
        });
    },
    async startApp(rtdbId) {
        this.data.rtdbId = rtdbId;
        const apiRespuesta = await fetch(rtdb_2.API_BASE_URL + "/mensajes/" + rtdbId, {
            method: "get",
        });
        const mensajes = await apiRespuesta.json();
        state.setMensajes(mensajes);
        const chatroomsRef = rtdb_1.dataBase.ref("/rooms/" + rtdbId + "/data");
        chatroomsRef.on("value", (snapshot) => {
            const valor = snapshot.val();
            this.setMensajes(valor);
            for (const cb of this.listeners) {
                cb();
            }
        });
    },
};
exports.state = state;
// async startApp() {
//   const apiRespuesta = await fetch(API_BASE_URL + "/chatrooms", {
//     method: "get",
//   });
//   const mensajes = apiRespuesta.json();
//   state.setMensajes(mensajes);
//   const chatroomsRef = dataBase.ref("/chatrooms/chatgeneral");
//   chatroomsRef.on("value", (snapshot) => {
//     const valor = snapshot.val();
//     this.setMensajes(valor);
//     console.log(this.data.messages);
//     for (const cb of this.listeners) {
//       cb();
//     }
//   });
// },
