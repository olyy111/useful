(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ZScroll"] = factory();
	else
		root["ZScroll"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ZScroll = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SWIPEBASE = 100;
var SWIPEDISBASE = 20;
var STAYTIME = 60;

var ZScroll = exports.ZScroll = function (_EventEmitter) {
    _inherits(ZScroll, _EventEmitter);

    function ZScroll(opations) {
        _classCallCheck(this, ZScroll);

        var _this = _possibleConstructorReturn(this, (ZScroll.__proto__ || Object.getPrototypeOf(ZScroll)).call(this));

        _this.defaults = {
            el: opations.el,
            fingerTime: 60,
            hasScrollBar: true,
            scrollBarId: "scrollBar",
            bounce: true,
            bounceScale: 0.33,
            bounceDuration: 0.5,
            swipeDuration: 0.8,
            minBarHeight: 30,
            swipeDisFactor: 1
        };

        _this.wrapper = document.querySelector(_this.defaults.el);
        _this.scroller = _this.wrapper.firstElementChild;

        (0, _utils.css)(_this.scroller, 'translateZ', '0.01');

        _this.x = 0;

        _this._moveFlag = false;

        _this.maxDisplacement = _this.scroller.offsetHeight - _this.wrapper.clientHeight;

        _this._oriX = _this._oriTransY = _this._lastY = _this._lastDisY = _this._lastMoveTime = 0;
        _this._init();
        return _this;
    }

    _createClass(ZScroll, [{
        key: "_init",
        value: function _init() {
            this._moveFlag = this.wrapper.clientHeight - this.scroller.offsetHeight < 0 ? true : false;
            if (!this._moveFlag) return;

            if (this.defaults.hasScrollBar) {
                this._initScrollBar();
            }

            this.scroller.addEventListener('touchstart', this._touchStart.bind(this));
            this.scroller.addEventListener('touchmove', this._touchMove.bind(this));
            this.scroller.addEventListener('touchend', this._touchEnd.bind(this));
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.wrapper = document.querySelector(this.defaults.el);
            this.scroller = this.wrapper.firstElementChild;
            this.maxDisplacement = this.scroller.offsetHeight - this.wrapper.clientHeight;

            this._moveFlag = this.wrapper.clientHeight - this.scroller.offsetHeight < 0 ? true : false;

            this.x = 0;
            (0, _utils.css)(this.scroller, "translateY", 0);

            this.trigger('refresh');
        }
    }, {
        key: "disable",
        value: function disable() {
            this._moveFlag = false;
            this.trigger('pause');
        }
    }, {
        key: "enable",
        value: function enable() {
            this._moveFlag = true;
            this.trigger('restart');
        }
    }, {
        key: "scrollTo",
        value: function scrollTo(y) {
            var _this2 = this;

            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
            var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "easeOut";

            clearInterval(this.scroller.timer);
            (0, _utils.ZTween)({
                el: this.scroller,
                target: {
                    "translateY": y
                },
                type: type,
                time: duration,
                callIn: function callIn() {
                    _this2._scrollBarMoveFn();
                    _this2.trigger('scroll');
                },
                callBack: function callBack() {
                    _this2._scrollBarCallBack();
                    _this2.trigger('swipeend');
                }
            });
        }
    }, {
        key: "_touchStart",
        value: function _touchStart(ev) {
            if (!this._moveFlag) return;
            clearInterval(this.scroller.timer);

            this._oriX = ev.changedTouches[0].pageY;
            this._oriTransY = (0, _utils.css)(this.scroller, "translateY");
            this._lastY = this._oriX;

            this.trigger('scrollstart');
        }
    }, {
        key: "_touchMove",
        value: function _touchMove(ev) {
            if (!this._moveFlag) return;

            var currentY = ev.changedTouches[0].pageY;

            var disY = currentY - this._oriX;
            this.x = this._oriTransY + disY;

            this._dealBoundaryMove();

            (0, _utils.css)(this.scroller, "translateY", this.x);

            this._lastDisY = currentY - this._lastY;
            this._lastY = currentY;
            this._lastMoveTime = new Date().getTime();

            this._scrollBarMoveFn();

            this.trigger('scroll');
        }
    }, {
        key: "_touchEnd",
        value: function _touchEnd(ev) {
            var _this3 = this;

            if (!this._moveFlag) return;

            this.trigger('scrollend');

            this.x = Math.round((0, _utils.css)(this.scroller, "translateY"));
            var endTime = new Date().getTime();
            var lastDisTime = endTime - this._lastMoveTime;

            //长时按压，手指离开继续滚动
            if (lastDisTime > STAYTIME) {
                if (this.x < 0 && this.x > -this.maxDisplacement) {
                    (0, _utils.ZTween)({
                        el: this.scrollBar,
                        target: {
                            'opacity': 0
                        },
                        type: 'linear',
                        time: 200
                    });
                    this.trigger('swipeend');
                    return;
                }
            }

            this._target = Math.round(this.x + this._lastDisY * SWIPEDISBASE * this.defaults.swipeDisFactor);

            this._type = "easeOut";

            this._swipeTimeBase = this.defaults.swipeDuration * SWIPEBASE;

            this._bounceMoveTimeFn();

            var swipeTime = Math.sqrt(Math.abs(this._target - this.x)) * this._swipeTimeBase;

            this._lastMoveTime = null;
            this._lastDisY = null;

            (0, _utils.ZTween)({
                el: this.scroller,
                target: {
                    "translateY": this._target
                },
                type: this._type,
                time: swipeTime,
                callIn: function callIn() {
                    _this3._scrollBarMoveFn();
                    _this3.trigger('scroll');
                },
                callBack: function callBack() {
                    _this3._scrollBarCallBack();
                    _this3.trigger('swipeend');
                }
            });
        }
    }, {
        key: "_dealBoundaryMove",
        value: function _dealBoundaryMove() {
            if (this.defaults.bounce) {

                //如果currentTransY超过边界值，那么屏幕跟随手指移动比例变为3：1 移动更小的距离
                if (this.x < -this.maxDisplacement) {
                    this.x = -this.maxDisplacement + (this.x + this.maxDisplacement) * this.defaults.bounceScale;
                } else if (this.x > 0) {
                    this.x = this.x * this.defaults.bounceScale;
                }
            } else {
                if (this.x < -this.maxDisplacement) {
                    this.x = -this.maxDisplacement;
                } else if (this.x > 0) {
                    this.x = 0;
                }
            }
        }
    }, {
        key: "_bounceMoveTimeFn",
        value: function _bounceMoveTimeFn() {
            if (this._target < -this.maxDisplacement) {

                this._target = -this.maxDisplacement;

                if (this.defaults.bounce) {
                    this._type = "backOut";
                    this._swipeTimeBase = this.defaults.swipeDuration * SWIPEBASE * this.defaults.bounceDuration;
                }
            } else if (this._target > 0) {

                this._target = 0;

                if (this.defaults.bounce) {
                    this._type = "backOut";
                    this._swipeTimeBase = this.defaults.swipeDuration * SWIPEBASE * this.defaults.bounceDuration;
                }
            }
        }
    }, {
        key: "_initScrollBar",
        value: function _initScrollBar() {
            this.scrollBar = document.createElement('div');
            this.defaults.hasScrollBar && this.scrollBar.setAttribute('id', this.defaults.scrollBarId);

            this.wrapper.appendChild(this.scrollBar);
        }
    }, {
        key: "_scrollBarMoveFn",
        value: function _scrollBarMoveFn() {
            if (!this.defaults.hasScrollBar) return;
            if (this.defaults.hasScrollBar) {
                this.scrollBar.style.opacity = 1;
            }

            this.x = (0, _utils.css)(this.scroller, 'translateY');

            var scaleHeight = this.wrapper.clientHeight / this.scroller.offsetHeight,
                scrollBarHeight = this.wrapper.clientHeight * scaleHeight,
                maxScrollDis = this.wrapper.clientHeight - scrollBarHeight,
                maxScrollReduction = scrollBarHeight - this.defaults.minBarHeight;
            this.scrollBar.style.height = scrollBarHeight + 'px';

            var overShow = void 0;

            if (this.x < -this.maxDisplacement) {

                //滚动条增加或者减少的长度	
                overShow = -this.x - this.maxDisplacement;
                overShow = Math.min(overShow, maxScrollReduction);

                (0, _utils.css)(this.scrollBar, 'height', scrollBarHeight - overShow);
                (0, _utils.css)(this.scrollBar, 'translateY', maxScrollDis + overShow);
            } else if (this.x > 0) {
                overShow = this.x;
                overShow = Math.min(overShow, maxScrollReduction);

                (0, _utils.css)(this.scrollBar, 'height', scrollBarHeight - overShow);
                (0, _utils.css)(this.scrollBar, 'translateY', 0);
            } else {
                var scaleY = -this.x / this.maxDisplacement;

                (0, _utils.css)(this.scrollBar, 'translateY', maxScrollDis * scaleY);
            }
        }
    }, {
        key: "_scrollBarCallBack",
        value: function _scrollBarCallBack() {
            if (!this.defaults.hasScrollBar) return;
            (0, _utils.ZTween)({
                el: this.scrollBar,
                target: {
                    'opacity': 0
                },
                type: 'linear',
                time: '200'
            });
        }
    }]);

    return ZScroll;
}(_utils.EventEmitter);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ZScroll = __webpack_require__(0);

module.exports = _ZScroll.ZScroll;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.css = css;
exports.cssTransform = cssTransform;
exports.ZTween = ZTween;
//运动公式
var Tween = {
	linear: function linear(t, b, c, d) {
		return c * t / d + b;
	},
	easeIn: function easeIn(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	easeOut: function easeOut(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	easeBoth: function easeBoth(t, b, c, d) {
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * (--t * (t - 2) - 1) + b;
	},
	easeInStrong: function easeInStrong(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	easeOutStrong: function easeOutStrong(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeBothStrong: function easeBothStrong(t, b, c, d) {
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t * t * t + b;
		}
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	elasticIn: function elasticIn(t, b, c, d, a, p) {
		if (t === 0) {
			return b;
		}
		if ((t /= d) == 1) {
			return b + c;
		}
		if (!p) {
			p = d * 0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	elasticOut: function elasticOut(t, b, c, d, a, p) {
		if (t === 0) {
			return b;
		}
		if ((t /= d) == 1) {
			return b + c;
		}
		if (!p) {
			p = d * 0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	elasticBoth: function elasticBoth(t, b, c, d, a, p) {
		if (t === 0) {
			return b;
		}
		if ((t /= d / 2) == 2) {
			return b + c;
		}
		if (!p) {
			p = d * (0.3 * 1.5);
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if (t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	},
	backIn: function backIn(t, b, c, d, s) {
		if (typeof s == 'undefined') {
			s = 1.70158;
		}
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	backOut: function backOut(t, b, c, d, s) {
		if (typeof s == 'undefined') {
			s = 2.70158; //回缩的距离
		}
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	backBoth: function backBoth(t, b, c, d, s) {
		if (typeof s == 'undefined') {
			s = 1.70158;
		}
		if ((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	},
	bounceIn: function bounceIn(t, b, c, d) {
		return c - Tween['bounceOut'](d - t, 0, c, d) + b;
	},
	bounceOut: function bounceOut(t, b, c, d) {
		if ((t /= d) < 1 / 2.75) {
			return c * (7.5625 * t * t) + b;
		} else if (t < 2 / 2.75) {
			return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
		} else if (t < 2.5 / 2.75) {
			return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
		}
		return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
	},
	bounceBoth: function bounceBoth(t, b, c, d) {
		if (t < d / 2) {
			return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}
};
/**
 * 设置（三个参数）或者(读取)元素的css样式值 可以设置元素的transform
 * @param {Object} element 要修改样式的元素
 * @param {Object} attr	修改元素的那个样式
 * @param {Object} val 修改样式的目标值
 */

function css(element, attr, val) {

	//如果传入的是transform 的属性名 调用cssTransform函数
	if (css.attr.indexOf(attr) >= 0) {
		return cssTransform(element, attr, val);
	}

	//读取值
	if (arguments.length == 2) {
		var val = getComputedStyle(element)[attr];

		if (attr == 'opacity') {
			val = Math.round(val * 100);
		}
		return parseFloat(val);
	}

	//设置值
	if (attr == "opacity") {
		element.style.opacity = val / 100;
	} else {
		element.style[attr] = val + "px";
	}
}

//transform的样式名
css.attr = ["scale", "scaleX", "scaleY", "scaleZ", "rotateX", "rotateY", "rotateZ", "rotate", "skewX", "skewY", "translateX", "translateY", "translateZ"];

/**
 * 设置元素的transform样式
 * @param {Object} element 对哪个元素进行设置
 * @param {Object} attr	需要设置那个transform值
 * @param {Object} val	目标值 不带单位
 */
function cssTransform(element, attr, val) {
	if (!element.transform) {
		element.transform = {};
	}

	//没有传入第三个参数，读取值
	if (typeof val === "undefined") {
		if (typeof element.transform[attr] === "undefined") {
			switch (attr) {
				case "scale":
				case "scaleX":
				case "scaleY":
				case "scaleZ":
					element.transform[attr] = 100;
					break;
				default:
					element.transform[attr] = 0;
			}
		}

		//返回属性名对应的值
		return element.transform[attr];
	} else {

		//传入第三个参数，设置值
		element.transform[attr] = val;
		var transformVal = "";

		for (var s in element.transform) {
			switch (s) {
				case "scale":
				case "scaleX":
				case "scaleY":
				case "scaleZ":
					transformVal += " " + s + "(" + element.transform[s] / 100 + ")";
					break;
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ":
				case "skewX":
				case "skewY":
					transformVal += " " + s + "(" + element.transform[s] + "deg)";
					break;
				default:
					transformVal += " " + s + "(" + element.transform[s] + "px)";
			}
		}

		//设置
		element.style.WebkitTransform = element.style.transform = transformVal;
	}
}
/**
 * 运动函数
 * @param {Object} init
 * 		init:
 * 		init.el {Object} 运动的DOM元素
 * 		init.target {Object} 运动的目标点如 'left': 100  不加单位
 * 		init.time {Number} 运动事件 单位ms
 * 		init.callBack {Function} 回调函数
 * 		init.callIN {Function} step函数
 * 		init.type {String} 运动形式 为Tween函数的任何一个属性名
 * 
 */
function ZTween(init) {
	var t = 0,
	    b = {},
	    //运动起点
	c = {},
	    //运动区间
	d = init.time / 20;

	for (var s in init.target) {
		b[s] = css(init.el, s);
		c[s] = init.target[s] - b[s];
	}

	clearInterval(init.el.timer);

	init.el.timer = setInterval(function () {
		t++;
		if (t > d) {
			clearInterval(init.el.timer);
			init.callBack && init.callBack.call(init.el);
		} else {
			init.callIn && init.callIn.call(init.el);
			for (var s in b) {
				var val = Number(Tween[init.type](t, b[s], c[s], d).toFixed(2));
				css(init.el, s, val);
			}
		}
	}, 20);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = exports.EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this._events = {};
    }

    _createClass(EventEmitter, [{
        key: "on",
        value: function on(type, fn) {
            var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;


            if (!this._events[type]) {
                this._events[type] = [];
            }
            this._events[type].push([fn, context]);
        }
    }, {
        key: "off",
        value: function off(type, fn) {
            var ev = this._events[type];
            if (!ev) {
                return;
            }
            for (var i = 0; i < ev.length; i++) {
                if (ev[i][0] === fn) {
                    ev.splice(i, 1);
                    i--;
                }
            }
        }
    }, {
        key: "once",
        value: function once(type, fn) {
            var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

            var ev = this._events[type];

            //调用结束后就销毁了，所以这里的局部变量不会共享
            var fired = false;

            //这里不能用箭头函数
            var onceFn = function onceFn() {
                this.off(type, onceFn);
                if (!fired) {

                    //兼容ie>8 [].slice.call(arguments)
                    fn.apply(context, [].slice.call(arguments));
                    fired = true;
                }
            };
            this.on(type, onceFn, context);
        }
    }, {
        key: "trigger",
        value: function trigger(type) {

            var event = this._events[type];
            if (!event) {
                return;
            }

            for (var i = 0; i < event.length; i++) {
                var fn = event[i][0];
                fn.apply(this, [].slice.call(arguments, 1));
            }
        }
    }]);

    return EventEmitter;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventEmitter = __webpack_require__(3);

Object.keys(_eventEmitter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _eventEmitter[key];
    }
  });
});

var _lang = __webpack_require__(5);

Object.keys(_lang).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lang[key];
    }
  });
});

var _ZTween = __webpack_require__(2);

Object.keys(_ZTween).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ZTween[key];
    }
  });
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.extend = extend;
function isPlainObject(obj) {
    var proto,
        Ctor,
        toString = {}.hasOwnProperty.toString;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || {}.toString.call(obj) !== "[object Object]") {
        return false;
    }

    proto = getPrototype(obj);

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
        return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && toString.call(Ctor) === toString.call(Object);
}
function extend() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && {}.toString.call(target) !== "[object Function]") {
        target = {};
    }
    for (; i < length; i++) {

        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {

            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }
                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    // Return the modified object
    return target;
};

/***/ })
/******/ ]);
});