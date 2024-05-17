import { dataBase } from "./rtdb";
import { values } from "lodash";
import { API_BASE_URL } from "./rtdb";

type Messages = { mensaje: string; nombre: string };

const state = {
  data: {
    rtdbId: "",
    myName: "",
    myMail: "",
    roomId: "",
    userId: "",
    messages: [] as Messages[],
  },
  listeners: [], // los callbacks

  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },

  pushMensaje(mensaje) {
    const rtdbId = this.data.rtdbId;
    const remitente = this.data.myName;
    fetch(API_BASE_URL + "/mensajes/" + rtdbId, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ nombre: remitente, mensaje: mensaje }),
    });
  },
  setMensajes(mensajes) {
    const currentState = this.getState();
    const datoguardado = values(mensajes);
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
    return fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId, {
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
    return fetch(API_BASE_URL + "/rooms", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId: userId }),
    }).then((res) => {
      return res.json();
    });
  },

  async signup(nombre, mail) {
    return fetch(API_BASE_URL + "/signup", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ nombre: nombre, email: mail }),
    }).then((res) => {
      return res.json();
    });
  },

  logIn(mail) {
    return fetch(API_BASE_URL + "/auth", {
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
    const apiRespuesta = await fetch(API_BASE_URL + "/mensajes/" + rtdbId, {
      method: "get",
    });
    const mensajes = await apiRespuesta.json();
    state.setMensajes(mensajes);

    const chatroomsRef = dataBase.ref("/rooms/" + rtdbId + "/data");
    chatroomsRef.on("value", (snapshot) => {
      const valor = snapshot.val();
      this.setMensajes(valor);

      for (const cb of this.listeners) {
        cb();
      }
    });
  },
};

export { state };

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
