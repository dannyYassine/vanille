"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const BaseView_1 = require("./BaseView");
const decorators_1 = require("./decorators");
history.pushState = ((f) => function pushState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
})(history.pushState);
history.replaceState = ((f) => function replaceState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
})(history.replaceState);
window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
});
// @ts-ignore
window.$location = window.location;
let Route = exports.Route = class Route extends BaseView_1.BaseView {
    props = {};
    matchesRoute = false;
    location;
    constructor() {
        super();
        // @ts-ignore
        this.location = window.$location;
    }
    setBindings() {
        window.addEventListener('locationchange', () => {
            this.checkPath();
        });
        this.checkPath();
    }
    checkPath() {
        if (this.location.pathname === this.props.path || this.matchesPattern()) {
            if (!this.matchesRoute) {
                this.matchesRoute = true;
                this.update();
            }
        }
        else if (this.matchesRoute) {
            this.matchesRoute = false;
            this.update();
        }
    }
    matchesPattern() {
        if (!this.props.startWith && !this.props.path) {
            return false;
        }
        const browserPaths = this.location.pathname.split('/').filter((path) => {
            return path !== '';
        });
        let propsPaths = !!this.props.startWith ? this.props.startWith.split('/') : this.props.path.split('/');
        propsPaths = propsPaths.filter((path) => {
            return path !== '';
        });
        if (!!this.props.path && browserPaths.length !== propsPaths.length) {
            return false;
        }
        if (this.props.path) {
            return (propsPaths.filter((path, index) => {
                if (path.startsWith(':'))
                    return true;
                return path === browserPaths[index];
            }).length === browserPaths.length);
        }
        // startWith
        const paths = propsPaths.filter((path) => {
            if (path.startsWith(':'))
                return true;
            return true;
        });
        let index = 0;
        while (index < paths.length) {
            if (paths[index].startsWith(':')) {
                index++;
                continue;
            }
            if (paths[index] !== browserPaths[index]) {
                return false;
            }
            index++;
        }
        return true;
    }
    render() {
        if (!this.matchesRoute) {
            return '';
        }
        return ['slot', { ref: 'slot' }];
    }
};
exports.Route = Route = __decorate([
    (0, decorators_1.define)()
], Route);
//# sourceMappingURL=Route.jsx.map