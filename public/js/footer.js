/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(72);


/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(73)
/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue/layouts/footer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6d9b4788", Component.options)
  } else {
    hotAPI.reload("data-v-6d9b4788", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_footerComponent_vue__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_footerComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_footerComponent_vue__);



var app = new Vue({
  el: "#footerC",
  name: 'footerC',
  data: {},
  components: {
    footerComponent: __WEBPACK_IMPORTED_MODULE_0__components_footerComponent_vue___default.a
  }
});

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(75)
/* template */
var __vue_template__ = __webpack_require__(76)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/footerComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-722347db", Component.options)
  } else {
    hotAPI.reload("data-v-722347db", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'footerComponent',
    props: {
        url: {
            type: String,
            required: true
        }
    },
    mounted: function mounted() {}
});

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("section", { staticClass: "footer-section" }, [
      _c("div", { staticClass: "container" }, [
        _c("div", { staticClass: "footer-logo text-center" }, [
          _c("a", { attrs: { href: "#" } }, [
            _c("img", {
              attrs: { src: _vm.url + "/img/logo-light.png", alt: "" }
            })
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-lg-3 col-sm-6" }, [
            _c("div", { staticClass: "footer-widget about-widget" }, [
              _c("h2", [_vm._v("About")]),
              _vm._v(" "),
              _c("p", [
                _vm._v(
                  "Donec vitae purus nunc. Morbi faucibus erat sit amet congue mattis. Nullam frin-gilla faucibus urna, id dapibus erat iaculis ut. Integer ac sem."
                )
              ]),
              _vm._v(" "),
              _c("img", { attrs: { src: _vm.url + "/img/cards.png", alt: "" } })
            ])
          ]),
          _vm._v(" "),
          _vm._m(0),
          _vm._v(" "),
          _c("div", { staticClass: "col-lg-3 col-sm-6" }, [
            _c("div", { staticClass: "footer-widget about-widget" }, [
              _c("h2", [_vm._v("Questions")]),
              _vm._v(" "),
              _c("div", { staticClass: "fw-latest-post-widget" }, [
                _c("div", { staticClass: "lp-item" }, [
                  _c("img", {
                    staticClass: "lp-thumb set-bg",
                    attrs: { src: _vm.url + "/img/blog-thumbs/1.jpg" }
                  }),
                  _vm._v(" "),
                  _vm._m(1)
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "lp-item" }, [
                  _c("img", {
                    staticClass: "lp-thumb set-bg",
                    attrs: { src: _vm.url + "/img/blog-thumbs/2.jpg" }
                  }),
                  _vm._v(" "),
                  _vm._m(2)
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _vm._m(3)
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "social-links-warp" }, [
        _c("div", { staticClass: "container" }, [
          _vm._m(4),
          _vm._v(" "),
          _c("p", { staticClass: "text-white text-center mt-5" }, [
            _vm._v("Copyright ©"),
            _c("span", [_vm._v(_vm._s(new Date().getFullYear()))]),
            _vm._v(" All rights reserved | This template is made with "),
            _c("i", {
              staticClass: "fa fa-heart-o",
              attrs: { "aria-hidden": "true" }
            }),
            _vm._v(" by "),
            _c(
              "a",
              { attrs: { href: "https://colorlib.com", target: "_blank" } },
              [_vm._v("Colorlib")]
            )
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-lg-3 col-sm-6" }, [
      _c("div", { staticClass: "footer-widget about-widget" }, [
        _c("h2", [_vm._v("Questions")]),
        _vm._v(" "),
        _c("ul", [
          _c("li", [_c("a", { attrs: { href: "" } }, [_vm._v("About Us")])]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "" } }, [_vm._v("Track Orders")])
          ]),
          _vm._v(" "),
          _c("li", [_c("a", { attrs: { href: "" } }, [_vm._v("Returns")])]),
          _vm._v(" "),
          _c("li", [_c("a", { attrs: { href: "" } }, [_vm._v("Jobs")])]),
          _vm._v(" "),
          _c("li", [_c("a", { attrs: { href: "" } }, [_vm._v("Shipping")])]),
          _vm._v(" "),
          _c("li", [_c("a", { attrs: { href: "" } }, [_vm._v("Blog")])])
        ]),
        _vm._v(" "),
        _c("ul", [
          _c("li", [_c("a", { attrs: { href: "" } }, [_vm._v("Partners")])]),
          _vm._v(" "),
          _c("li", [_c("a", { attrs: { href: "" } }, [_vm._v("Bloggers")])]),
          _vm._v(" "),
          _c("li", [_c("a", { attrs: { href: "" } }, [_vm._v("Support")])]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "" } }, [_vm._v("Terms of Use")])
          ]),
          _vm._v(" "),
          _c("li", [_c("a", { attrs: { href: "" } }, [_vm._v("Press")])])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "lp-content" }, [
      _c("h6", [_vm._v("what shoes to wear")]),
      _vm._v(" "),
      _c("span", [_vm._v("Oct 21, 2018")]),
      _vm._v(" "),
      _c("a", { staticClass: "readmore", attrs: { href: "#" } }, [
        _vm._v("Read More")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "lp-content" }, [
      _c("h6", [_vm._v("trends this year")]),
      _vm._v(" "),
      _c("span", [_vm._v("Oct 21, 2018")]),
      _vm._v(" "),
      _c("a", { staticClass: "readmore", attrs: { href: "#" } }, [
        _vm._v("Read More")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-lg-3 col-sm-6" }, [
      _c("div", { staticClass: "footer-widget contact-widget" }, [
        _c("h2", [_vm._v("Questions")]),
        _vm._v(" "),
        _c("div", { staticClass: "con-info" }, [
          _c("span", [_vm._v("C.")]),
          _vm._v(" "),
          _c("p", [_vm._v("Your Company Ltd ")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "con-info" }, [
          _c("span", [_vm._v("B.")]),
          _vm._v(" "),
          _c("p", [
            _vm._v("1481 Creekside Lane  Avila Beach, CA 93424, P.O. BOX 68 ")
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "con-info" }, [
          _c("span", [_vm._v("T.")]),
          _vm._v(" "),
          _c("p", [_vm._v("+53 345 7953 32453")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "con-info" }, [
          _c("span", [_vm._v("E.")]),
          _vm._v(" "),
          _c("p", [_vm._v("office@youremail.com")])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "social-links" }, [
      _c("a", { staticClass: "instagram", attrs: { href: "" } }, [
        _c("i", { staticClass: "fa fa-instagram" }),
        _c("span", [_vm._v("instagram")])
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "google-plus", attrs: { href: "" } }, [
        _c("i", { staticClass: "fa fa-google-plus" }),
        _c("span", [_vm._v("g+plus")])
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "pinterest", attrs: { href: "" } }, [
        _c("i", { staticClass: "fa fa-pinterest" }),
        _c("span", [_vm._v("pinterest")])
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "facebook", attrs: { href: "" } }, [
        _c("i", { staticClass: "fa fa-facebook" }),
        _c("span", [_vm._v("facebook")])
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "twitter", attrs: { href: "" } }, [
        _c("i", { staticClass: "fa fa-twitter" }),
        _c("span", [_vm._v("twitter")])
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "youtube", attrs: { href: "" } }, [
        _c("i", { staticClass: "fa fa-youtube" }),
        _c("span", [_vm._v("youtube")])
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "tumblr", attrs: { href: "" } }, [
        _c("i", { staticClass: "fa fa-tumblr-square" }),
        _c("span", [_vm._v("tumblr")])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-722347db", module.exports)
  }
}

/***/ })

/******/ });