"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const jsx_1 = require("./jsx");
const random_1 = require("./helpers/random");
const signals_1 = require("./signals");
const Vanille_1 = __importDefault(require("./Vanille"));
const ViewMode_1 = require("./ViewMode");
class View extends HTMLElement {
    props;
    styleTag;
    refs;
    $c;
    $scopedId;
    constructor(viewMode = ViewMode_1.ViewMode.OPEN) {
        super();
        this.props = {};
        this.$c = [];
        if ([ViewMode_1.ViewMode.OPEN, ViewMode_1.ViewMode.CLOSED].includes(viewMode)) {
            this.attachShadow({ mode: viewMode });
        }
        this.refs = new Proxy({}, {
            get: (_, prop) => {
                return this.root.querySelector(`[${this.$scopedId}][ref=${prop}]`);
            },
        });
    }
    get root() {
        return this.shadowRoot ? this.shadowRoot : this;
    }
    styles() {
        return '';
    }
    def() {
        const define = (accum, key) => {
            const val = this[key];
            if (typeof val === 'function') {
                accum[key] = val.bind(this);
            }
            else {
                accum[key] = val;
            }
            return accum;
        };
        const accum = Object.getOwnPropertyNames(this).reduce(define, {});
        return Object.getOwnPropertyNames(this.__proto__).reduce(define, accum);
    }
    connectedCallback() {
        this.updateRender();
        this.connected();
    }
    disconnectedCallback() {
        this.disconnected();
    }
    adoptedCallback() {
        this.adopted();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.attributeChanged(name, oldValue, newValue);
    }
    connected() { }
    disconnected() { }
    adopted() { }
    attributeChanged(name, oldValue, newValue) { }
    createStyleTag() {
        const styleTagContent = `${this.styles()} ${Vanille_1.default.getStyles()}`;
        if (!styleTagContent) {
            return;
        }
        this.styleTag = document.createElement('style');
        (0, signals_1.effect)(() => {
            this.updateStyles();
        });
        this.root.appendChild(this.styleTag);
    }
    updateStyles() {
        const styleTagContent = `${this.styles()} ${Vanille_1.default.getStyles()}`;
        const styles = styleTagContent
            .trim()
            .replaceAll(/(\S+)(h*.*\{)/gm, `$1[${this.$scopedId}]$2 `);
        this.styleTag.textContent = styles;
    }
    updateRender() {
        // temp, optimize
        this.root.innerHTML = '';
        const node = this.render?.(this.props);
        if (node) {
            this.createStyleTag();
            // for root only
            if (!this.$scopedId) {
                this.$scopedId = `v${(0, random_1.generateRandomString)(8)}`;
                this.setAttribute(this.$scopedId, '');
            }
            node.$scopedId = this.$scopedId;
            const content = (0, jsx_1.render)(node);
            this.root.appendChild(content);
        }
    }
    emit(name, data) {
        setTimeout(() => {
            let options = { bubbles: true };
            if (data) {
                options = { ...options };
                if (typeof data === 'object') {
                    options.detail = { ...data };
                }
                else {
                    options.detail = data;
                }
            }
            this.dispatchEvent(new CustomEvent(name, options));
        }, 0);
    }
}
exports.View = View;
customElements.define('v-view', View);
//# sourceMappingURL=View.js.map