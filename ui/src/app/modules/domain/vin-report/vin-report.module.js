"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VinReportModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var vin_report_routing_module_1 = require("./vin-report-routing.module");
var vin_report_component_1 = require("./vin-report.component");
var VinReportModule = /** @class */ (function () {
    function VinReportModule() {
    }
    VinReportModule = __decorate([
        core_1.NgModule({
            declarations: [vin_report_component_1.VinReportComponent],
            imports: [
                common_1.CommonModule,
                vin_report_routing_module_1.VinReportRoutingModule
            ]
        })
    ], VinReportModule);
    return VinReportModule;
}());
exports.VinReportModule = VinReportModule;
