touchjs
=======

A library for precisely handling touch events. Adds touchenter and touchleave events to browsers that don't natively support them (most browsers) and provides an intuitive interface for tracking the lifecycle of individual touch events.

This library is useful for creating very precise touch gestures, allowing the programmer to much more easily control the life-cycle of a touch event.

Install
=======

```
npm install git+https://git@github.com/fresheneesz/touchjs.git
```

Example
=======

```
touch($('.button'), 'start', function(thisEvent) {
   $(this).addClass('touchdown')

   event.preventDefault() // you can stop propogation and prevent the default as usual

    // you can track the specific touch throughout its lifecycle (move leave enter end cancel)
   thisEvent.on('end cancel leave', function() {
       $(this).removeClass('touchdown')
   })
   thisEvent.on('enter', function() {
       $(this).addClass('touchdown')
   })
})

$('body').on('someOtherEvent', function() {
	// removes all start-event handler
	untouch(button, 'start')
})
```



Usage
=====

touch
-----

Binds to a new touch event.

* `touch(<jqueryObject>, <eventTypes>, <handler>)`

where

* `<jqueryElement>` is a jquery object (e.g. `$('.button')`)
* `<eventTypes>` currently can only be 'start'
* `<handler>` is the event handler function. It takes a TouchjsEvent object as an argument

untouch
-------

Unbinds handlers from new touch events.

* `untouch(<jqueryObject>, <eventTypes>)` - unbinds all handlers
* `untouch(`<jqueryObject>, <eventTypes>, <handler>)` - unbinds only the passed specific handler

TouchjsEvent
------------

Properties:

* `event.id` - contains the id of the touch
* `event.type` - contains the type of touch event (touchstart, touchmove, touchenter, touchleave, touchend, touchcancel)
* `event.screen` = `{x: standardTouchObject.screenX, y: standardTouchObject.screenY}` - [See documentation on Touch](https://developer.mozilla.org/en-US/docs/Web/API/Touch)
* `event.client` = `{x: standardTouchObject.clientX, y: standardTouchObject.clientY}` - [See documentation on Touch](https://developer.mozilla.org/en-US/docs/Web/API/Touch)
* `event.page` = `{x: standardTouchObject.pageX, y: standardTouchObject.pageY}` - [See documentation on Touch](https://developer.mozilla.org/en-US/docs/Web/API/Touch)

* `event.area` = `{radius:{x: radiusX, y: radiusY}, rotation: rotationAngle}}` - this is a description of the shape of the touch
* `event.force` - a number from 0.0 to 1.0 representing the force of the touch

* `event.targetTouches` - a list of all the currently active touch events on the device that started on the target element
* `event.allTouches` - a list of all the currently active touch events on the device

Preventing Default and propogation:

* `event.preventDefault()` - [Standard preventDefault method](https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault)
* `event.stopImmediatePropagation()` - [Standard stopImmediatePropagation method](https://developer.mozilla.org/en-US/docs/Web/API/event.stopImmediatePropagation)
* `event.stopPropagation()` - [Standard stopPropagation method](https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation)
* `event.isDefaultPrevented()` - [jQuery isDefaultPrevented method](http://api.jquery.com/event.isDefaultPrevented/)
* `event.isImmediatePropagationStopped()` - [jQuery isImmediatePropagationStopped method](http://api.jquery.com/event.isImmediatePropagationStopped/)

Sub-events:

* `event.on(<eventTypes>, <handler>)`

where

* `<eventTypes>` is a space-separated list of one ore more event types (`move` `end` `enter` `leave` `cancel`)
* `<handler>` are the same as for `touch`

For more background, [see mozilla's documentation on Touch Events](https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Events/Touch_events)

* `event.off(<eventTypes>)` - unbinds all handlers of touch changes for a particular event
* `event.off(<eventTypes>, <handler>)` - unbinds a specific handler for a particular event



Todo
====

* Write unit tests (they'll have to go along with some manual touching to make it work). (That kinda sounded dirty)...
* Add support for non-targeted touches:
    * touchmove - when a touch (even if it didn't start over the element) moves
    * touchenter
    * touchleave
    * touchend
* Use a *real* hashmap to find handlers to unbind instead of doing a brute force loop
    * https://github.com/flesler/hashmap
* add touch.over - if the touch is currently over the element
* Figure out how to get the list of all touches statically (without having a touch event)

How to Contribute!
============

Anything helps:

* Creating issues (aka tickets/bugs/etc). Please feel free to use issues to report bugs, request features, and discuss changes
* Updating the documentation: ie this readme file. Be bold! Help create amazing documentation!
* Submitting pull requests.

How to submit pull requests:

1. Please create an issue and get my input before spending too much time creating a feature. Work with me to ensure your feature or addition is optimal and fits with the purpose of the project.
2. Fork the repository
3. clone your forked repo onto your machine and run `npm install` at its root
4. If you're gonna work on multiple separate things, its best to create a separate branch for each of them
5. edit!
6. Test the library to make sure it still works, and test to make sure your changes did what you wanted
7. Commit and push your changes
8. Submit a pull request: https://help.github.com/articles/creating-a-pull-request

License
=======
Released under the MIT license: http://opensource.org/licenses/MIT