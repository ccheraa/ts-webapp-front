import { trigger, transition, state, style, animate } from '@angular/core';
export var animFade = function (name, duration) {
    if (duration === void 0) { duration = 160; }
    return trigger(name, [
        transition(':enter', [style({ opacity: 0 }), animate(duration + 'ms', style({ opacity: 1 }))]),
        transition(':leave', [style({ opacity: 1 }), animate(duration + 'ms', style({ opacity: 0 }))])
    ]);
};
export var animFadeProperty = function (name, onValue, offValue, duration) {
    if (duration === void 0) { duration = 160; }
    return trigger(name, [
        state(onValue, style({ opacity: 0 })),
        state(offValue, style({ opacity: 1 })),
        transition(onValue + ' => ' + offValue, animate(duration + 'ms')),
        transition(offValue + ' => ' + onValue, animate(duration + 'ms'))
    ]);
};
//# sourceMappingURL=animation.class.js.map