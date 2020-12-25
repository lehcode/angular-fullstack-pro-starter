"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var admin_routing_module_1 = require("./admin-routing.module");
var admin_component_1 = require("./admin.component");
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            declarations: [admin_component_1.AdminComponent],
            imports: [
                common_1.CommonModule,
                admin_routing_module_1.AdminRoutingModule
            ]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
