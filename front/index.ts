import { initHeaderComponent } from "./components/header";
import { initButtonComponent } from "./components/button";
import { state } from "./state";
import "./pages/bienvenido/index";
import "./pages/chatroom/index";
import "./pages/signup/index";
import "./router";

(function () {
  initHeaderComponent();
  initButtonComponent();
})();
