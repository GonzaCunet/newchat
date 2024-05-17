"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoompage = void 0;
const state_1 = require("../../state");
class ChatRoompage extends HTMLElement {
    connectedCallback() {
        this.render();
        state_1.state.subscribe(() => {
            this.render();
        });
    }
    render() {
        const mensajes = state_1.state.data.messages;
        this.innerHTML = `<div>
  <header-el></header-el>
    <div class="container-chatroom">
      <h1>Chat</h1>
      <h1>Room ID:${state_1.state.data.roomId}</h1>
      <div class="chatroom-box">
      ${mensajes
            .map((mensajes) => {
            const nombre = state_1.state.data.myName;
            let remitente;
            if (nombre == mensajes.nombre) {
                remitente = "propio";
                return `<div class=" ${remitente}"><p class=" text-format "> ${mensajes.mensaje}</p></div>`;
            }
            else {
                remitente = "otrapersona";
                return `<div class=" ${remitente}"><p class="text-format1">${mensajes.nombre}</p><p class=" text-format "> ${mensajes.mensaje}</p></div>`;
            }
        })
            .join(" ")}
    </div>
      
      <form class="formulario-chatroom">
      <input id="mensajeEscrito" "type="text" class="input-chatroom">
      <button-el class="enviar-button">Enviar</button-el>
      </form>
    </div>
    
    </div>`;
        const formularioEl = this.querySelector(".formulario-chatroom");
        formularioEl?.addEventListener("submit", async (e) => {
            e.preventDefault();
            const mensaje = e.target["mensajeEscrito"].value;
            state_1.state.pushMensaje(mensaje);
        });
    }
}
exports.ChatRoompage = ChatRoompage;
customElements.define("chatroom-page", ChatRoompage);
