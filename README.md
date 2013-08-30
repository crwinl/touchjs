touchjs
=======

A library for precisely handling touch events. Adds touchenter and touchleave events to browsers that don't natively support them (most browsers) and provides an intuitive interface for tracking the lifecycle of individual touch events.

This library is useful for creating very precise touch gestures, allowing the programmer to much more easily control the life-cycle of a touch event.

Install
=======



Usage
=====

```
// eventTypes should be a space-separated list of any of the event types: start
    // other eventTypes are reserved for when this can support notify 
	// 	about events that did not start over the original target
// handler will get a touchjs TouchEvent object
touch(button, 'start', function(event) {
    $(this).css({fontSize: 50}) // this is a dom element (like in jquery)

	// you can stop propogation and prevent the default as usual
    event.preventDefault()
    event.stopImmediatePropagation()
    event.stopPropagation()
    console.log("isDefaultPrevented: "+event.isDefaultPrevented()+", isImmediatePropagationStopped: "+event.isImmediatePropagationStopped())

	// See documentation TouchEvent and Touch for backround information on some of these properties: 
		// https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Events/Touch_events
	// event.id contains the id of the touch
    // event.type contains the type of touch event (touchstart, touchmove, touchenter, touchleave, touchend, touchcancel)
    // event.screen = {x: standardTouchObject.screenX, y: standardTouchObject.screenY}
    // event.client = {x: standardTouchObject.clientX, y: standardTouchObject.clientY}
    // event.page = {x: standardTouchObject.pageX, y: standardTouchObject.pageY}

    // event.area = {radius:{x: radiusX, y: radiusY}, rotation: rotationAngle}} // this is a description of the shape of the touch on the device
	// event.force = a number from 0.0 to 1.0 representing the force of the touch

    // event.targetTouches = a list of all the currently active touch events on the device that started on the target element
    // event.allTouches = a list of all the currently active touch events on the device    


    // you can track the specific touch throughout its lifecycle (move leave enter end cancel)
    event.on('leave', function(subevent) {
    	// subevent has the same structure as event above
        
        $(this).css({fontSize: 40})  
		
		// off with one argument unregisters all handlers for that event type for events started on the target element
		event.off('leave')
		
        var handler = function(subevent2) {
			// do something
		}
		event.on('move', handler)                 
        
        // any subevent can register new events on the touch
        event.on('leave', function(subevent3) {
			// off with two arguments unregisters a specific handler
			event.off('move', hander)
		})
	})
})

$('body').on('someOtherEvent', function() {
	// removes all start-event handler
	untouch(button, 'start')	
	
	// removes a specific start-event handler on an element
	untouch(button, 'start', originalHandlerFunction)	
})
```