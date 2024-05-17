"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHeaderComponent = void 0;
function initHeaderComponent() {
    customElements.define("header-el", class extends HTMLElement {
        constructor() {
            super();
            this.render();
        }
        render() {
            const shadow = this.attachShadow({ mode: "open" });
            const header = document.createElement("header");
            const style = document.createElement("style");
            header.className = "header-el";
            style.innerHTML = `      
        
          *{box-sizing: border-box;
            }
             
             .header-el {
              background-color: #FF8282;
              text-align:center;
              width: 100%;
              min-height:60px;
              min-width: 375px
             }

             .header-el h1{
              padding:0;
              margin:0;
             }
             `;
            header.innerHTML = `
             <header>
             <h1>Header</h1>
             </header>`;
            shadow.appendChild(header);
            shadow.appendChild(style);
        }
    });
}
exports.initHeaderComponent = initHeaderComponent;
