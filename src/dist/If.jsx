"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const BaseView_1 = require("./BaseView");
const decorators_1 = require("./decorators");
let If = exports.If = class If extends BaseView_1.BaseView {
    props;
    setBindings() {
        this.props.$on('value', () => {
            this.update();
        });
    }
    render() {
        if (this.props.value) {
            return ['slot', { ref: 'slot' }];
        }
        return '';
    }
};
exports.If = If = __decorate([
    (0, decorators_1.define)()
], If);
//# sourceMappingURL=If.jsx.map