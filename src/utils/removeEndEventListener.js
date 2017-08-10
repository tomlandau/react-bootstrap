import detectEvents from './detectEvents';

/**
 * Unsubscribes the specified node from all the supported trasition end and animation end events.
 * 
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
 * @name removeEndEventListener
 * @param {element} node 
 * @param {func} eventListener 
 * @bit
 */
export default function removeEndEventListener(node, eventListener) {
    const endEvents = detectEvents();

    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(endEvent => {
        // We use the raw addEventListener() call because EventListener
        // does not know how to remove event listeners and we really should
        // clean up. Also, these events are not triggered in older browsers
        // so we should be A-OK here.
      node.removeEventListener(endEvent, eventListener, false);
    });
}