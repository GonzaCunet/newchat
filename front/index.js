"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const header_1 = require("./components/header");
const button_1 = require("./components/button");
require("./pages/bienvenido/index");
require("./pages/chatroom/index");
require("./pages/signup/index");
require("./router");
(function () {
    (0, header_1.initHeaderComponent)();
    (0, button_1.initButtonComponent)();
})();
