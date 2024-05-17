import { state } from "../../state";

export class ChatRoompage extends HTMLElement {
  connectedCallback() {
    this.render();
    state.subscribe(() => {
      this.render();
    });
  }
  render() {
    const mensajes = state.data.messages;
    this.innerHTML = `<div>
  <header-el></header-el>
    <div class="container-chatroom">
      <h1>Chat</h1>
      <h1>Room ID:${state.data.roomId}</h1>
      <div class="chatroom-box">
      ${mensajes
        .map((mensajes) => {
          const nombre = state.data.myName;
          let remitente;
          if (nombre == mensajes.nombre) {
            remitente = "propio";
            return `<div class=" ${remitente}"><p class=" text-format "> ${mensajes.mensaje}</p></div>`;
          } else {
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
      state.pushMensaje(mensaje);
    });
  }
}

customElements.define("chatroom-page", ChatRoompage);
