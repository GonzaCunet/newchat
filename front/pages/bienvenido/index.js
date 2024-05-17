"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
const state_1 = require("../../state");
const router_1 = require("@vaadin/router");
const sweetalert2_1 = require("sweetalert2");
class HomePage extends HTMLElement {
    connectedCallback() {
        this.render();
        const roomIdEl = this.querySelector("#select");
        const divSelectEl = this.querySelector(".select-class");
        roomIdEl?.addEventListener("change", (e) => {
            const valor = e.target.value;
            if (valor == "nuevo") {
                divSelectEl.style.display = "none";
            }
            if (valor == "existente") {
                divSelectEl.style.display = "flex";
            }
            const registrarseEl = this.querySelector("registrar-button");
            registrarseEl?.addEventListener("click", (e) => {
                router_1.Router.go("/signup");
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
        formularioEl?.addEventListener("submit", async (e) => {
            e.preventDefault();
            const myNombre = e.target["nombreEscrito"].value;
            const myMail = e.target["emailEscrito"].value;
            const myRoomId = e.target["roomIdEscrito"].value;
            const selectRoom = e.target["select"].value;
            state_1.state.setName(myNombre);
            state_1.state.logIn(myMail).then((data) => {
                if (data.message == "not found") {
                    router_1.Router.go("/signup");
                }
                else if (selectRoom == "nuevo") {
                    state_1.state.setUserId(data.id);
                    state_1.state.createRoom(state_1.state.data.userId).then((res) => {
                        state_1.state.setRoomId(res.id);
                        state_1.state.joinRoom(res.id, state_1.state.data.userId).then((res) => {
                            state_1.state.startApp(res.rtdbRoomId);
                            router_1.Router.go("/chatroom");
                        });
                    });
                }
                else {
                    state_1.state.setUserId(data.id);
                    state_1.state.setRoomId(myRoomId);
                    state_1.state
                        .joinRoom(myRoomId, data.id)
                        .then((res) => {
                        state_1.state.startApp(res.rtdbRoomId);
                        router_1.Router.go("/chatroom");
                    })
                        .catch((res) => {
                        sweetalert2_1.default.fire({
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
exports.HomePage = HomePage;
customElements.define("bienvenido-page", HomePage);
