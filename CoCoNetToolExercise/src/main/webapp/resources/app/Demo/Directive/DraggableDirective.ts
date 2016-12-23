/// <reference path='../../_all.ts' />

module Demo {
    export class NgDraggableClass {
        public touchTimeout: number = 100;
        public inputEvent = function (event) {
            if (angular.isDefined(event.touches)) {
                return event.touches[0];
            }
            //Checking both is not redundent. If only check if touches isDefined, angularjs isDefnied will return error and stop the remaining scripty if event.originalEvent is not defined.
            else if (angular.isDefined(event.originalEvent) && angular.isDefined(event.originalEvent.touches)) {
                return event.originalEvent.touches[0];
            }
            return event;
        };
    }

    export class NgDragDirective implements ng.IDirective {
        'use strict';

        public link;
        restrict = "A";

        constructor(private $parse: ng.IParseService, private $document: ng.IDocumentService, private $window: ng.IWindowService, private $rootScope: ng.IRootScopeService) {
            this.link = this.unboundLink.bind(this, $parse, $document, $rootScope, $window);
        }

        public unboundLink($parse: ng.IParseService, $document: ng.IDocumentService, $rootScope: ng.IRootScopeService, $window: ng.IWindowService, scope: any, element: any, attrs: any) {
            scope.value = attrs.ngDrag;
            var offset, _centerAnchor = false, _mx, _my, _tx, _ty, _mrx, _mry;
            var _hasTouch = ('ontouchstart' in window);
            var _pressEvents = 'touchstart mousedown';
            var _moveEvents = 'touchmove mousemove';
            var _releaseEvents = 'touchend mouseup';
            var _dragHandle;
            var _myid = scope.$id;
            var _data = null;
            var _dragOffset = null;
            var _dragEnabled = false;
            var _pressTimer = null;

            var onDragStartCallback = $parse(attrs.ngDragStart) || null;
            var onDragStopCallback = $parse(attrs.ngDragStop) || null;
            var onDragSuccessCallback = $parse(attrs.ngDragSuccess) || null;
            var allowTransform = angular.isDefined(attrs.allowTransform) ? scope.$eval(attrs.allowTransform) : true;
            var getDragData = $parse(attrs.ngDragData.replace("#", ""));
            var _deregisterRootMoveListener = angular.noop;

            var initialize = function () {
                element.attr('draggable', 'false');

                if (element[0].querySelectorAll) {
                    var dragHandles = angular.element(element[0].querySelectorAll('[ng-drag-handle]'));
                }
                else {
                    var dragHandles1 = element.find('[ng-drag-handle]');
                }

                if (dragHandles.length) {
                    _dragHandle = dragHandles;
                }

                toggleListeners(true);
            };

            var toggleListeners = function (enable) {
                if (!enable)
                    return;

                scope.$on('$destroy', onDestroy);
                scope.$watch(attrs.ngDrag, onEnableChange);
                scope.$watch(attrs.ngCenterAnchor, onCenterAnchor);

                if (_dragHandle) {
                    _dragHandle.on(_pressEvents, onpress);
                }
                else {
                    element.on(_pressEvents, onpress);
                }

                if (element[0].nodeName.toLowerCase() == "img") {
                    element.on('mousedown', function () { return false; });
                }
            };

            var isClickableElement = function (evt) {
                return (angular.isDefined(angular.element(evt.target).attr("ng-cancel-drag")));
            };

            var onDestroy = function (enable) {
                toggleListeners(false);
            };

            var onEnableChange = function (newVal, oldVal) {
                _dragEnabled = (newVal);
            };

            var onCenterAnchor = function (newVal, oldVal) {
                if (angular.isDefined(newVal))
                    _centerAnchor = (newVal || 'true');
            };

            var isClickableElement = function (evt) {
                return (angular.isDefined(angular.element(evt.target).attr("ng-cancel-drag")));
            };

            var onpress = function (evt) {
                if (!_dragEnabled)
                    return;

                if (isClickableElement(evt)) {
                    return;
                }

                if (evt.target.nodeName == "A") {
                    return;
                }

                if (evt.type == "mousedown" && evt.button != 0) {
                    return;
                }

                var useTouch = evt.type === 'touchstart' ? true : false;

                if (useTouch) {
                    cancelPress();
                    _pressTimer = setTimeout(function () {
                        cancelPress();
                        onlongpress(evt);
                    }, new NgDraggableClass().touchTimeout);

                    $document.on(_moveEvents, cancelPress);
                    $document.on(_releaseEvents, cancelPress);

                }
                else {
                    onlongpress(evt);
                }
            };

            var cancelPress = function () {
                clearTimeout(_pressTimer);
                $document.off(_moveEvents, cancelPress);
                $document.off(_releaseEvents, cancelPress);
            };

            var onlongpress = function (evt) {
                if (!_dragEnabled)
                    return;

                evt.preventDefault();

                offset = element[0].getBoundingClientRect();

                if (allowTransform)
                    _dragOffset = offset;
                else {
                    _dragOffset = { left: document.body.scrollLeft, top: document.body.scrollTop };
                }

                element.centerX = element[0].offsetWidth / 2;
                element.centerY = element[0].offsetHeight / 2;

                _mx = new NgDraggableClass().inputEvent(evt).pageX;
                _my = new NgDraggableClass().inputEvent(evt).pageY;

                _mrx = _mx - offset.left;
                _mry = _my - offset.top;

                if (_centerAnchor) {
                    _tx = _mx - element.centerX - $window.pageXOffset;
                    _ty = _my - element.centerY - $window.pageYOffset;
                }
                else {
                    _tx = _mx - _mrx - $window.pageXOffset;
                    _ty = _my - _mry - $window.pageYOffset;
                }

                $document.on(_moveEvents, onmove);
                $document.on(_releaseEvents, onrelease);

                _deregisterRootMoveListener = $rootScope.$on('draggable:_triggerHandlerMove', function (event, origEvent) {
                    onmove(origEvent);
                });
            };

            var onmove = function (evt) {
                if (!_dragEnabled)
                    return;

                evt.preventDefault();

                if (!element.hasClass('dragging')) {
                    _data = getDragData(scope);
                    element.addClass('dragging');
                    $rootScope.$broadcast('draggable:start', { x: _mx, y: _my, tx: _tx, ty: _ty, event: evt, element: element, data: _data });

                    if (onDragStartCallback) {
                        scope.$apply(function () {
                            onDragStartCallback(scope, { $data: _data, $event: evt });
                        });
                    }
                }

                _mx = new NgDraggableClass().inputEvent(evt).pageX;
                _my = new NgDraggableClass().inputEvent(evt).pageY;

                if (_centerAnchor) {
                    _tx = _mx - element.centerX - _dragOffset.left;
                    _ty = _my - element.centerY - _dragOffset.top;
                }
                else {
                    _tx = _mx - _mrx - _dragOffset.left;
                    _ty = _my - _mry - _dragOffset.top;
                }

                moveElement(_tx, _ty);
                $rootScope.$broadcast('draggable:move', { x: _mx, y: _my, tx: _tx, ty: _ty, event: evt, element: element, data: _data, uid: _myid, dragOffset: _dragOffset });
            };

            var onrelease = function (evt) {
                if (!_dragEnabled)
                    return;

                evt.preventDefault();
                $rootScope.$broadcast('draggable:end', { x: _mx, y: _my, tx: _tx, ty: _ty, event: evt, element: element, data: _data, callback: onDragComplete, uid: _myid });
                element.removeClass('dragging');
                element.parent().find('.drag-enter').removeClass('drag-enter');
                reset();

                $document.off(_moveEvents, onmove);
                $document.off(_releaseEvents, onrelease);

                if (onDragStopCallback) {
                    scope.$apply(function () {
                        onDragStopCallback(scope, { $data: _data, $event: evt });
                    });
                }

                _deregisterRootMoveListener();
            };

            var onDragComplete = function (evt) {
                if (!onDragSuccessCallback)
                    return;

                scope.$apply(function () {
                    onDragSuccessCallback(scope, { $data: _data, $event: evt });
                });
            };

            var reset = function () {
                if (allowTransform)
                    element.css({ transform: '', 'z-index': '', '-webkit-transform': '', '-ms-transform': '' });
                else
                    element.css({ 'position': '', top: '', left: '' });
            };

            var moveElement = function (x, y) {
                if (allowTransform) {
                    element.css({
                        transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)',
                        'z-index': 99999,
                        '-webkit-transform': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)',
                        '-ms-transform': 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')'
                    });
                }
                else {
                    element.css({ 'left': x + 'px', 'top': y + 'px', 'position': 'fixed' });
                }
            };

            initialize();
        }

        static factory(): ng.IDirectiveFactory {
            var directive = ($parse: ng.IParseService, $document: ng.IDocumentService, $window: ng.IWindowService, $rootScope: ng.IRootScopeService) =>
                new NgDragDirective($parse, $document, $window, $rootScope);
            directive.$inject = ['$parse', '$document', '$window', '$rootScope'];
            return directive;
        }
        
        angular.module("Demo").directive('ngDrag', NgDragDirective.Factory());
    }

    export class NgDropDirective implements ng.IDirective {
        'use strict';

        public link;
        restrict = "A";

        unboundLink($parse: ng.IParseService, $document: ng.IDocumentService, $timeout: ng.ITimeoutService, scope: any, element: any, attrs: any) {
            scope.value = attrs.ngDrop;
            scope.isTouching = false;

            var _lastDropTouch = null;
            var _myid = scope.$id;
            var _dropEnabled = false;

            var onDropCallback = $parse(attrs.ngDropSuccess);
            var onDragStartCallback = $parse(attrs.ngDragStart);
            var onDragStopCallback = $parse(attrs.ngDragStop);
            var onDragMoveCallback = $parse(attrs.ngDragMove);

            var initialize = function () {
                toggleListeners(true);
            };

            var toggleListeners = function (enable) {
                if (!enable)
                    return;

                scope.$watch(attrs.ngDrop, onEnableChange);
                scope.$on('$destroy', onDestroy);
                scope.$on('draggable:start', onDragStart);
                scope.$on('draggable:move', onDragMove);
                scope.$on('draggable:end', onDragEnd);
            };

            var onDestroy = function (enable) {
                toggleListeners(false);
            };

            var onEnableChange = function (newVal, oldVal) {
                _dropEnabled = newVal;
            };

            var onDragStart = function (evt, obj) {
                if (!_dropEnabled) return;
                isTouching(obj.x, obj.y, obj.element);

                if (attrs.ngDragStart) {
                    $timeout(function () {
                        onDragStartCallback(scope, { $data: obj.data, $event: obj });
                    });
                }
            };

            var onDragMove = function (evt, obj) {
                if (!_dropEnabled) return;
                isTouching(obj.x, obj.y, obj.element);

                if (attrs.ngDragMove) {
                    $timeout(function () {
                        onDragMoveCallback(scope, { $data: obj.data, $event: obj });
                    });
                }
            };

            var onDragEnd = function (evt, obj) {                
                if (!_dropEnabled || _myid === obj.uid) {
                    updateDragStyles(false, obj.element);
                    return;
                }

                if (isTouching(obj.x, obj.y, obj.element)) {
                    if (obj.callback) {
                        obj.callback(obj);
                    }

                    if (attrs.ngDropSuccess) {
                        $timeout(function () {
                            onDropCallback(scope, { $data: obj.data, $event: obj, $target: scope.$eval(scope.value) });
                        });
                    }
                }

                if (attrs.ngDragStop) {
                    $timeout(function () {
                        onDragStopCallback(scope, { $data: obj.data, $event: obj });
                    });
                }

                updateDragStyles(false, obj.element);
            };

            var isTouching = function (mouseX, mouseY, dragElement) {

                var touching = hitTest(mouseX, mouseY);
                scope.isTouching = touching;
                if (touching) {
                    _lastDropTouch = element;
                }
                updateDragStyles(touching, dragElement);
                return touching;

            };

            var updateDragStyles = function (touching, dragElement) {

                if (touching) {
                    element.addClass('drag-enter');
                    dragElement.addClass('drag-over');
                } else if (_lastDropTouch == element) {
                    _lastDropTouch = null;
                    element.removeClass('drag-enter');
                    dragElement.removeClass('drag-over');
                }

            };

            var hitTest = function (x, y) {

                var bounds = element[0].getBoundingClientRect();
                x -= $document[0].body.scrollLeft + $document[0].documentElement.scrollLeft;
                y -= $document[0].body.scrollTop + $document[0].documentElement.scrollTop;
                return x >= bounds.left
                    && x <= bounds.right
                    && y <= bounds.bottom
                    && y >= bounds.top;
            };

            initialize();
        }

        constructor(private $parse: ng.IParseService, private $document: ng.IDocumentService, private $window: ng.IWindowService, private $rootScope: ng.IRootScopeService, private $timeout: ng.ITimeoutService) {
            this.link = this.unboundLink.bind(this, $parse, $document, $timeout);
        }

        static factory(): ng.IDirectiveFactory {
            var directive = ($parse: ng.IParseService, $document: ng.IDocumentService, $window: ng.IWindowService, $rootScope: ng.IRootScopeService, $timeout: ng.ITimeoutService) => new NgDropDirective($parse, $document, $window, $rootScope, $timeout);
            return directive;
        }
        
        angular.module("Demo").directive('ngDrop', NgDropDirective.Factory());
    }

    export class NgDragCloneDirective implements ng.IDirective {
        'use strict';

        public link;
        restrict = "A";

        unboundLink($parse: ng.IParseService, $document: ng.IDocumentService, $timeout: ng.ITimeoutService, scope: any, element: any, attrs: any) {
            var img, _allowClone = true;
            var _tx, _ty;
            var _dragOffset = null;
            scope.clonedData = {};
            var initialize = function () {

                img = element.find('img');
                element.attr('draggable', 'false');
                img.attr('draggable', 'false');
                reset();
                toggleListeners(true);
            };

            var toggleListeners = function (enable) {
                if (!enable)
                    return;

                scope.$on('draggable:start', onDragStart);
                scope.$on('draggable:move', onDragMove);
                scope.$on('draggable:end', onDragEnd);
                preventContextMenu();

            };
            var preventContextMenu = function () {
                img.off('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
                img.on('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
            };
            var onDragStart = function (evt, obj, elm) {
                _allowClone = true;
                if (angular.isDefined(obj.data.allowClone)) {
                    _allowClone = obj.data.allowClone;
                }
                if (_allowClone) {
                    scope.$apply(function () {
                        scope.clonedData = obj.data;
                    });
                    element.css('width', obj.element[0].offsetWidth);
                    element.css('height', obj.element[0].offsetHeight);

                    moveElement(obj.tx, obj.ty);
                }

            };
            var onDragMove = function (evt, obj) {
                if (_allowClone) {

                    _tx = obj.tx + obj.dragOffset.left;
                    _ty = obj.ty + obj.dragOffset.top;

                    moveElement(_tx, _ty);
                }
            };
            var onDragEnd = function (evt, obj) {
                if (_allowClone) {
                    reset();
                }
            };

            var reset = function () {
                element.css({ left: 0, top: 0, position: 'fixed', 'z-index': -1, visibility: 'hidden' });
            };
            var moveElement = function (x, y) {
                element.css({
                    transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)', 'z-index': 99999, 'visibility': 'visible',
                    '-webkit-transform': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)',
                    '-ms-transform': 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')'
                });
            };

            var absorbEvent_ = function (event) {
                var e = event;
                e.preventDefault && e.preventDefault();
                e.stopPropagation && e.stopPropagation();
                e.cancelBubble = true;
                e.returnValue = false;
                return false;
            };

            initialize();
        }

        constructor(private $parse: ng.IParseService, private $document: ng.IDocumentService, private $window: ng.IWindowService, private $rootScope: ng.IRootScopeService, private $timeout: ng.ITimeoutService) {
            this.link = this.unboundLink.bind(this, $parse, $document, $timeout);
        }

        static factory(): ng.IDirectiveFactory {
            var directive = ($parse: ng.IParseService, $document: ng.IDocumentService, $window: ng.IWindowService, $rootScope: ng.IRootScopeService, $timeout: ng.ITimeoutService) =>
                new NgDragCloneDirective($parse, $document, $window, $rootScope, $timeout);
            return directive;
        }
        
        angular.module("Demo").directive('ngDragClone', NgDragCloneDirective.Factory());
    }

    export class NgPreventDragDirective implements ng.IDirective {
        'use strict';

        public link;
        restrict = "A";

        unboundLink($parse: ng.IParseService, $timeout: ng.ITimeoutService, scope: any, element: any, attrs: any) {

            var initialize = function () {
                element.attr('draggable', 'false');
                toggleListeners(true);
            };


            var toggleListeners = function (enable) {
                if (!enable)
                    return;
                
                element.on('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
            };
            
            var absorbEvent_ = function (event) {
                var e = event.originalEvent;
                e.preventDefault && e.preventDefault();
                e.stopPropagation && e.stopPropagation();
                e.cancelBubble = true;
                e.returnValue = false;
                return false;
            };

            initialize();
        }

        constructor(private $parse: ng.IParseService, private $timeout: ng.ITimeoutService) {
            this.link = this.unboundLink.bind(this, $parse, $timeout);
        }

        static factory(): ng.IDirectiveFactory {
            var directive = ($parse: ng.IParseService, $timeout: ng.ITimeoutService) =>
                new NgPreventDragDirective($parse, $timeout);
            return directive;
        }
        
        angular.module("Demo").directive('ngPreventDrag', NgPreventDragDirective.Factory());
    }

    export class NgCancelDragDirective implements ng.IDirective {
        'use strict';

        public link;
        restrict = "A";

        unboundLink(scope: any, element: any, attrs: any) {
            element.find('*').attr('ng-cancel-drag', 'ng-cancel-drag');
        }

        constructor() {
            this.link = this.unboundLink.bind(this);
        }

        static factory(): ng.IDirectiveFactory {
            var directive = () =>
                new NgCancelDragDirective();
            return directive;
        }
        
        angular.module("Demo").directive('ngCancelDrag', NgCancelDragDirective.Factory());
    }

    export class NgDragScrollDirective implements ng.IDirective {
        'use strict';

        public link;
        restrict = "A";

        unboundLink($parse: ng.IParseService, $document: ng.IDocumentService, $window: ng.IWindowService, $timeout: ng.ITimeoutService, $rootScope: ng.IRootScopeService, scope: any, element: any, attrs: any) {
            var intervalPromise = null;
            var lastMouseEvent = null;

            var config = {
                verticalScroll: attrs.verticalScroll || true,
                horizontalScroll: attrs.horizontalScroll || true,
                activationDistance: attrs.activationDistance || 75,
                scrollDistance: attrs.scrollDistance || 15
            };

            var reqAnimFrame = (function () {
                return window.requestAnimationFrame || window.msRequestAnimationFrame || function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();

            var animationIsOn = false;
            var createInterval = function () {
                animationIsOn = true;

                function nextFrame(callback) {
                    var args = Array.prototype.slice.call(arguments);
                    if (animationIsOn) {
                        //reqAnimFrame(function () {
                        //    $rootScope.$apply(function () {
                        //        callback.apply(null, args);
                        //        nextFrame(callback);
                        //    });
                        //});
                    }
                }

                nextFrame(function () {
                    if (!lastMouseEvent) return;

                    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                    var scrollX = 0;
                    var scrollY = 0;

                    if (config.horizontalScroll) {
                        // If horizontal scrolling is active.
                        if (lastMouseEvent.clientX < config.activationDistance) {
                            // If the mouse is on the left of the viewport within the activation distance.
                            scrollX = -config.scrollDistance;
                        }
                        else if (lastMouseEvent.clientX > viewportWidth - config.activationDistance) {
                            // If the mouse is on the right of the viewport within the activation distance.
                            scrollX = config.scrollDistance;
                        }
                    }

                    if (config.verticalScroll) {
                        // If vertical scrolling is active.
                        if (lastMouseEvent.clientY < config.activationDistance) {
                            // If the mouse is on the top of the viewport within the activation distance.
                            scrollY = -config.scrollDistance;
                        }
                        else if (lastMouseEvent.clientY > viewportHeight - config.activationDistance) {
                            // If the mouse is on the bottom of the viewport within the activation distance.
                            scrollY = config.scrollDistance;
                        }
                    }



                    if (scrollX !== 0 || scrollY !== 0) {
                        // Record the current scroll position.
                        var currentScrollLeft = ($window.pageXOffset || $document[0].documentElement.scrollLeft);
                        var currentScrollTop = ($window.pageYOffset || $document[0].documentElement.scrollTop);

                        // Remove the transformation from the element, scroll the window by the scroll distance
                        // record how far we scrolled, then reapply the element transformation.
                        var elementTransform = element.css('transform');
                        element.css('transform', 'initial');

                        $window.scrollBy(scrollX, scrollY);

                        var horizontalScrollAmount = ($window.pageXOffset || $document[0].documentElement.scrollLeft) - currentScrollLeft;
                        var verticalScrollAmount = ($window.pageYOffset || $document[0].documentElement.scrollTop) - currentScrollTop;

                        element.css('transform', elementTransform);

                        lastMouseEvent.pageX += horizontalScrollAmount;
                        lastMouseEvent.pageY += verticalScrollAmount;

                        $rootScope.$emit('draggable:_triggerHandlerMove', lastMouseEvent);
                    }

                });
            };

            var clearInterval = function () {
                animationIsOn = false;
            };

            scope.$on('draggable:start', function (event, obj) {
                // Ignore this event if it's not for this element.
                if (obj.element[0] !== element[0]) return;

                if (!animationIsOn) createInterval();
            });

            scope.$on('draggable:end', function (event, obj) {
                // Ignore this event if it's not for this element.
                if (obj.element[0] !== element[0]) return;

                if (animationIsOn) clearInterval();
            });

            scope.$on('draggable:move', function (event, obj) {
                // Ignore this event if it's not for this element.
                if (obj.element[0] !== element[0]) return;

                lastMouseEvent = obj.event;
            });
        }

        constructor(private $parse: ng.IParseService, private $document: ng.IDocumentService, private $window: ng.IWindowService, private $rootScope: ng.IRootScopeService, private $timeout: ng.ITimeoutService) {
            this.link = this.unboundLink.bind(this, $parse, $document, $window, $timeout, $rootScope);
        }

        static factory(): ng.IDirectiveFactory {
            var directive = ($parse: ng.IParseService, $document: ng.IDocumentService, $window: ng.IWindowService, $rootScope: ng.IRootScopeService, $timeout: ng.ITimeoutService) =>
                new NgDragScrollDirective($parse, $document, $window, $rootScope, $timeout);
            return directive;
        }
        
        angular.module("Demo").directive('ngDragScroll', NgDragScrollDirective.Factory());
    }
}