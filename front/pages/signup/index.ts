import { state } from "../../state";
import { Router } from "@vaadin/router";
import { ChatRoompage } from "../chatroom";
import Swal from "sweetalert2";

export class Signup extends HTMLElement {
  connectedCallback() {
    this.render();
    const formularioEl = this.querySelector(".formulario");
    formularioEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const miNombre = e.target["nombreEscrito"].value;
      const miMail = e.target["emailEscrito"].value;
      state.signup(miNombre, miMail).then((data) => {
        if (data.message) {
          Swal.fire({
            icon: "error",
            title: "Este mail ya se encuentra registrado",
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "tu usuario se creó exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
          Router.go("/");
        }
      });
    });
  }
  render() {
    this.innerHTML = `
    <header-el></header-el>
    <h1 class="bienvenido">Confirma tu mail</h1>
    <form class="formulario">
    <label class="label-text">Email</label>
    <input name="emailEscrito" type="text" class="input">
    <label class="label-text">Tu nombre</label>
    <input name="nombreEscrito" type="text" class="input">
    <button-el>registrate</button-el>
    <button-el>inicio</button-el>
    `;
    //
  }
}

customElements.define("signup-page", Signup);
