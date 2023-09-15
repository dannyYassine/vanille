"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const BaseView_1 = require("./BaseView");
const decorators_1 = require("./decorators");
const jsx_1 = require("./jsx");
let List = exports.List = class List extends BaseView_1.BaseView {
    props;
    constructor() {
        super({ noShadow: true });
        this.style.display = 'contents';
    }
    setBindings() {
        this.props.$on('value', () => {
            this.update();
        });
    }
    render() {
        const elements = this.props.value.map((item) => {
            return this.props.item(item);
        });
        elements.map((el) => this.appendChild((0, jsx_1.render)(el, document)));
    }
};
exports.List = List = __decorate([
    (0, decorators_1.define)()
], List);
//# sourceMappingURL=List.jsx.map