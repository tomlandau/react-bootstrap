/**
 * Detects which animation and transition end events exist in the browser.
 * Exisiting events are returns as an array.
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This file contains a modified version of:
 * https://github.com/facebook/react/blob/v0.12.0/src/addons/transitions/ReactTransitionEvents.js
 *
 * This source code is licensed under the BSD-style license found here:
 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
 * An additional grant of patent rights can be found here:
 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
 * 
 * @name detectEvents
 * @returns {Array}
 * @bit
 */

/*
 * EVENT_NAME_MAP is used to determine which event fired when a
 * transition/animation ends, based on the style property used to
 * define that event.
 */
const EVENT_NAME_MAP = {
  transitionend: {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'mozTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd'
  },

  animationend: {
    'animation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd',
    'MozAnimation': 'mozAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd'
  }
};

const canUseDOM = !!(
  typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

export default function detectEvents() {
    let endEvents = [];

    if (canUseDOM) {
        let testEl = document.createElement('div');
        let style = testEl.style;

        // On some platforms, in particular some releases of Android 4.x,
        // the un-prefixed "animation" and "transition" properties are defined on the
        // style object but the events that fire will still be prefixed, so we need
        // to check if the un-prefixed events are useable, and if not remove them
        // from the map
        if (!('AnimationEvent' in window)) {
            delete EVENT_NAME_MAP.animationend.animation;
        }

        if (!('TransitionEvent' in window)) {
            delete EVENT_NAME_MAP.transitionend.transition;
        }

        for (let baseEventName in EVENT_NAME_MAP) { // eslint-disable-line guard-for-in
            let baseEvents = EVENT_NAME_MAP[baseEventName];
            for (let styleName in baseEvents) {
                if (styleName in style) {
                    endEvents.push(baseEvents[styleName]);
                    break;
                }
            }
        }
    }

    return endEvents;
}