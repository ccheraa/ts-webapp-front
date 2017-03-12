"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./loader.service"));
__export(require("./user.service"));
__export(require("./dialog.service"));
__export(require("./navigator.service"));
__export(require("./menu.service"));
/// exports
var user_service_1 = require("./user.service");
var dialog_service_1 = require("./dialog.service");
var loader_service_1 = require("./loader.service");
var navigator_service_1 = require("./navigator.service");
var menu_service_1 = require("./menu.service");
/// imports
exports.LIB_SERVICES = [
    user_service_1.UserService,
    dialog_service_1.DialogService,
    loader_service_1.LoaderService,
    navigator_service_1.NavigatorService,
    menu_service_1.MenuService,
];
//# sourceMappingURL=index.js.map