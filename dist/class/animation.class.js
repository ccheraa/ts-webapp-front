"use strict";
var core_1 = require("@angular/core");
exports.animFade = function (name, duration) {
    if (duration === void 0) { duration = 160; }
    return core_1.trigger(name, [
        core_1.transition(':enter', [core_1.style({ opacity: 0 }), core_1.animate(duration + 'ms', core_1.style({ opacity: 1 }))]),
        core_1.transition(':leave', [core_1.style({ opacity: 1 }), core_1.animate(duration + 'ms', core_1.style({ opacity: 0 }))])
    ]);
};
exports.animFadeProperty = function (name, onValue, offValue, duration) {
    if (duration === void 0) { duration = 160; }
    return core_1.trigger(name, [
        core_1.state(onValue, core_1.style({ opacity: 0 })),
        core_1.state(offValue, core_1.style({ opacity: 1 })),
        core_1.transition(onValue + ' => ' + offValue, core_1.animate(duration + 'ms')),
        core_1.transition(offValue + ' => ' + onValue, core_1.animate(duration + 'ms'))
    ]);
};
//# sourceMappingURL=animation.class.js.map