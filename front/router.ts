import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "bienvenido-page" },
  { path: "/chatroom", component: "chatroom-page" },
  { path: "/signup", component: "signup-page" },
  { path: "(.*)", redirect: "/" },
]);
