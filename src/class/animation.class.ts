import { trigger, transition, state, style, animate } from '@angular/core';
export const animFade = function(name: string, duration = 160): any {
  return trigger(name, [
    transition(':enter', [style({opacity: 0}), animate(duration + 'ms', style({opacity: 1}))]),
    transition(':leave', [style({opacity: 1}), animate(duration + 'ms', style({opacity: 0}))])
  ]);
};
export const animFadeProperty = function(name: string, onValue: string, offValue: string, duration = 160): any {
  return trigger(name, [
    state(onValue, style({opacity: 0})),
    state(offValue, style({opacity: 1})),
    transition(onValue + ' => ' + offValue, animate(duration + 'ms')),
    transition(offValue + ' => ' + onValue, animate(duration + 'ms'))
  ]);
};
