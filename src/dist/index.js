"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseView = exports.observable = exports.List = exports.If = exports.Route = exports.h = exports.render = void 0;
// jsx rendering
var jsx_1 = require("./jsx");
Object.defineProperty(exports, "render", { enumerable: true, get: function () { return jsx_1.render; } });
Object.defineProperty(exports, "h", { enumerable: true, get: function () { return jsx_1.h; } });
// routing components
var Route_1 = require("./Route");
Object.defineProperty(exports, "Route", { enumerable: true, get: function () { return Route_1.Route; } });
// core components
var If_1 = require("./If");
Object.defineProperty(exports, "If", { enumerable: true, get: function () { return If_1.If; } });
var List_1 = require("./List");
Object.defineProperty(exports, "List", { enumerable: true, get: function () { return List_1.List; } });
// observables
var Observable_1 = require("./Observable");
Object.defineProperty(exports, "observable", { enumerable: true, get: function () { return Observable_1.observable; } });
// all decorators
__exportStar(require("./decorators"), exports);
// base class that contains all of the above
var BaseView_1 = require("./BaseView");
Object.defineProperty(exports, "BaseView", { enumerable: true, get: function () { return BaseView_1.BaseView; } });
//# sourceMappingURL=index.js.map