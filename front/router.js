"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const router = new router_1.Router(document.querySelector(".root"));
router.setRoutes([
    { path: "/", component: "bienvenido-page" },
    { path: "/chatroom", component: "chatroom-page" },
    { path: "/signup", component: "signup-page" },
    { path: "(.*)", redirect: "/" },
]);
