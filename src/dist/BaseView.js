"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseView = void 0;
const decorators_1 = require("./decorators");
const makeId_1 = require("./helpers/makeId");
let BaseView = exports.BaseView = class BaseView extends HTMLElement {
    refs;
    $scopedId;
    constructor(config = {}) {
        super();
        if (!config?.noShadow) {
            this.attachShadow({ mode: 'open' });
        }
        this.$scopedId = (0, makeId_1.makeID)();
        // @ts-ignore
        this.props = {};
        // @ts-ignore
        this.state = {};
        this.refs = new Proxy({}, {
            get: (_, prop) => {
                return this.shadowRoot.querySelector(`[${this.$scopedId}][ref=${prop}]`);
            }
        });
    }
    setBindings() { }
    connectedCallback() {
        // @ts-ignore
        this.buildProps();
        // @ts-ignore
        this.buildState();
        // @ts-ignore
        this.renderTemplate();
        this.setBindings();
    }
    removeAllChildren() {
        const root = this.shadowRoot ? this.shadowRoot : this;
        while (root.firstChild) {
            root.removeChild(root.lastChild);
        }
    }
    update() {
        this.removeAllChildren();
        // @ts-ignore
        this.renderTemplate();
    }
};
exports.BaseView = BaseView = __decorate([
    (0, decorators_1.hasJsxTemplate)(),
    (0, decorators_1.hasObservableProps)(),
    (0, decorators_1.hasObservableState)(),
    (0, decorators_1.hasEmit)()
], BaseView);
//# sourceMappingURL=BaseView.js.map