"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var layout_1 = require("@angular/cdk/layout");
var AppComponent = /** @class */ (function () {
    function AppComponent(breakpointObserver) {
        var _this = this;
        this.title = 'CARVIN :: Расшифровка VIN-кода автомобиля';
        breakpointObserver.observe([layout_1.Breakpoints.HandsetLandscape, layout_1.Breakpoints.HandsetPortrait]).subscribe(function (result) {
            if (result.matches) {
                _this.activateHandsetLayout();
            }
        });
    }
    AppComponent.prototype.activateHandsetLayout = function () { };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
