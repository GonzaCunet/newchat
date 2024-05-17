import { state } from "../../state";
import { Router } from "@vaadin/router";
import { ChatRoompage } from "../chatroom";
import Swal from "sweetalert2";

export class HomePage extends HTMLElement {
  connectedCallback() {
    this.render();
    const roomIdEl = this.querySelector("#select") as HTMLElement;
    const divSelectEl = this.querySelector(".select-class") as HTMLElement;
    roomIdEl?.addEventListener("change", (e: any) => {
      const valor = e.target.value as any;
      if (valor == "nuevo") {
        divSelectEl.style.display = "none";
      }
      if (valor == "existente") {
        divSelectEl.style.display = "flex";
      }

      const registrarseEl = this.querySelector("registrar-button");
      registrarseEl?.addEventListener("click", (e) => {
        Router.go("/signup");
      });
    });
  }
  render() {
    this.innerHTML = `<div class="home-container">
    <header-el></header-el>
    <h1 class="bienvenido">Bienvenido</h1>
    <form class="formulario">
    <label class="label-text">Email</label>
    <input name="emailEscrito" type="text" class="input">
    <label class="label-text">Tu nombre</label>
    <input name="nombreEscrito" type="text" class="input">
    <label class="label-text">Room:</label>
      <select id="select" class="input" name="select">
        <option value="nuevo">Nuevo Room</option>
        <option value="existente">Room Existente</option>
      </select>
      <div class="select-class">
      <label class="label-text">Room Id</label>
      <input name="roomIdEscrito" type="text" class="input" placeholder="Ingresa el Room Id">
      </div>
    <button-el class="comenzar-button">Comenzar</button-el>
    <button-el class="registrar-button">Registrarse</button-el>
    </form></div>`;

    const formularioEl = this.querySelector(".formulario");
    formularioEl?.addEventListener("submit", async (e: any) => {
      e.preventDefault();
      const myNombre = e.target["nombreEscrito"].value;
      const myMail = e.target["emailEscrito"].value;
      const myRoomId = e.target["roomIdEscrito"].value;
      const selectRoom = e.target["select"].value;

      state.setName(myNombre);
      state.logIn(myMail).then((data) => {
        if (data.message == "not found") {
          Router.go("/signup");
        } else if (selectRoom == "nuevo") {
          state.setUserId(data.id);
          state.createRoom(state.data.userId).then((res) => {
            state.setRoomId(res.id);
            state.joinRoom(res.id, state.data.userId).then((res) => {
              state.startApp(res.rtdbRoomId);
              Router.go("/chatroom");
            });
          });
        } else {
          state.setUserId(data.id);
          state.setRoomId(myRoomId);
          state
            .joinRoom(myRoomId, data.id)
            .then((res) => {
              state.startApp(res.rtdbRoomId);
              Router.go("/chatroom");
            })
            .catch((res) => {
              Swal.fire({
                icon: "error",
                title: "Este room no existe",
                confirmButtonColor: "#9CBBE9",
              });
            });
        }
      });
    });
  }
}
customElements.define("bienvenido-page", HomePage);
