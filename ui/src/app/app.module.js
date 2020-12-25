"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var vin_results_component_1 = require("./components/vin-results/vin-results.component");
var error_page_component_1 = require("./components/error-page/error-page.component");
var front_page_component_1 = require("./components/front-page/front-page.component");
require("@angular/common/locales/global/ru");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                vin_results_component_1.VinResultsComponent,
                error_page_component_1.ErrorPageComponent,
                front_page_component_1.FrontPageComponent
            ],
            imports: [
                platform_browser_1.BrowserModule.withServerTransition({ appId: 'serverApp' }),
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
            ],
            providers: [{ provide: core_1.LOCALE_ID, useValue: 'ru' }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
