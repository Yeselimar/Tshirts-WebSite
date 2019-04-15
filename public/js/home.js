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
/******/ 	return __webpack_require__(__webpack_require__.s = 85);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(8)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(10)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(12)
/* template */
var __vue_template__ = __webpack_require__(13)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
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
Component.options.__file = "resources/assets/js/components/layouts/loading.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e0973022", Component.options)
  } else {
    hotAPI.reload("data-v-e0973022", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(6)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(9)
/* template */
var __vue_template__ = __webpack_require__(14)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
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
Component.options.__file = "resources/assets/js/components/layouts/headerComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-42942aa3", Component.options)
  } else {
    hotAPI.reload("data-v-42942aa3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("26943fae", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-42942aa3\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./headerComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-42942aa3\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./headerComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\nli.logiform .droplogin:after {\n  position: absolute;\n  display: block;\n  content: \"\";\n  top: -15px;\n  right: 20px;\n  /*left: 190px;*/\n  width: 0;\n  height: 0;\n  margin-left: 0px;\n  overflow: hidden;\n  border: 7px solid transparent;\n  border-bottom-color: #ccc;\n}\n.droplogin .ingresar .input-group {\n  margin-top: 20px;\n}\n.droplogin .ingresar .input-group input {\n  width: 100%;\n  height: 44px;\n  border: none;\n  padding: 0 18px;\n  background: #f0f0f0;\n  border-radius: 40px;\n  font-size: 14px;\n}\n.droplogin .ingresar .input-group .form-control:focus {\n  color: #777777;\n  outline: none;\n  box-shadow: none;\n}\n.droplogin {\n  padding: 17px 17px 17px 17px;\n  min-width: 330px;\n  border-radius: .5em;\n  background: #fff;\n  border-color: #ebebeb;\n  z-index: 99999 !important;\n  position: absolute;\n  top: 2rem;\n  /*left: -10.6rem;*/\n  right: 0;\n  border: solid 1px #ebebeb;\n  -webkit-transition: all 0.4s;\n  -o-transition: all 0.4s;\n  transition: all 0.4s;\n  -webkit-box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);\n  box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);\n}\n@media (max-width: 768px) {\n.dropcart, .dropbag {\n    min-width: 450px !important;\n}\n}\n@media (max-width: 490px) {\n.dropcart, .dropbag {\n    min-width: 350px !important;\n}\n}\n@media (max-width: 400px) {\n.dropcart, .dropbag {\n    min-width: 334px !important;\n}\n}\n\n/*\n\t\t\t\t@media only screen and (min-width: 1200px) and (max-width: 1315px) {\n\t\t\t\t\t.droplogin {\n\t\t\t\t\t\tmin-width: 275px;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t*/\n.site-btn-login {\n  display: inline-block;\n  border: none;\n  font-size: 14px;\n  font-weight: 600;\n  min-width: 119px;\n  padding: 12px 20px 12px;\n  border-radius: 50px;\n  margin-top: 17px;\n  background: #ef7a6e;\n  color: #fff;\n  line-height: normal;\n  cursor: pointer;\n  text-align: center;\n}\na.link-login {\n  display: block;\n  position: relative;\n  font-size: 14px;\n  color: #8f8f8f;\n  margin-bottom: 6px;\n  cursor: pointer;\n}\na.link-login:hover {\n  font-weight: bold;\n}\nli.cartform .dropcart:after {\n  position: absolute;\n  display: block;\n  content: \"\";\n  top: -15px;\n  right: 20px;\n  /* left: 190px; */\n  width: 0;\n  height: 0;\n  margin-left: 0px;\n  overflow: hidden !important;\n  border: 7px solid transparent;\n  border-bottom-color: #ccc;\n}\n.dropcart {\n  min-width: 550px;\n  border-radius: .5em;\n  background: #fff;\n  border-color: #ebebeb;\n  z-index: 99999 !important;\n  position: absolute;\n  top: 2rem;\n  right: 0;\n  /* left: -20.6rem; */\n  border: solid 1px #ebebeb;\n  max-height: 70vh !important;\n  -webkit-transition: all 0.4s;\n  -o-transition: all 0.4s;\n  transition: all 0.4s;\n  -webkit-box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);\n  box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);\n}\nli.bagform .dropbag:after {\n  position: absolute;\n  display: block;\n  content: \"\";\n  top: -15px;\n  right: 20px;\n  /* left: 190px; */\n  width: 0;\n  height: 0;\n  margin-left: 0px;\n  overflow: hidden !important;\n  border: 7px solid transparent;\n  border-bottom-color: #ccc;\n}\n.dropbag {\n  min-width: 550px;\n  border-radius: .5em;\n  background: #fff;\n  border-color: #ebebeb;\n  z-index: 99999 !important;\n  position: absolute;\n  top: 2rem;\n  right: 0;\n  /* left: -20.6rem; */\n  border: solid 1px #ebebeb;\n  max-height: 70vh !important;\n  -webkit-transition: all 0.4s;\n  -o-transition: all 0.4s;\n  transition: all 0.4s;\n  -webkit-box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);\n  box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);\n}\n.js-header-main-cyo:hover {\n  color: #ef7a6e !important;\n}\n.border-li-barna-active {\n  border: 2px solid black;\n}\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_loading_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_loading_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_loading_vue__);
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
	name: 'headerComponent',
	props: {
		url: {
			type: String,
			required: true
		},
		isdesignp: {
			type: Boolean,
			required: false,
			value: false
		},
		isauthp: {
			type: Boolean,
			required: false,
			value: false
		},
		numcartp: {
			type: Number,
			required: false,
			value: 0
		},
		numbagp: {
			type: Number,
			required: false,
			value: 0
		},
		searchp: {
			type: String,
			required: false,
			value: ''
		},
		rubrop: {
			type: String,
			required: false,
			value: ''
		}
	},
	components: {
		loading: __WEBPACK_IMPORTED_MODULE_0__components_layouts_loading_vue___default.a
	},
	data: function data() {
		return {
			user: {
				name: '',
				last_name: ''
			},
			collapse: false,
			search: this.searchp,
			rubro: this.rubrop,
			showLogin: false,
			isDesign: this.isdesignp,
			numBag: this.numbagp,
			numCart: this.numcartp,
			isAuth: this.isauthp,
			showCart: false,
			showBag: false,
			showLoginOut: false,
			showCartOut: false,
			showBagOut: false,
			isLoading: false
		};
	},

	methods: {
		registrarse: function registrarse() {
			this.isLoading = true;
			location.replace(this.url + '/register');
		},
		seleted: function seleted(event) {
			this.rubro = String(event.target.innerText);
		},
		login: function login() {
			console.log('esta entrando');
		},
		showBagM: function showBagM() {
			var _this = this;

			if (!this.showBag) {
				this.showBagOut = false;
				this.showBag = true;
				this.showLoginOut = true;
				this.showCartOut = true;
				setTimeout(function (e) {
					_this.showLogin = false;
					_this.showCart = false;
				}, 500);
			} else {
				this.showBagOut = true;
				setTimeout(function (e) {
					_this.showBagOut = false;
					_this.showBag = false;
				}, 500);
			}
		},
		showCartM: function showCartM() {
			var _this2 = this;

			if (!this.showCart) {
				this.showCartOut = false;
				this.showCart = true;
				this.showLoginOut = true;
				this.showBagOut = true;
				setTimeout(function (e) {
					_this2.showLogin = false;
					_this2.showBag = false;
				}, 500);
			} else {
				this.showCartOut = true;
				setTimeout(function (e) {
					_this2.showCartOut = false;
					_this2.showCart = false;
				}, 500);
			}
		},
		showLoginM: function showLoginM() {
			var _this3 = this;

			if (!this.showLogin) {
				this.showLoginOut = false;
				this.showLogin = true;
				this.showBagOut = true;
				this.showCartOut = true;
				setTimeout(function (e) {
					_this3.showBag = false;
					_this3.showCart = false;
				}, 500);
			} else {
				this.showLoginOut = true;
				setTimeout(function (e) {
					_this3.showLoginOut = false;
					_this3.showLogin = false;
				}, 500);
			}
		},
		closeAll: function closeAll() {
			var _this4 = this;

			this.showLoginOut = true;
			this.showCartOut = true;
			this.showBagOut = true;
			setTimeout(function (e) {
				_this4.showLoginOut = false;
				_this4.showCartOut = false;
				_this4.showBagOut = false;
				_this4.showLogin = false;
				_this4.showCart = false;
				_this4.showBag = false;
			}, 500);
		},
		designM: function designM(cent) {
			this.$emit('designM', cent);
		},
		loginM: function loginM() {
			var _this5 = this;

			this.isLoading = true;
			var dataform = new FormData();
			dataform.append('password', this.user.password);
			dataform.append('email', this.user.email);
			var urli = this.url + '/login/post';
			axios.post(urli, dataform).then(function (response) {
				if (response.data.res) {
					console.log(response.data.msg);
					_this5.isLoading = false;
					//$('#modalRegister').modal('show');
				} else {
					console.log(response.data.msg);
					_this5.isLoading = false;
				}
			}).catch(function (error) {
				console.log('Ha ocurrido un error inesperado');
				_this5.isLoading = false;
			});
			this.$emit('loginM', this.user);
		},
		searchM: function searchM() {
			var e = {
				search: this.search,
				rubro: this.rubro
			};
			this.$emit('searchM', e);
		},
		searchK: function searchK() {
			var e = {
				search: this.search,
				rubro: this.rubro
			};
			this.$emit('searchK', e);
		},
		searchRubro: function searchRubro() {
			var value = $('#myInput').val();
			$(".dropdown-menu li").filter(function () {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
			});
		}
	},
	mounted: function mounted() {
		var _this6 = this;

		var logo = $('#logo-barna');
		var content = $('#content-barna');
		$(window).resize(function (event) {
			event.preventDefault();
			if (document.body.clientWidth <= 768) {
				_this6.collapse = true;
			} else {
				_this6.collapse = false;
			}
		});

		document.addEventListener("scroll", function (event) {
			event.preventDefault();
			var menu = $('.main-menu li a');
			if (document.documentElement.scrollTop > 10) {
				$(content).css('transition', 'all 0.5s ease 0.4s');
				$(logo).css('transition', 'all 0.5s ease 0.4s');
				$(logo).css('width', 50);
				$(logo).css('height', 65);
				$(content).css('height', 81);
				if (menu.length) {
					for (var i = 0; i < menu.length; i++) {
						$(menu[i]).css('transition', 'all 0.5s ease 0.4s');
						$(menu[i]).css('padding', '8px 0');
					}
				}
			} else {
				$(content).css('transition', 'all 0.5s ease 0.1s');
				$(logo).css('transition', 'all 0.5s ease 0.1s');
				$(logo).css('width', 75);
				$(logo).css('height', 105);

				if (menu.length) {
					for (var i = 0; i < menu.length; i++) {
						$(menu[i]).css('transition', 'all 0.5s ease 0.1s');
						$(menu[i]).css('padding', '17px 0');
					}
				}

				$(content).css('height', 170);
			}
		});
	},
	created: function created() {
		if (document.body.clientWidth <= 768) {
			this.collapse = true;
		} else {
			this.collapse = false;
		}
		this.isDesign = this.isdesignp;
		this.isAuth = this.isauthp;
		this.numCart = this.numcartp;
		this.search = this.searchp;
		this.rubro = this.rubrop;
		this.numBag = this.numbagp;
	},

	watch: {
		isdesignp: function isdesignp() {
			this.isDesign = this.isdesignp;
		},
		isauthp: function isauthp() {
			this.isAuth = this.isauthp;
		},
		numcartp: function numcartp() {
			this.numCart = this.numcartp;
		},
		numbagp: function numbagp() {
			this.numBag = this.numbagp;
		},
		searchp: function searchp() {
			this.search = this.searchp;
		},
		rubrop: function rubrop() {
			this.rubro = this.rubrop;
		}

	}
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7a849bbd", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e0973022\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./loading.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e0973022\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./loading.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n#preloader {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 999999;\n  background: rgba(0, 0, 0, 0.8);\n}\n.loading {\n  width: 40px;\n  height: 40px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-top: -13px;\n  margin-left: -13px;\n  border-radius: 60px;\n  animation: loader 0.8s linear infinite;\n  -webkit-animation: loader 0.8s linear infinite;\n}\n", ""]);

// exports


/***/ }),
/* 12 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'isLoading'
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { attrs: { id: "preloader" } }, [
      _c("div", { staticClass: "loading" })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e0973022", module.exports)
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "div",
        {
          staticClass: "header-section header-barna-fixed",
          on: { click: _vm.closeAll }
        },
        [
          _c("div", { staticClass: "header-top-barna" }, [
            _c(
              "div",
              {
                staticClass: "container",
                class: { "position-relative": _vm.collapse }
              },
              [
                _c(
                  "div",
                  {
                    staticClass:
                      "d-flex align-items-center flex-wrap-mw justify-content-around"
                  },
                  [
                    _c("div", { staticClass: "flex-basis-logo " }, [
                      _c(
                        "a",
                        { staticClass: "site-logo", attrs: { href: "#" } },
                        [
                          _c("img", {
                            attrs: {
                              src: _vm.url + "/img/barna.jpg",
                              id: "logo-barna",
                              alt: ""
                            }
                          })
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "flex-basis-design" }, [
                      _c(
                        "ul",
                        {
                          staticClass:
                            "d-flex align-items-center sprd-header-barna"
                        },
                        [
                          _c(
                            "li",
                            {
                              staticClass:
                                "mr-2 sprd-li-barna d-flex align-items-center",
                              class: [
                                { "border-li-barna-active": _vm.isDesign }
                              ]
                            },
                            [
                              _c(
                                "a",
                                {
                                  staticClass:
                                    "align-items-center d-flex js-header-main-cyo cursor",
                                  class: [{ "color-barna": _vm.isDesign }],
                                  on: {
                                    click: function($event) {
                                      $event.stopPropagation()
                                      $event.preventDefault()
                                      return _vm.designM(true)
                                    }
                                  }
                                },
                                [
                                  _vm._m(0),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "pl-2 sm-none-barna" },
                                    [
                                      _c("div", { staticClass: "title" }, [
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t\t\t\t\t\tDiseñar\n\n\t\t\t\t\t\t\t\t\t\t\t"
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "description",
                                          class: [
                                            { "color-black": _vm.isDesign }
                                          ]
                                        },
                                        [
                                          _vm._v(
                                            "\n\t\t\t\t\t\t\t\t\t\t\t\tHecho por ti\n\t\t\t\t\t\t\t\t\t\t\t"
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                ]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "li",
                            {
                              staticClass:
                                "mr-4 sprd-li-barna d-flex align-items-center",
                              class: [
                                { "border-li-barna-active": !_vm.isDesign }
                              ]
                            },
                            [
                              _c(
                                "a",
                                {
                                  staticClass:
                                    "align-items-center d-flex js-header-main-cyo cursor",
                                  class: [{ "color-barna": !_vm.isDesign }],
                                  on: {
                                    click: function($event) {
                                      $event.stopPropagation()
                                      $event.preventDefault()
                                      return _vm.designM(false)
                                    }
                                  }
                                },
                                [
                                  _vm._m(1),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "pl-2 sm-none-barna" },
                                    [
                                      _c("div", { staticClass: "title" }, [
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t\t\t\t\t\t\tComprar\n\t\t\t\t\t\t\t\t\t\t\t\t"
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "description",
                                          class: [
                                            { "color-black": !_vm.isDesign }
                                          ]
                                        },
                                        [
                                          _vm._v(
                                            "\n\t\t\t\t\t\t\t\t\t\t\t\t\tHecho para ti\n\t\t\t\t\t\t\t\t\t\t\t\t"
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                ]
                              )
                            ]
                          )
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _vm._m(2),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "d-contents collapseOne",
                        class: [{ collapse: _vm.collapse }],
                        attrs: {
                          "aria-labelledby": "heading",
                          "data-parent": "#accordionExample"
                        }
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "mr-4 flex-basis-search collapseOne",
                            class: [
                              { "mt-2": _vm.collapse },
                              { collapse: _vm.collapse }
                            ],
                            attrs: {
                              "aria-labelledby": "heading",
                              "data-parent": "#accordionExample"
                            }
                          },
                          [
                            _c(
                              "form",
                              {
                                staticClass:
                                  "header-search-form input-group ml-2 mr-2 form-search-barna"
                              },
                              [
                                _c(
                                  "div",
                                  { staticClass: "input-group-prepend cursor" },
                                  [
                                    _vm._m(3),
                                    _vm._v(" "),
                                    _c("ul", { staticClass: "dropdown-menu" }, [
                                      _c("input", {
                                        staticClass: "form-control",
                                        attrs: {
                                          id: "myInput",
                                          type: "text",
                                          placeholder: "Buscar.."
                                        },
                                        on: { keyup: _vm.searchRubro }
                                      }),
                                      _vm._v(" "),
                                      _c("li", [
                                        _c(
                                          "a",
                                          {
                                            class: [
                                              {
                                                "bg-barna":
                                                  _vm.rubro === "Hombre"
                                              }
                                            ],
                                            on: {
                                              click: function($event) {
                                                $event.stopPropagation()
                                                $event.preventDefault()
                                                return _vm.seleted($event)
                                              }
                                            }
                                          },
                                          [_vm._v("Hombre")]
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("li", [
                                        _c(
                                          "a",
                                          {
                                            class: [
                                              {
                                                "bg-barna":
                                                  _vm.rubro === "Mujer"
                                              }
                                            ],
                                            on: {
                                              click: function($event) {
                                                $event.stopPropagation()
                                                $event.preventDefault()
                                                return _vm.seleted($event)
                                              }
                                            }
                                          },
                                          [_vm._v("Mujer")]
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("li", [
                                        _c(
                                          "a",
                                          {
                                            class: [
                                              {
                                                "bg-barna": _vm.rubro === "Niña"
                                              }
                                            ],
                                            on: {
                                              click: function($event) {
                                                $event.stopPropagation()
                                                $event.preventDefault()
                                                return _vm.seleted($event)
                                              }
                                            }
                                          },
                                          [_vm._v("Niña")]
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("li", [
                                        _c(
                                          "a",
                                          {
                                            class: [
                                              {
                                                "bg-barna": _vm.rubro === "Niño"
                                              }
                                            ],
                                            on: {
                                              click: function($event) {
                                                $event.stopPropagation()
                                                $event.preventDefault()
                                                return _vm.seleted($event)
                                              }
                                            }
                                          },
                                          [_vm._v("Niño")]
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("li", [
                                        _c(
                                          "a",
                                          {
                                            class: [
                                              {
                                                "bg-barna": _vm.rubro === "Taza"
                                              }
                                            ],
                                            on: {
                                              click: function($event) {
                                                $event.stopPropagation()
                                                $event.preventDefault()
                                                return _vm.seleted($event)
                                              }
                                            }
                                          },
                                          [_vm._v("Taza")]
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("li", [
                                        _c(
                                          "a",
                                          {
                                            class: [
                                              {
                                                "bg-barna": _vm.rubro === "Buzo"
                                              }
                                            ],
                                            on: {
                                              click: function($event) {
                                                $event.stopPropagation()
                                                $event.preventDefault()
                                                return _vm.seleted($event)
                                              }
                                            }
                                          },
                                          [_vm._v("Buzo")]
                                        )
                                      ])
                                    ])
                                  ]
                                ),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.search,
                                      expression: "search"
                                    }
                                  ],
                                  staticClass:
                                    "input-search-barna form-control",
                                  attrs: {
                                    type: "text",
                                    placeholder: "Buscar en Barna ...."
                                  },
                                  domProps: { value: _vm.search },
                                  on: {
                                    keyup: _vm.searchK,
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.search = $event.target.value
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "input-group-append cursor",
                                    on: { click: _vm.searchM }
                                  },
                                  [_vm._m(4)]
                                )
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "flex-basis-icons  collapseOne",
                            class: [
                              { "mt-2": _vm.collapse },
                              { collapse: _vm.collapse }
                            ],
                            attrs: {
                              "aria-labelledby": "heading",
                              "data-parent": "#accordionExample"
                            }
                          },
                          [
                            _c("div", { staticClass: "user-panel" }, [
                              _c("ul", { staticClass: "navbar-nav d-inline" }, [
                                _c(
                                  "li",
                                  {
                                    staticClass:
                                      "nav-item d-inline dropdown bagform"
                                  },
                                  [
                                    _c("div", { staticClass: "up-item pr-3" }, [
                                      _c(
                                        "div",
                                        {
                                          staticClass: "header-cart cursor",
                                          on: {
                                            click: function($event) {
                                              $event.stopPropagation()
                                              $event.preventDefault()
                                              return _vm.showBagM($event)
                                            }
                                          }
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fa fa-shopping-bag"
                                          }),
                                          _vm._v(" "),
                                          _c("span", [_vm._v("0")])
                                        ]
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _vm.showBag
                                      ? _c(
                                          "div",
                                          {
                                            staticClass: "dropbag ",
                                            class: [
                                              {
                                                "zoomIn animated": _vm.showBag
                                              },
                                              {
                                                "zoomOut animated":
                                                  _vm.showBagOut
                                              }
                                            ],
                                            on: {
                                              click: function($event) {
                                                $event.stopPropagation()
                                                $event.preventDefault()
                                              }
                                            }
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass: "scroll-barna",
                                                staticStyle: {
                                                  overflow: "auto",
                                                  "max-height": "85vh",
                                                  padding: "17px"
                                                }
                                              },
                                              [
                                                _vm._m(5),
                                                _vm._v(" "),
                                                _c(
                                                  "table",
                                                  {
                                                    staticClass:
                                                      "table table-hover"
                                                  },
                                                  [
                                                    _vm._m(6),
                                                    _vm._v(" "),
                                                    _vm._m(7),
                                                    _vm._v(" "),
                                                    _c("tbody", [
                                                      _c("tr", [
                                                        _c(
                                                          "td",
                                                          {
                                                            staticClass:
                                                              "text-center"
                                                          },
                                                          [
                                                            _c("img", {
                                                              staticClass:
                                                                "w-30",
                                                              attrs: {
                                                                src:
                                                                  _vm.url +
                                                                  "/img/cart/2.jpg",
                                                                alt: ""
                                                              }
                                                            }),
                                                            _vm._v(" "),
                                                            _vm._m(8)
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _vm._m(9),
                                                        _vm._v(" "),
                                                        _vm._m(10),
                                                        _vm._v(" "),
                                                        _vm._m(11)
                                                      ]),
                                                      _vm._v(" "),
                                                      _c("tr", [
                                                        _c(
                                                          "td",
                                                          {
                                                            staticClass:
                                                              "text-center"
                                                          },
                                                          [
                                                            _c("img", {
                                                              staticClass:
                                                                "w-30",
                                                              attrs: {
                                                                src:
                                                                  _vm.url +
                                                                  "/img/cart/3.jpg",
                                                                alt: ""
                                                              }
                                                            }),
                                                            _vm._v(" "),
                                                            _vm._m(12)
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _vm._m(13),
                                                        _vm._v(" "),
                                                        _vm._m(14),
                                                        _vm._v(" "),
                                                        _vm._m(15)
                                                      ])
                                                    ])
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _vm._m(16)
                                              ]
                                            )
                                          ]
                                        )
                                      : _vm._e()
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("ul", { staticClass: "navbar-nav d-inline" }, [
                                _c(
                                  "li",
                                  {
                                    staticClass:
                                      "nav-item d-inline dropdown cartform"
                                  },
                                  [
                                    _c("div", { staticClass: "up-item pr-3" }, [
                                      _c(
                                        "div",
                                        {
                                          staticClass: "header-cart cursor",
                                          on: {
                                            click: function($event) {
                                              $event.stopPropagation()
                                              $event.preventDefault()
                                              return _vm.showCartM($event)
                                            }
                                          }
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fa fa-shopping-cart"
                                          }),
                                          _vm._v(" "),
                                          _c("span", [_vm._v("0")])
                                        ]
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _vm.showCart
                                      ? _c(
                                          "div",
                                          {
                                            staticClass: "dropcart ",
                                            class: [
                                              {
                                                "zoomIn animated": _vm.showCart
                                              },
                                              {
                                                "zoomOut animated":
                                                  _vm.showCartOut
                                              }
                                            ],
                                            on: {
                                              click: function($event) {
                                                $event.stopPropagation()
                                                $event.preventDefault()
                                              }
                                            }
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass: "scroll-barna",
                                                staticStyle: {
                                                  overflow: "auto",
                                                  "max-height": "85vh",
                                                  padding: "17px"
                                                }
                                              },
                                              [
                                                _vm._m(17),
                                                _vm._v(" "),
                                                _c(
                                                  "table",
                                                  {
                                                    staticClass:
                                                      "table table-hover"
                                                  },
                                                  [
                                                    _vm._m(18),
                                                    _vm._v(" "),
                                                    _vm._m(19),
                                                    _vm._v(" "),
                                                    _c("tbody", [
                                                      _c("tr", [
                                                        _c(
                                                          "td",
                                                          {
                                                            staticClass:
                                                              "text-center"
                                                          },
                                                          [
                                                            _c("img", {
                                                              staticClass:
                                                                "w-30",
                                                              attrs: {
                                                                src:
                                                                  _vm.url +
                                                                  "/img/cart/1.jpg",
                                                                alt: ""
                                                              }
                                                            }),
                                                            _vm._v(" "),
                                                            _vm._m(20)
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _vm._m(21),
                                                        _vm._v(" "),
                                                        _vm._m(22),
                                                        _vm._v(" "),
                                                        _vm._m(23)
                                                      ]),
                                                      _vm._v(" "),
                                                      _c("tr", [
                                                        _c(
                                                          "td",
                                                          {
                                                            staticClass:
                                                              "text-center"
                                                          },
                                                          [
                                                            _c("img", {
                                                              staticClass:
                                                                "w-30",
                                                              attrs: {
                                                                src:
                                                                  _vm.url +
                                                                  "/img/cart/2.jpg",
                                                                alt: ""
                                                              }
                                                            }),
                                                            _vm._v(" "),
                                                            _vm._m(24)
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _vm._m(25),
                                                        _vm._v(" "),
                                                        _vm._m(26),
                                                        _vm._v(" "),
                                                        _vm._m(27)
                                                      ])
                                                    ])
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _vm._m(28)
                                              ]
                                            )
                                          ]
                                        )
                                      : _vm._e()
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("ul", { staticClass: "navbar-nav d-inline" }, [
                                _c(
                                  "li",
                                  {
                                    staticClass:
                                      "nav-item d-inline dropdown logiform"
                                  },
                                  [
                                    _c("div", { staticClass: "up-item pr-3" }, [
                                      _c(
                                        "div",
                                        {
                                          staticClass: "header-cart cursor",
                                          on: {
                                            click: function($event) {
                                              $event.stopPropagation()
                                              $event.preventDefault()
                                              return _vm.showLoginM($event)
                                            }
                                          }
                                        },
                                        [_c("i", { staticClass: "fa fa-user" })]
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _vm.showLogin
                                      ? _c(
                                          "div",
                                          {
                                            staticClass: "droplogin ",
                                            class: [
                                              {
                                                "zoomIn animated": _vm.showLogin
                                              },
                                              {
                                                "zoomOut animated":
                                                  _vm.showLoginOut
                                              }
                                            ],
                                            on: {
                                              click: function($event) {
                                                $event.stopPropagation()
                                                $event.preventDefault()
                                              }
                                            }
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass: "scroll-barna",
                                                staticStyle: {
                                                  overflow: "auto",
                                                  "max-height": "85vh"
                                                }
                                              },
                                              [
                                                _vm._m(29),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "ingresar" },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          " form-email input-group"
                                                      },
                                                      [
                                                        _c("input", {
                                                          directives: [
                                                            {
                                                              name: "model",
                                                              rawName:
                                                                "v-model",
                                                              value:
                                                                _vm.user.email,
                                                              expression:
                                                                "user.email"
                                                            }
                                                          ],
                                                          staticClass:
                                                            "form-control",
                                                          attrs: {
                                                            type: "email",
                                                            name: "email",
                                                            placeholder:
                                                              "Ingrese su email"
                                                          },
                                                          domProps: {
                                                            value:
                                                              _vm.user.email
                                                          },
                                                          on: {
                                                            input: function(
                                                              $event
                                                            ) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm.user,
                                                                "email",
                                                                $event.target
                                                                  .value
                                                              )
                                                            }
                                                          }
                                                        })
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          " form-password input-group"
                                                      },
                                                      [
                                                        _c("input", {
                                                          directives: [
                                                            {
                                                              name: "model",
                                                              rawName:
                                                                "v-model",
                                                              value:
                                                                _vm.user
                                                                  .password,
                                                              expression:
                                                                "user.password"
                                                            }
                                                          ],
                                                          staticClass:
                                                            "form-control",
                                                          attrs: {
                                                            type: "password",
                                                            name: "password",
                                                            placeholder:
                                                              "Ingrese su contraseña"
                                                          },
                                                          domProps: {
                                                            value:
                                                              _vm.user.password
                                                          },
                                                          on: {
                                                            input: function(
                                                              $event
                                                            ) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm.user,
                                                                "password",
                                                                $event.target
                                                                  .value
                                                              )
                                                            }
                                                          }
                                                        })
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "d-flex justify-content-end"
                                                      },
                                                      [
                                                        _c("input", {
                                                          staticClass:
                                                            "site-btn-login float-right",
                                                          attrs: {
                                                            type: "button",
                                                            value: "Ingresar"
                                                          },
                                                          on: {
                                                            click: function(
                                                              $event
                                                            ) {
                                                              return _vm.loginM()
                                                            }
                                                          }
                                                        })
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "input-group remember justify-content-start text-left"
                                                      },
                                                      [
                                                        _c(
                                                          "a",
                                                          {
                                                            staticClass:
                                                              "link-login cursor",
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                $event.stopPropagation()
                                                                $event.preventDefault()
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "Recuperar contraseña"
                                                            )
                                                          ]
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "justify-content-start text-left"
                                                      },
                                                      [
                                                        _c(
                                                          "a",
                                                          {
                                                            staticClass:
                                                              "link-login cursor",
                                                            on: {
                                                              click:
                                                                _vm.registrarse
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "Registrarse"
                                                            )
                                                          ]
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                )
                                              ]
                                            )
                                          ]
                                        )
                                      : _vm._e()
                                  ]
                                )
                              ])
                            ])
                          ]
                        )
                      ]
                    )
                  ]
                )
              ]
            )
          ]),
          _vm._v(" "),
          _vm._m(30)
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "h-171", attrs: { id: "content-barna" } }),
      _vm._v(" "),
      _vm.isLoading ? _c("loading") : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex align-items-center" }, [
      _c("i", { staticClass: "fa fa-magic font-20" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex align-items-center" }, [
      _c("i", { staticClass: "fa fa-money font-20" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "slicknav_menu", attrs: { id: "accordionExample" } },
      [
        _c(
          "a",
          {
            staticClass: "slicknav_btn slicknav_collapsed",
            staticStyle: { outline: "none" },
            attrs: {
              href: "#",
              "aria-haspopup": "true",
              tabindex: "0",
              id: "heading",
              "data-toggle": "collapse",
              "data-target": ".collapseOne",
              "aria-expanded": "1",
              "aria-controls": "collapseOne1"
            }
          },
          [
            _c("span", { staticClass: "slicknav_icon" }, [
              _c("span", { staticClass: "slicknav_icon-bar" }),
              _c("span", { staticClass: "slicknav_icon-bar" }),
              _c("span", { staticClass: "slicknav_icon-bar" })
            ])
          ]
        )
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "span",
      {
        staticClass: "input-group-text input-group-search-barna",
        attrs: {
          "data-toggle": "dropdown",
          "aria-expanded": "false",
          id: "basic-addon1"
        }
      },
      [
        _c("i", {
          staticClass: "fa fa-filter",
          attrs: { "aria-hidden": "true" }
        })
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "span",
      { staticClass: "input-group-text input-group-search-barna" },
      [
        _c("i", {
          staticClass: "fa fa-search",
          attrs: { "aria-hidden": "true" }
        })
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h5", { staticClass: "pb-2" }, [
      _c("i", { staticClass: "fa fa-shopping-bag pr-2" }),
      _vm._v("Cesta de Pedidos")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "product-th text-center" }, [
          _vm._v("Producto")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "quy-th text-center" }, [_vm._v("Cant")]),
        _vm._v(" "),
        _c("th", { staticClass: "total-th text-right" }, [_vm._v("Precio")]),
        _vm._v(" "),
        _c("th", { staticClass: "text-center" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tfoot", [
      _c("tr", { staticClass: "bg-gray" }, [
        _c("td", { attrs: { colspan: "2" } }),
        _vm._v(" "),
        _c("td", { staticClass: "total-col text-right" }, [
          _c("h5", [_vm._v(" TOTAL: $883")])
        ]),
        _vm._v(" "),
        _c("td")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "pc-title" }, [
      _c("h6", [_vm._v("Nev Print Absol")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-center" }, [
      _c("h6", { staticClass: "inc qtybtn" }, [_vm._v("x 1")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-right" }, [
      _c("h6", [_vm._v("$145.90")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-center" }, [
      _c("h5", [_c("i", { staticClass: "fa fa-trash cursor" })])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "pc-title" }, [
      _c("h6", [_vm._v("Swutter Print Dress")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-center" }, [
      _c("h6", { staticClass: "inc qtybtn" }, [_vm._v("x 1")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-right" }, [
      _c("h6", [_vm._v("$25.90")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-center" }, [
      _c("h5", [_c("i", { staticClass: "fa fa-trash cursor" })])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex justify-content-end" }, [
      _c("input", {
        staticClass: "site-btn-login float-right",
        attrs: { type: "button", value: "Procesar Pedido" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h5", { staticClass: "pb-2" }, [
      _c("i", { staticClass: "fa fa-shopping-cart pr-2" }),
      _vm._v("Carrito de Compra")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "product-th text-center" }, [
          _vm._v("Producto")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "quy-th text-center" }, [_vm._v("Cant")]),
        _vm._v(" "),
        _c("th", { staticClass: "total-th text-right" }, [_vm._v("Precio")]),
        _vm._v(" "),
        _c("th", { staticClass: "text-center" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tfoot", [
      _c("tr", { staticClass: "bg-gray" }, [
        _c("td", { attrs: { colspan: "2" } }),
        _vm._v(" "),
        _c("td", { staticClass: "total-col text-right" }, [
          _c("h5", [_vm._v(" TOTAL: $83")])
        ]),
        _vm._v(" "),
        _c("td")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "pc-title" }, [
      _c("h6", [_vm._v("Animal Print Dress")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-center" }, [
      _c("h6", { staticClass: "inc qtybtn" }, [_vm._v("x 1")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-right" }, [
      _c("h6", [_vm._v("$75.90")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-center" }, [
      _c("h5", [_c("i", { staticClass: "fa fa-trash cursor" })])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "pc-title" }, [
      _c("h6", [_vm._v("Text Print Dress")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-center" }, [
      _c("h6", { staticClass: "inc qtybtn" }, [_vm._v("x 1")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-right" }, [
      _c("h6", [_vm._v("$5.90")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-center" }, [
      _c("h5", [_c("i", { staticClass: "fa fa-trash cursor" })])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex justify-content-end" }, [
      _c("input", {
        staticClass: "site-btn-login float-right",
        attrs: { type: "button", value: "Comprar" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "h5",
      {
        staticClass: "pb-2",
        staticStyle: { "border-bottom": "1px solid #cccccc" }
      },
      [_c("i", { staticClass: "fa fa-user pr-2" }), _vm._v("Iniciar Sesion")]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("nav", { staticClass: "main-navbar text-center" }, [
      _c(
        "div",
        { staticClass: "container-fluid d-flex justify-content-center" },
        [
          _c(
            "ul",
            {
              staticClass:
                "container scroll-barna overflow-auto main-menu d-flex align-items-center w-auto"
            },
            [
              _c("li", [_c("a", { attrs: { href: "#" } }, [_vm._v("Hombre")])]),
              _vm._v(" "),
              _c("li", [_c("a", { attrs: { href: "#" } }, [_vm._v("Mujer")])]),
              _vm._v(" "),
              _c("li", [_c("a", { attrs: { href: "#" } }, [_vm._v("Niño")])]),
              _vm._v(" "),
              _c("li", [_c("a", { attrs: { href: "#" } }, [_vm._v("Niña")])]),
              _vm._v(" "),
              _c("li", [_c("a", { attrs: { href: "#" } }, [_vm._v("Tazas")])]),
              _vm._v(" "),
              _c("li", [_c("a", { attrs: { href: "#" } }, [_vm._v("Buzo")])])
            ]
          )
        ]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-42942aa3", module.exports)
  }
}

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports) {

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
/**
 * Owl carousel
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;(function($, window, document, undefined) {

	/**
	 * Creates a carousel.
	 * @class The Owl Carousel.
	 * @public
	 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
	 * @param {Object} [options] - The options
	 */
	function Owl(element, options) {

		/**
		 * Current settings for the carousel.
		 * @public
		 */
		this.settings = null;

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, Owl.Defaults, options);

		/**
		 * Plugin element.
		 * @public
		 */
		this.$element = $(element);

		/**
		 * Proxied event handlers.
		 * @protected
		 */
		this._handlers = {};

		/**
		 * References to the running plugins of this carousel.
		 * @protected
		 */
		this._plugins = {};

		/**
		 * Currently suppressed events to prevent them from being retriggered.
		 * @protected
		 */
		this._supress = {};

		/**
		 * Absolute current position.
		 * @protected
		 */
		this._current = null;

		/**
		 * Animation speed in milliseconds.
		 * @protected
		 */
		this._speed = null;

		/**
		 * Coordinates of all items in pixel.
		 * @todo The name of this member is missleading.
		 * @protected
		 */
		this._coordinates = [];

		/**
		 * Current breakpoint.
		 * @todo Real media queries would be nice.
		 * @protected
		 */
		this._breakpoint = null;

		/**
		 * Current width of the plugin element.
		 */
		this._width = null;

		/**
		 * All real items.
		 * @protected
		 */
		this._items = [];

		/**
		 * All cloned items.
		 * @protected
		 */
		this._clones = [];

		/**
		 * Merge values of all items.
		 * @todo Maybe this could be part of a plugin.
		 * @protected
		 */
		this._mergers = [];

		/**
		 * Widths of all items.
		 */
		this._widths = [];

		/**
		 * Invalidated parts within the update process.
		 * @protected
		 */
		this._invalidated = {};

		/**
		 * Ordered list of workers for the update process.
		 * @protected
		 */
		this._pipe = [];

		/**
		 * Current state information for the drag operation.
		 * @todo #261
		 * @protected
		 */
		this._drag = {
			time: null,
			target: null,
			pointer: null,
			stage: {
				start: null,
				current: null
			},
			direction: null
		};

		/**
		 * Current state information and their tags.
		 * @type {Object}
		 * @protected
		 */
		this._states = {
			current: {},
			tags: {
				'initializing': [ 'busy' ],
				'animating': [ 'busy' ],
				'dragging': [ 'interacting' ]
			}
		};

		$.each([ 'onResize', 'onThrottledResize' ], $.proxy(function(i, handler) {
			this._handlers[handler] = $.proxy(this[handler], this);
		}, this));

		$.each(Owl.Plugins, $.proxy(function(key, plugin) {
			this._plugins[key.charAt(0).toLowerCase() + key.slice(1)]
				= new plugin(this);
		}, this));

		$.each(Owl.Workers, $.proxy(function(priority, worker) {
			this._pipe.push({
				'filter': worker.filter,
				'run': $.proxy(worker.run, this)
			});
		}, this));

		this.setup();
		this.initialize();
	}

	/**
	 * Default options for the carousel.
	 * @public
	 */
	Owl.Defaults = {
		items: 3,
		loop: false,
		center: false,
		rewind: false,
		checkVisibility: true,

		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		freeDrag: false,

		margin: 0,
		stagePadding: 0,

		merge: false,
		mergeFit: true,
		autoWidth: false,

		startPosition: 0,
		rtl: false,

		smartSpeed: 250,
		fluidSpeed: false,
		dragEndSpeed: false,

		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: window,

		fallbackEasing: 'swing',
		slideTransition: '',

		info: false,

		nestedItemSelector: false,
		itemElement: 'div',
		stageElement: 'div',

		refreshClass: 'owl-refresh',
		loadedClass: 'owl-loaded',
		loadingClass: 'owl-loading',
		rtlClass: 'owl-rtl',
		responsiveClass: 'owl-responsive',
		dragClass: 'owl-drag',
		itemClass: 'owl-item',
		stageClass: 'owl-stage',
		stageOuterClass: 'owl-stage-outer',
		grabClass: 'owl-grab'
	};

	/**
	 * Enumeration for width.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Width = {
		Default: 'default',
		Inner: 'inner',
		Outer: 'outer'
	};

	/**
	 * Enumeration for types.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Type = {
		Event: 'event',
		State: 'state'
	};

	/**
	 * Contains all registered plugins.
	 * @public
	 */
	Owl.Plugins = {};

	/**
	 * List of workers involved in the update process.
	 */
	Owl.Workers = [ {
		filter: [ 'width', 'settings' ],
		run: function() {
			this._width = this.$element.width();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = this._items && this._items[this.relative(this._current)];
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			this.$stage.children('.cloned').remove();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var margin = this.settings.margin || '',
				grid = !this.settings.autoWidth,
				rtl = this.settings.rtl,
				css = {
					'width': 'auto',
					'margin-left': rtl ? margin : '',
					'margin-right': rtl ? '' : margin
				};

			!grid && this.$stage.children().css(css);

			cache.css = css;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
				merge = null,
				iterator = this._items.length,
				grid = !this.settings.autoWidth,
				widths = [];

			cache.items = {
				merge: false,
				width: width
			};

			while (iterator--) {
				merge = this._mergers[iterator];
				merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

				cache.items.merge = merge > 1 || cache.items.merge;

				widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
			}

			this._widths = widths;
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var clones = [],
				items = this._items,
				settings = this.settings,
				// TODO: Should be computed from number of min width items in stage
				view = Math.max(settings.items * 2, 4),
				size = Math.ceil(items.length / 2) * 2,
				repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
				append = '',
				prepend = '';

			repeat /= 2;

			while (repeat > 0) {
				// Switch to only using appended clones
				clones.push(this.normalize(clones.length / 2, true));
				append = append + items[clones[clones.length - 1]][0].outerHTML;
				clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
				prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
				repeat -= 1;
			}

			this._clones = clones;

			$(append).addClass('cloned').appendTo(this.$stage);
			$(prepend).addClass('cloned').prependTo(this.$stage);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				size = this._clones.length + this._items.length,
				iterator = -1,
				previous = 0,
				current = 0,
				coordinates = [];

			while (++iterator < size) {
				previous = coordinates[iterator - 1] || 0;
				current = this._widths[this.relative(iterator)] + this.settings.margin;
				coordinates.push(previous + current * rtl);
			}

			this._coordinates = coordinates;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var padding = this.settings.stagePadding,
				coordinates = this._coordinates,
				css = {
					'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
					'padding-left': padding || '',
					'padding-right': padding || ''
				};

			this.$stage.css(css);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var iterator = this._coordinates.length,
				grid = !this.settings.autoWidth,
				items = this.$stage.children();

			if (grid && cache.items.merge) {
				while (iterator--) {
					cache.css.width = this._widths[this.relative(iterator)];
					items.eq(iterator).css(cache.css);
				}
			} else if (grid) {
				cache.css.width = cache.items.width;
				items.css(cache.css);
			}
		}
	}, {
		filter: [ 'items' ],
		run: function() {
			this._coordinates.length < 1 && this.$stage.removeAttr('style');
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
			cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
			this.reset(cache.current);
		}
	}, {
		filter: [ 'position' ],
		run: function() {
			this.animate(this.coordinates(this._current));
		}
	}, {
		filter: [ 'width', 'position', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				padding = this.settings.stagePadding * 2,
				begin = this.coordinates(this.current()) + padding,
				end = begin + this.width() * rtl,
				inner, outer, matches = [], i, n;

			for (i = 0, n = this._coordinates.length; i < n; i++) {
				inner = this._coordinates[i - 1] || 0;
				outer = Math.abs(this._coordinates[i]) + padding * rtl;

				if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
					|| (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
					matches.push(i);
				}
			}

			this.$stage.children('.active').removeClass('active');
			this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

			this.$stage.children('.center').removeClass('center');
			if (this.settings.center) {
				this.$stage.children().eq(this.current()).addClass('center');
			}
		}
	} ];

	/**
	 * Create the stage DOM element
	 */
	Owl.prototype.initializeStage = function() {
		this.$stage = this.$element.find('.' + this.settings.stageClass);

		// if the stage is already in the DOM, grab it and skip stage initialization
		if (this.$stage.length) {
			return;
		}

		this.$element.addClass(this.options.loadingClass);

		// create stage
		this.$stage = $('<' + this.settings.stageElement + '>', {
			"class": this.settings.stageClass
		}).wrap( $( '<div/>', {
			"class": this.settings.stageOuterClass
		}));

		// append stage
		this.$element.append(this.$stage.parent());
	};

	/**
	 * Create item DOM elements
	 */
	Owl.prototype.initializeItems = function() {
		var $items = this.$element.find('.owl-item');

		// if the items are already in the DOM, grab them and skip item initialization
		if ($items.length) {
			this._items = $items.get().map(function(item) {
				return $(item);
			});

			this._mergers = this._items.map(function() {
				return 1;
			});

			this.refresh();

			return;
		}

		// append content
		this.replace(this.$element.children().not(this.$stage.parent()));

		// check visibility
		if (this.isVisible()) {
			// update view
			this.refresh();
		} else {
			// invalidate width
			this.invalidate('width');
		}

		this.$element
			.removeClass(this.options.loadingClass)
			.addClass(this.options.loadedClass);
	};

	/**
	 * Initializes the carousel.
	 * @protected
	 */
	Owl.prototype.initialize = function() {
		this.enter('initializing');
		this.trigger('initialize');

		this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

		if (this.settings.autoWidth && !this.is('pre-loading')) {
			var imgs, nestedSelector, width;
			imgs = this.$element.find('img');
			nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
			width = this.$element.children(nestedSelector).width();

			if (imgs.length && width <= 0) {
				this.preloadAutoWidthImages(imgs);
			}
		}

		this.initializeStage();
		this.initializeItems();

		// register event handlers
		this.registerEventHandlers();

		this.leave('initializing');
		this.trigger('initialized');
	};

	/**
	 * @returns {Boolean} visibility of $element
	 *                    if you know the carousel will always be visible you can set `checkVisibility` to `false` to
	 *                    prevent the expensive browser layout forced reflow the $element.is(':visible') does
	 */
	Owl.prototype.isVisible = function() {
		return this.settings.checkVisibility
			? this.$element.is(':visible')
			: true;
	};

	/**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @public
	 */
	Owl.prototype.setup = function() {
		var viewport = this.viewport(),
			overwrites = this.options.responsive,
			match = -1,
			settings = null;

		if (!overwrites) {
			settings = $.extend({}, this.options);
		} else {
			$.each(overwrites, function(breakpoint) {
				if (breakpoint <= viewport && breakpoint > match) {
					match = Number(breakpoint);
				}
			});

			settings = $.extend({}, this.options, overwrites[match]);
			if (typeof settings.stagePadding === 'function') {
				settings.stagePadding = settings.stagePadding();
			}
			delete settings.responsive;

			// responsive class
			if (settings.responsiveClass) {
				this.$element.attr('class',
					this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match)
				);
			}
		}

		this.trigger('change', { property: { name: 'settings', value: settings } });
		this._breakpoint = match;
		this.settings = settings;
		this.invalidate('settings');
		this.trigger('changed', { property: { name: 'settings', value: this.settings } });
	};

	/**
	 * Updates option logic if necessery.
	 * @protected
	 */
	Owl.prototype.optionsLogic = function() {
		if (this.settings.autoWidth) {
			this.settings.stagePadding = false;
			this.settings.merge = false;
		}
	};

	/**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
	Owl.prototype.prepare = function(item) {
		var event = this.trigger('prepare', { content: item });

		if (!event.data) {
			event.data = $('<' + this.settings.itemElement + '/>')
				.addClass(this.options.itemClass).append(item)
		}

		this.trigger('prepared', { content: event.data });

		return event.data;
	};

	/**
	 * Updates the view.
	 * @public
	 */
	Owl.prototype.update = function() {
		var i = 0,
			n = this._pipe.length,
			filter = $.proxy(function(p) { return this[p] }, this._invalidated),
			cache = {};

		while (i < n) {
			if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
				this._pipe[i].run(cache);
			}
			i++;
		}

		this._invalidated = {};

		!this.is('valid') && this.enter('valid');
	};

	/**
	 * Gets the width of the view.
	 * @public
	 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
	 * @returns {Number} - The width of the view in pixel.
	 */
	Owl.prototype.width = function(dimension) {
		dimension = dimension || Owl.Width.Default;
		switch (dimension) {
			case Owl.Width.Inner:
			case Owl.Width.Outer:
				return this._width;
			default:
				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
		}
	};

	/**
	 * Refreshes the carousel primarily for adaptive purposes.
	 * @public
	 */
	Owl.prototype.refresh = function() {
		this.enter('refreshing');
		this.trigger('refresh');

		this.setup();

		this.optionsLogic();

		this.$element.addClass(this.options.refreshClass);

		this.update();

		this.$element.removeClass(this.options.refreshClass);

		this.leave('refreshing');
		this.trigger('refreshed');
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onThrottledResize = function() {
		window.clearTimeout(this.resizeTimer);
		this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onResize = function() {
		if (!this._items.length) {
			return false;
		}

		if (this._width === this.$element.width()) {
			return false;
		}

		if (!this.isVisible()) {
			return false;
		}

		this.enter('resizing');

		if (this.trigger('resize').isDefaultPrevented()) {
			this.leave('resizing');
			return false;
		}

		this.invalidate('width');

		this.refresh();

		this.leave('resizing');
		this.trigger('resized');
	};

	/**
	 * Registers event handlers.
	 * @todo Check `msPointerEnabled`
	 * @todo #261
	 * @protected
	 */
	Owl.prototype.registerEventHandlers = function() {
		if ($.support.transition) {
			this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
		}

		if (this.settings.responsive !== false) {
			this.on(window, 'resize', this._handlers.onThrottledResize);
		}

		if (this.settings.mouseDrag) {
			this.$element.addClass(this.options.dragClass);
			this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('dragstart.owl.core selectstart.owl.core', function() { return false });
		}

		if (this.settings.touchDrag){
			this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
		}
	};

	/**
	 * Handles `touchstart` and `mousedown` events.
	 * @todo Horizontal swipe threshold as option
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragStart = function(event) {
		var stage = null;

		if (event.which === 3) {
			return;
		}

		if ($.support.transform) {
			stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
			stage = {
				x: stage[stage.length === 16 ? 12 : 4],
				y: stage[stage.length === 16 ? 13 : 5]
			};
		} else {
			stage = this.$stage.position();
			stage = {
				x: this.settings.rtl ?
					stage.left + this.$stage.width() - this.width() + this.settings.margin :
					stage.left,
				y: stage.top
			};
		}

		if (this.is('animating')) {
			$.support.transform ? this.animate(stage.x) : this.$stage.stop()
			this.invalidate('position');
		}

		this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');

		this.speed(0);

		this._drag.time = new Date().getTime();
		this._drag.target = $(event.target);
		this._drag.stage.start = stage;
		this._drag.stage.current = stage;
		this._drag.pointer = this.pointer(event);

		$(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));

		$(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function(event) {
			var delta = this.difference(this._drag.pointer, this.pointer(event));

			$(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

			if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
				return;
			}

			event.preventDefault();

			this.enter('dragging');
			this.trigger('drag');
		}, this));
	};

	/**
	 * Handles the `touchmove` and `mousemove` events.
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragMove = function(event) {
		var minimum = null,
			maximum = null,
			pull = null,
			delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this.difference(this._drag.stage.start, delta);

		if (!this.is('dragging')) {
			return;
		}

		event.preventDefault();

		if (this.settings.loop) {
			minimum = this.coordinates(this.minimum());
			maximum = this.coordinates(this.maximum() + 1) - minimum;
			stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
		} else {
			minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
			maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
			pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
			stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
		}

		this._drag.stage.current = stage;

		this.animate(stage.x);
	};

	/**
	 * Handles the `touchend` and `mouseup` events.
	 * @todo #261
	 * @todo Threshold for click event
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragEnd = function(event) {
		var delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this._drag.stage.current,
			direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';

		$(document).off('.owl.core');

		this.$element.removeClass(this.options.grabClass);

		if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
			this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
			this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
			this.invalidate('position');
			this.update();

			this._drag.direction = direction;

			if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
				this._drag.target.one('click.owl.core', function() { return false; });
			}
		}

		if (!this.is('dragging')) {
			return;
		}

		this.leave('dragging');
		this.trigger('dragged');
	};

	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @protected
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
	 * @return {Number} - The absolute position of the closest item.
	 */
	Owl.prototype.closest = function(coordinate, direction) {
		var position = -1,
			pull = 30,
			width = this.width(),
			coordinates = this.coordinates();

		if (!this.settings.freeDrag) {
			// check closest item
			$.each(coordinates, $.proxy(function(index, value) {
				// on a left pull, check on current index
				if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
					position = index;
				// on a right pull, check on previous index
				// to do so, subtract width from value and set position = index + 1
				} else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
					position = index + 1;
				} else if (this.op(coordinate, '<', value)
					&& this.op(coordinate, '>', coordinates[index + 1] !== undefined ? coordinates[index + 1] : value - width)) {
					position = direction === 'left' ? index + 1 : index;
				}
				return position === -1;
			}, this));
		}

		if (!this.settings.loop) {
			// non loop boundries
			if (this.op(coordinate, '>', coordinates[this.minimum()])) {
				position = coordinate = this.minimum();
			} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
				position = coordinate = this.maximum();
			}
		}

		return position;
	};

	/**
	 * Animates the stage.
	 * @todo #270
	 * @public
	 * @param {Number} coordinate - The coordinate in pixels.
	 */
	Owl.prototype.animate = function(coordinate) {
		var animate = this.speed() > 0;

		this.is('animating') && this.onTransitionEnd();

		if (animate) {
			this.enter('animating');
			this.trigger('translate');
		}

		if ($.support.transform3d && $.support.transition) {
			this.$stage.css({
				transform: 'translate3d(' + coordinate + 'px,0px,0px)',
				transition: (this.speed() / 1000) + 's' + (
					this.settings.slideTransition ? ' ' + this.settings.slideTransition : ''
				)
			});
		} else if (animate) {
			this.$stage.animate({
				left: coordinate + 'px'
			}, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
		} else {
			this.$stage.css({
				left: coordinate + 'px'
			});
		}
	};

	/**
	 * Checks whether the carousel is in a specific state or not.
	 * @param {String} state - The state to check.
	 * @returns {Boolean} - The flag which indicates if the carousel is busy.
	 */
	Owl.prototype.is = function(state) {
		return this._states.current[state] && this._states.current[state] > 0;
	};

	/**
	 * Sets the absolute position of the current item.
	 * @public
	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
	 * @returns {Number} - The absolute position of the current item.
	 */
	Owl.prototype.current = function(position) {
		if (position === undefined) {
			return this._current;
		}

		if (this._items.length === 0) {
			return undefined;
		}

		position = this.normalize(position);

		if (this._current !== position) {
			var event = this.trigger('change', { property: { name: 'position', value: position } });

			if (event.data !== undefined) {
				position = this.normalize(event.data);
			}

			this._current = position;

			this.invalidate('position');

			this.trigger('changed', { property: { name: 'position', value: this._current } });
		}

		return this._current;
	};

	/**
	 * Invalidates the given part of the update routine.
	 * @param {String} [part] - The part to invalidate.
	 * @returns {Array.<String>} - The invalidated parts.
	 */
	Owl.prototype.invalidate = function(part) {
		if ($.type(part) === 'string') {
			this._invalidated[part] = true;
			this.is('valid') && this.leave('valid');
		}
		return $.map(this._invalidated, function(v, i) { return i });
	};

	/**
	 * Resets the absolute position of the current item.
	 * @public
	 * @param {Number} position - The absolute position of the new item.
	 */
	Owl.prototype.reset = function(position) {
		position = this.normalize(position);

		if (position === undefined) {
			return;
		}

		this._speed = 0;
		this._current = position;

		this.suppress([ 'translate', 'translated' ]);

		this.animate(this.coordinates(position));

		this.release([ 'translate', 'translated' ]);
	};

	/**
	 * Normalizes an absolute or a relative position of an item.
	 * @public
	 * @param {Number} position - The absolute or relative position to normalize.
	 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
	 * @returns {Number} - The normalized position.
	 */
	Owl.prototype.normalize = function(position, relative) {
		var n = this._items.length,
			m = relative ? 0 : this._clones.length;

		if (!this.isNumeric(position) || n < 1) {
			position = undefined;
		} else if (position < 0 || position >= n + m) {
			position = ((position - m / 2) % n + n) % n + m / 2;
		}

		return position;
	};

	/**
	 * Converts an absolute position of an item into a relative one.
	 * @public
	 * @param {Number} position - The absolute position to convert.
	 * @returns {Number} - The converted position.
	 */
	Owl.prototype.relative = function(position) {
		position -= this._clones.length / 2;
		return this.normalize(position, true);
	};

	/**
	 * Gets the maximum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.maximum = function(relative) {
		var settings = this.settings,
			maximum = this._coordinates.length,
			iterator,
			reciprocalItemsWidth,
			elementWidth;

		if (settings.loop) {
			maximum = this._clones.length / 2 + this._items.length - 1;
		} else if (settings.autoWidth || settings.merge) {
			iterator = this._items.length;
			if (iterator) {
				reciprocalItemsWidth = this._items[--iterator].width();
				elementWidth = this.$element.width();
				while (iterator--) {
					reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;
					if (reciprocalItemsWidth > elementWidth) {
						break;
					}
				}
			}
			maximum = iterator + 1;
		} else if (settings.center) {
			maximum = this._items.length - 1;
		} else {
			maximum = this._items.length - settings.items;
		}

		if (relative) {
			maximum -= this._clones.length / 2;
		}

		return Math.max(maximum, 0);
	};

	/**
	 * Gets the minimum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.minimum = function(relative) {
		return relative ? 0 : this._clones.length / 2;
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.items = function(position) {
		if (position === undefined) {
			return this._items.slice();
		}

		position = this.normalize(position, true);
		return this._items[position];
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.mergers = function(position) {
		if (position === undefined) {
			return this._mergers.slice();
		}

		position = this.normalize(position, true);
		return this._mergers[position];
	};

	/**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
	 */
	Owl.prototype.clones = function(position) {
		var odd = this._clones.length / 2,
			even = odd + this._items.length,
			map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

		if (position === undefined) {
			return $.map(this._clones, function(v, i) { return map(i) });
		}

		return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
	};

	/**
	 * Sets the current animation speed.
	 * @public
	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
	 * @returns {Number} - The current animation speed in milliseconds.
	 */
	Owl.prototype.speed = function(speed) {
		if (speed !== undefined) {
			this._speed = speed;
		}

		return this._speed;
	};

	/**
	 * Gets the coordinate of an item.
	 * @todo The name of this method is missleanding.
	 * @public
	 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
	 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
	 */
	Owl.prototype.coordinates = function(position) {
		var multiplier = 1,
			newPosition = position - 1,
			coordinate;

		if (position === undefined) {
			return $.map(this._coordinates, $.proxy(function(coordinate, index) {
				return this.coordinates(index);
			}, this));
		}

		if (this.settings.center) {
			if (this.settings.rtl) {
				multiplier = -1;
				newPosition = position + 1;
			}

			coordinate = this._coordinates[position];
			coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
		} else {
			coordinate = this._coordinates[newPosition] || 0;
		}

		coordinate = Math.ceil(coordinate);

		return coordinate;
	};

	/**
	 * Calculates the speed for a translation.
	 * @protected
	 * @param {Number} from - The absolute position of the start item.
	 * @param {Number} to - The absolute position of the target item.
	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
	 * @returns {Number} - The time in milliseconds for the translation.
	 */
	Owl.prototype.duration = function(from, to, factor) {
		if (factor === 0) {
			return 0;
		}

		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
	};

	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.to = function(position, speed) {
		var current = this.current(),
			revert = null,
			distance = position - this.relative(current),
			direction = (distance > 0) - (distance < 0),
			items = this._items.length,
			minimum = this.minimum(),
			maximum = this.maximum();

		if (this.settings.loop) {
			if (!this.settings.rewind && Math.abs(distance) > items / 2) {
				distance += direction * -1 * items;
			}

			position = current + distance;
			revert = ((position - minimum) % items + items) % items + minimum;

			if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
				current = revert - distance;
				position = revert;
				this.reset(current);
			}
		} else if (this.settings.rewind) {
			maximum += 1;
			position = (position % maximum + maximum) % maximum;
		} else {
			position = Math.max(minimum, Math.min(maximum, position));
		}

		this.speed(this.duration(current, position, speed));
		this.current(position);

		if (this.isVisible()) {
			this.update();
		}
	};

	/**
	 * Slides to the next item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.next = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) + 1, speed);
	};

	/**
	 * Slides to the previous item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.prev = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) - 1, speed);
	};

	/**
	 * Handles the end of an animation.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onTransitionEnd = function(event) {

		// if css2 animation then event object is undefined
		if (event !== undefined) {
			event.stopPropagation();

			// Catch only owl-stage transitionEnd event
			if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
				return false;
			}
		}

		this.leave('animating');
		this.trigger('translated');
	};

	/**
	 * Gets viewport width.
	 * @protected
	 * @return {Number} - The width in pixel.
	 */
	Owl.prototype.viewport = function() {
		var width;
		if (this.options.responsiveBaseElement !== window) {
			width = $(this.options.responsiveBaseElement).width();
		} else if (window.innerWidth) {
			width = window.innerWidth;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
		} else {
			console.warn('Can not detect viewport width.');
		}
		return width;
	};

	/**
	 * Replaces the current content.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The new content.
	 */
	Owl.prototype.replace = function(content) {
		this.$stage.empty();
		this._items = [];

		if (content) {
			content = (content instanceof jQuery) ? content : $(content);
		}

		if (this.settings.nestedItemSelector) {
			content = content.find('.' + this.settings.nestedItemSelector);
		}

		content.filter(function() {
			return this.nodeType === 1;
		}).each($.proxy(function(index, item) {
			item = this.prepare(item);
			this.$stage.append(item);
			this._items.push(item);
			this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		}, this));

		this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
	};

	/**
	 * Adds an item.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The item content to add.
	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
	 */
	Owl.prototype.add = function(content, position) {
		var current = this.relative(this._current);

		position = position === undefined ? this._items.length : this.normalize(position, true);
		content = content instanceof jQuery ? content : $(content);

		this.trigger('add', { content: content, position: position });

		content = this.prepare(content);

		if (this._items.length === 0 || position === this._items.length) {
			this._items.length === 0 && this.$stage.append(content);
			this._items.length !== 0 && this._items[position - 1].after(content);
			this._items.push(content);
			this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		} else {
			this._items[position].before(content);
			this._items.splice(position, 0, content);
			this._mergers.splice(position, 0, content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		}

		this._items[current] && this.reset(this._items[current].index());

		this.invalidate('items');

		this.trigger('added', { content: content, position: position });
	};

	/**
	 * Removes an item by its position.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {Number} position - The relative position of the item to remove.
	 */
	Owl.prototype.remove = function(position) {
		position = this.normalize(position, true);

		if (position === undefined) {
			return;
		}

		this.trigger('remove', { content: this._items[position], position: position });

		this._items[position].remove();
		this._items.splice(position, 1);
		this._mergers.splice(position, 1);

		this.invalidate('items');

		this.trigger('removed', { content: null, position: position });
	};

	/**
	 * Preloads images with auto width.
	 * @todo Replace by a more generic approach
	 * @protected
	 */
	Owl.prototype.preloadAutoWidthImages = function(images) {
		images.each($.proxy(function(i, element) {
			this.enter('pre-loading');
			element = $(element);
			$(new Image()).one('load', $.proxy(function(e) {
				element.attr('src', e.target.src);
				element.css('opacity', 1);
				this.leave('pre-loading');
				!this.is('pre-loading') && !this.is('initializing') && this.refresh();
			}, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
		}, this));
	};

	/**
	 * Destroys the carousel.
	 * @public
	 */
	Owl.prototype.destroy = function() {

		this.$element.off('.owl.core');
		this.$stage.off('.owl.core');
		$(document).off('.owl.core');

		if (this.settings.responsive !== false) {
			window.clearTimeout(this.resizeTimer);
			this.off(window, 'resize', this._handlers.onThrottledResize);
		}

		for (var i in this._plugins) {
			this._plugins[i].destroy();
		}

		this.$stage.children('.cloned').remove();

		this.$stage.unwrap();
		this.$stage.children().contents().unwrap();
		this.$stage.children().unwrap();
		this.$stage.remove();
		this.$element
			.removeClass(this.options.refreshClass)
			.removeClass(this.options.loadingClass)
			.removeClass(this.options.loadedClass)
			.removeClass(this.options.rtlClass)
			.removeClass(this.options.dragClass)
			.removeClass(this.options.grabClass)
			.attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
			.removeData('owl.carousel');
	};

	/**
	 * Operators to calculate right-to-left and left-to-right.
	 * @protected
	 * @param {Number} [a] - The left side operand.
	 * @param {String} [o] - The operator.
	 * @param {Number} [b] - The right side operand.
	 */
	Owl.prototype.op = function(a, o, b) {
		var rtl = this.settings.rtl;
		switch (o) {
			case '<':
				return rtl ? a > b : a < b;
			case '>':
				return rtl ? a < b : a > b;
			case '>=':
				return rtl ? a <= b : a >= b;
			case '<=':
				return rtl ? a >= b : a <= b;
			default:
				break;
		}
	};

	/**
	 * Attaches to an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
	Owl.prototype.on = function(element, event, listener, capture) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, capture);
		} else if (element.attachEvent) {
			element.attachEvent('on' + event, listener);
		}
	};

	/**
	 * Detaches from an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
	Owl.prototype.off = function(element, event, listener, capture) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, capture);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, listener);
		}
	};

	/**
	 * Triggers a public event.
	 * @todo Remove `status`, `relatedTarget` should be used instead.
	 * @protected
	 * @param {String} name - The event name.
	 * @param {*} [data=null] - The event data.
	 * @param {String} [namespace=carousel] - The event namespace.
	 * @param {String} [state] - The state which is associated with the event.
	 * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
	 * @returns {Event} - The event arguments.
	 */
	Owl.prototype.trigger = function(name, data, namespace, state, enter) {
		var status = {
			item: { count: this._items.length, index: this.current() }
		}, handler = $.camelCase(
			$.grep([ 'on', name, namespace ], function(v) { return v })
				.join('-').toLowerCase()
		), event = $.Event(
			[ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
			$.extend({ relatedTarget: this }, status, data)
		);

		if (!this._supress[name]) {
			$.each(this._plugins, function(name, plugin) {
				if (plugin.onTrigger) {
					plugin.onTrigger(event);
				}
			});

			this.register({ type: Owl.Type.Event, name: name });
			this.$element.trigger(event);

			if (this.settings && typeof this.settings[handler] === 'function') {
				this.settings[handler].call(this, event);
			}
		}

		return event;
	};

	/**
	 * Enters a state.
	 * @param name - The state name.
	 */
	Owl.prototype.enter = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			if (this._states.current[name] === undefined) {
				this._states.current[name] = 0;
			}

			this._states.current[name]++;
		}, this));
	};

	/**
	 * Leaves a state.
	 * @param name - The state name.
	 */
	Owl.prototype.leave = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			this._states.current[name]--;
		}, this));
	};

	/**
	 * Registers an event or state.
	 * @public
	 * @param {Object} object - The event or state to register.
	 */
	Owl.prototype.register = function(object) {
		if (object.type === Owl.Type.Event) {
			if (!$.event.special[object.name]) {
				$.event.special[object.name] = {};
			}

			if (!$.event.special[object.name].owl) {
				var _default = $.event.special[object.name]._default;
				$.event.special[object.name]._default = function(e) {
					if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
						return _default.apply(this, arguments);
					}
					return e.namespace && e.namespace.indexOf('owl') > -1;
				};
				$.event.special[object.name].owl = true;
			}
		} else if (object.type === Owl.Type.State) {
			if (!this._states.tags[object.name]) {
				this._states.tags[object.name] = object.tags;
			} else {
				this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
			}

			this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function(tag, i) {
				return $.inArray(tag, this._states.tags[object.name]) === i;
			}, this));
		}
	};

	/**
	 * Suppresses events.
	 * @protected
	 * @param {Array.<String>} events - The events to suppress.
	 */
	Owl.prototype.suppress = function(events) {
		$.each(events, $.proxy(function(index, event) {
			this._supress[event] = true;
		}, this));
	};

	/**
	 * Releases suppressed events.
	 * @protected
	 * @param {Array.<String>} events - The events to release.
	 */
	Owl.prototype.release = function(events) {
		$.each(events, $.proxy(function(index, event) {
			delete this._supress[event];
		}, this));
	};

	/**
	 * Gets unified pointer coordinates from event.
	 * @todo #261
	 * @protected
	 * @param {Event} - The `mousedown` or `touchstart` event.
	 * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
	 */
	Owl.prototype.pointer = function(event) {
		var result = { x: null, y: null };

		event = event.originalEvent || event || window.event;

		event = event.touches && event.touches.length ?
			event.touches[0] : event.changedTouches && event.changedTouches.length ?
				event.changedTouches[0] : event;

		if (event.pageX) {
			result.x = event.pageX;
			result.y = event.pageY;
		} else {
			result.x = event.clientX;
			result.y = event.clientY;
		}

		return result;
	};

	/**
	 * Determines if the input is a Number or something that can be coerced to a Number
	 * @protected
	 * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
	 * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
	 */
	Owl.prototype.isNumeric = function(number) {
		return !isNaN(parseFloat(number));
	};

	/**
	 * Gets the difference of two vectors.
	 * @todo #261
	 * @protected
	 * @param {Object} - The first vector.
	 * @param {Object} - The second vector.
	 * @returns {Object} - The difference.
	 */
	Owl.prototype.difference = function(first, second) {
		return {
			x: first.x - second.x,
			y: first.y - second.y
		};
	};

	/**
	 * The jQuery Plugin for the Owl Carousel
	 * @todo Navigation plugin `next` and `prev`
	 * @public
	 */
	$.fn.owlCarousel = function(option) {
		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function() {
			var $this = $(this),
				data = $this.data('owl.carousel');

			if (!data) {
				data = new Owl(this, typeof option == 'object' && option);
				$this.data('owl.carousel', data);

				$.each([
					'next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'
				], function(i, event) {
					data.register({ type: Owl.Type.Event, name: event });
					data.$element.on(event + '.owl.carousel.core', $.proxy(function(e) {
						if (e.namespace && e.relatedTarget !== this) {
							this.suppress([ event ]);
							data[event].apply(this, [].slice.call(arguments, 1));
							this.release([ event ]);
						}
					}, data));
				});
			}

			if (typeof option == 'string' && option.charAt(0) !== '_') {
				data[option].apply(data, args);
			}
		});
	};

	/**
	 * The constructor for the jQuery Plugin
	 * @public
	 */
	$.fn.owlCarousel.Constructor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoRefresh Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto refresh plugin.
	 * @class The Auto Refresh Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoRefresh = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Refresh interval.
		 * @protected
		 * @type {number}
		 */
		this._interval = null;

		/**
		 * Whether the element is currently visible or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._visible = null;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoRefresh) {
					this.watch();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoRefresh.Defaults = {
		autoRefresh: true,
		autoRefreshInterval: 500
	};

	/**
	 * Watches the element.
	 */
	AutoRefresh.prototype.watch = function() {
		if (this._interval) {
			return;
		}

		this._visible = this._core.isVisible();
		this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
	};

	/**
	 * Refreshes the element.
	 */
	AutoRefresh.prototype.refresh = function() {
		if (this._core.isVisible() === this._visible) {
			return;
		}

		this._visible = !this._visible;

		this._core.$element.toggleClass('owl-hidden', !this._visible);

		this._visible && (this._core.invalidate('width') && this._core.refresh());
	};

	/**
	 * Destroys the plugin.
	 */
	AutoRefresh.prototype.destroy = function() {
		var handler, property;

		window.clearInterval(this._interval);

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the lazy plugin.
	 * @class The Lazy Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Lazy = function(carousel) {

		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Already loaded items.
		 * @protected
		 * @type {Array.<jQuery>}
		 */
		this._loaded = [];

		/**
		 * Event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				if (!this._core.settings || !this._core.settings.lazyLoad) {
					return;
				}

				if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
					var settings = this._core.settings,
						n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
						i = ((settings.center && n * -1) || 0),
						position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
						clones = this._core.clones().length,
						load = $.proxy(function(i, v) { this.load(v) }, this);
					//TODO: Need documentation for this new option
					if (settings.lazyLoadEager > 0) {
						n += settings.lazyLoadEager;
						// If the carousel is looping also preload images that are to the "left"
						if (settings.loop) {
              position -= settings.lazyLoadEager;
              n++;
            }
					}

					while (i++ < n) {
						this.load(clones / 2 + this._core.relative(position));
						clones && $.each(this._core.clones(this._core.relative(position)), load);
						position++;
					}
				}
			}, this)
		};

		// set the default options
		this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

		// register event handler
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Lazy.Defaults = {
		lazyLoad: false,
		lazyLoadEager: 0
	};

	/**
	 * Loads all resources of an item at the specified position.
	 * @param {Number} position - The absolute position of the item.
	 * @protected
	 */
	Lazy.prototype.load = function(position) {
		var $item = this._core.$stage.children().eq(position),
			$elements = $item && $item.find('.owl-lazy');

		if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
			return;
		}

		$elements.each($.proxy(function(index, element) {
			var $element = $(element), image,
                url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src') || $element.attr('data-srcset');

			this._core.trigger('load', { element: $element, url: url }, 'lazy');

			if ($element.is('img')) {
				$element.one('load.owl.lazy', $.proxy(function() {
					$element.css('opacity', 1);
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this)).attr('src', url);
            } else if ($element.is('source')) {
                $element.one('load.owl.lazy', $.proxy(function() {
                    this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
                }, this)).attr('srcset', url);
			} else {
				image = new Image();
				image.onload = $.proxy(function() {
					$element.css({
						'background-image': 'url("' + url + '")',
						'opacity': '1'
					});
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this);
				image.src = url;
			}
		}, this));

		this._loaded.push($item.get(0));
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Lazy.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this._core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto height plugin.
	 * @class The Auto Height Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoHeight = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		this._previousHeight = null;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight) {
					this.update();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight && e.property.name === 'position'){
					this.update();
				}
			}, this),
			'loaded.owl.lazy': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight
					&& e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
					this.update();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
		this._intervalId = null;
		var refThis = this;

		// These changes have been taken from a PR by gavrochelegnou proposed in #1575
		// and have been made compatible with the latest jQuery version
		$(window).on('load', function() {
			if (refThis._core.settings.autoHeight) {
				refThis.update();
			}
		});

		// Autoresize the height of the carousel when window is resized
		// When carousel has images, the height is dependent on the width
		// and should also change on resize
		$(window).resize(function() {
			if (refThis._core.settings.autoHeight) {
				if (refThis._intervalId != null) {
					clearTimeout(refThis._intervalId);
				}

				refThis._intervalId = setTimeout(function() {
					refThis.update();
				}, 250);
			}
		});

	};

	/**
	 * Default options.
	 * @public
	 */
	AutoHeight.Defaults = {
		autoHeight: false,
		autoHeightClass: 'owl-height'
	};

	/**
	 * Updates the view.
	 */
	AutoHeight.prototype.update = function() {
		var start = this._core._current,
			end = start + this._core.settings.items,
			lazyLoadEnabled = this._core.settings.lazyLoad,
			visible = this._core.$stage.children().toArray().slice(start, end),
			heights = [],
			maxheight = 0;

		$.each(visible, function(index, item) {
			heights.push($(item).height());
		});

		maxheight = Math.max.apply(null, heights);

		if (maxheight <= 1 && lazyLoadEnabled && this._previousHeight) {
			maxheight = this._previousHeight;
		}

		this._previousHeight = maxheight;

		this._core.$stage.parent()
			.height(maxheight)
			.addClass(this._core.settings.autoHeightClass);
	};

	AutoHeight.prototype.destroy = function() {
		var handler, property;

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] !== 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the video plugin.
	 * @class The Video Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Video = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Cache all video URLs.
		 * @protected
		 * @type {Object}
		 */
		this._videos = {};

		/**
		 * Current playing item.
		 * @protected
		 * @type {jQuery}
		 */
		this._playing = null;

		/**
		 * All event handlers.
		 * @todo The cloned content removale is too late
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this._core.register({ type: 'state', name: 'playing', tags: [ 'interacting' ] });
				}
			}, this),
			'resize.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
					e.preventDefault();
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.is('resizing')) {
					this._core.$stage.find('.cloned .owl-video-frame').remove();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position' && this._playing) {
					this.stop();
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				var $element = $(e.content).find('.owl-video');

				if ($element.length) {
					$element.css('display', 'none');
					this.fetch($element, $(e.content));
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Video.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);

		this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
			this.play(e);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Video.Defaults = {
		video: false,
		videoHeight: false,
		videoWidth: false
	};

	/**
	 * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {jQuery} item - The item containing the video.
	 */
	Video.prototype.fetch = function(target, item) {
			var type = (function() {
					if (target.attr('data-vimeo-id')) {
						return 'vimeo';
					} else if (target.attr('data-vzaar-id')) {
						return 'vzaar'
					} else {
						return 'youtube';
					}
				})(),
				id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
				width = target.attr('data-width') || this._core.settings.videoWidth,
				height = target.attr('data-height') || this._core.settings.videoHeight,
				url = target.attr('href');

		if (url) {

			/*
					Parses the id's out of the following urls (and probably more):
					https://www.youtube.com/watch?v=:id
					https://youtu.be/:id
					https://vimeo.com/:id
					https://vimeo.com/channels/:channel/:id
					https://vimeo.com/groups/:group/videos/:id
					https://app.vzaar.com/videos/:id

					Visual example: https://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
			*/

			id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

			if (id[3].indexOf('youtu') > -1) {
				type = 'youtube';
			} else if (id[3].indexOf('vimeo') > -1) {
				type = 'vimeo';
			} else if (id[3].indexOf('vzaar') > -1) {
				type = 'vzaar';
			} else {
				throw new Error('Video URL not supported.');
			}
			id = id[6];
		} else {
			throw new Error('Missing video URL.');
		}

		this._videos[url] = {
			type: type,
			id: id,
			width: width,
			height: height
		};

		item.attr('data-video', url);

		this.thumbnail(target, this._videos[url]);
	};

	/**
	 * Creates video thumbnail.
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {Object} info - The video info object.
	 * @see `fetch`
	 */
	Video.prototype.thumbnail = function(target, video) {
		var tnLink,
			icon,
			path,
			dimensions = video.width && video.height ? 'width:' + video.width + 'px;height:' + video.height + 'px;' : '',
			customTn = target.find('img'),
			srcType = 'src',
			lazyClass = '',
			settings = this._core.settings,
			create = function(path) {
				icon = '<div class="owl-video-play-icon"></div>';

				if (settings.lazyLoad) {
					tnLink = $('<div/>',{
						"class": 'owl-video-tn ' + lazyClass,
						"srcType": path
					});
				} else {
					tnLink = $( '<div/>', {
						"class": "owl-video-tn",
						"style": 'opacity:1;background-image:url(' + path + ')'
					});
				}
				target.after(tnLink);
				target.after(icon);
			};

		// wrap video content into owl-video-wrapper div
		target.wrap( $( '<div/>', {
			"class": "owl-video-wrapper",
			"style": dimensions
		}));

		if (this._core.settings.lazyLoad) {
			srcType = 'data-src';
			lazyClass = 'owl-lazy';
		}

		// custom thumbnail
		if (customTn.length) {
			create(customTn.attr(srcType));
			customTn.remove();
			return false;
		}

		if (video.type === 'youtube') {
			path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
			create(path);
		} else if (video.type === 'vimeo') {
			$.ajax({
				type: 'GET',
				url: '//vimeo.com/api/v2/video/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data[0].thumbnail_large;
					create(path);
				}
			});
		} else if (video.type === 'vzaar') {
			$.ajax({
				type: 'GET',
				url: '//vzaar.com/api/videos/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data.framegrab_url;
					create(path);
				}
			});
		}
	};

	/**
	 * Stops the current video.
	 * @public
	 */
	Video.prototype.stop = function() {
		this._core.trigger('stop', null, 'video');
		this._playing.find('.owl-video-frame').remove();
		this._playing.removeClass('owl-video-playing');
		this._playing = null;
		this._core.leave('playing');
		this._core.trigger('stopped', null, 'video');
	};

	/**
	 * Starts the current video.
	 * @public
	 * @param {Event} event - The event arguments.
	 */
	Video.prototype.play = function(event) {
		var target = $(event.target),
			item = target.closest('.' + this._core.settings.itemClass),
			video = this._videos[item.attr('data-video')],
			width = video.width || '100%',
			height = video.height || this._core.$stage.height(),
			html,
			iframe;

		if (this._playing) {
			return;
		}

		this._core.enter('playing');
		this._core.trigger('play', null, 'video');

		item = this._core.items(this._core.relative(item.index()));

		this._core.reset(item.index());

		html = $( '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>' );
		html.attr( 'height', height );
		html.attr( 'width', width );
		if (video.type === 'youtube') {
			html.attr( 'src', '//www.youtube.com/embed/' + video.id + '?autoplay=1&rel=0&v=' + video.id );
		} else if (video.type === 'vimeo') {
			html.attr( 'src', '//player.vimeo.com/video/' + video.id + '?autoplay=1' );
		} else if (video.type === 'vzaar') {
			html.attr( 'src', '//view.vzaar.com/' + video.id + '/player?autoplay=true' );
		}

		iframe = $(html).wrap( '<div class="owl-video-frame" />' ).insertAfter(item.find('.owl-video'));

		this._playing = item.addClass('owl-video-playing');
	};

	/**
	 * Checks whether an video is currently in full screen mode or not.
	 * @todo Bad style because looks like a readonly method but changes members.
	 * @protected
	 * @returns {Boolean}
	 */
	Video.prototype.isInFullScreen = function() {
		var element = document.fullscreenElement || document.mozFullScreenElement ||
				document.webkitFullscreenElement;

		return element && $(element).parent().hasClass('owl-video-frame');
	};

	/**
	 * Destroys the plugin.
	 */
	Video.prototype.destroy = function() {
		var handler, property;

		this._core.$element.off('click.owl.video');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the animate plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Animate = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Animate.Defaults, this.core.options);
		this.swapping = true;
		this.previous = undefined;
		this.next = undefined;

		this.handlers = {
			'change.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.previous = this.core.current();
					this.next = e.property.value;
				}
			}, this),
			'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this.swapping = e.type == 'translated';
				}
			}, this),
			'translate.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
					this.swap();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Animate.Defaults = {
		animateOut: false,
		animateIn: false
	};

	/**
	 * Toggles the animation classes whenever an translations starts.
	 * @protected
	 * @returns {Boolean|undefined}
	 */
	Animate.prototype.swap = function() {

		if (this.core.settings.items !== 1) {
			return;
		}

		if (!$.support.animation || !$.support.transition) {
			return;
		}

		this.core.speed(0);

		var left,
			clear = $.proxy(this.clear, this),
			previous = this.core.$stage.children().eq(this.previous),
			next = this.core.$stage.children().eq(this.next),
			incoming = this.core.settings.animateIn,
			outgoing = this.core.settings.animateOut;

		if (this.core.current() === this.previous) {
			return;
		}

		if (outgoing) {
			left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
			previous.one($.support.animation.end, clear)
				.css( { 'left': left + 'px' } )
				.addClass('animated owl-animated-out')
				.addClass(outgoing);
		}

		if (incoming) {
			next.one($.support.animation.end, clear)
				.addClass('animated owl-animated-in')
				.addClass(incoming);
		}
	};

	Animate.prototype.clear = function(e) {
		$(e.target).css( { 'left': '' } )
			.removeClass('animated owl-animated-out owl-animated-in')
			.removeClass(this.core.settings.animateIn)
			.removeClass(this.core.settings.animateOut);
		this.core.onTransitionEnd();
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Animate.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @author Tom De Caluwé
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the autoplay plugin.
	 * @class The Autoplay Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Autoplay = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * The autoplay timeout id.
		 * @type {Number}
		 */
		this._call = null;

		/**
		 * Depending on the state of the plugin, this variable contains either
		 * the start time of the timer or the current timer value if it's
		 * paused. Since we start in a paused state we initialize the timer
		 * value.
		 * @type {Number}
		 */
		this._time = 0;

		/**
		 * Stores the timeout currently used.
		 * @type {Number}
		 */
		this._timeout = 0;

		/**
		 * Indicates whenever the autoplay is paused.
		 * @type {Boolean}
		 */
		this._paused = true;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'settings') {
					if (this._core.settings.autoplay) {
						this.play();
					} else {
						this.stop();
					}
				} else if (e.namespace && e.property.name === 'position' && this._paused) {
					// Reset the timer. This code is triggered when the position
					// of the carousel was changed through user interaction.
					this._time = 0;
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoplay) {
					this.play();
				}
			}, this),
			'play.owl.autoplay': $.proxy(function(e, t, s) {
				if (e.namespace) {
					this.play(t, s);
				}
			}, this),
			'stop.owl.autoplay': $.proxy(function(e) {
				if (e.namespace) {
					this.stop();
				}
			}, this),
			'mouseover.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'mouseleave.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.play();
				}
			}, this),
			'touchstart.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'touchend.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause) {
					this.play();
				}
			}, this)
		};

		// register event handlers
		this._core.$element.on(this._handlers);

		// set default options
		this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
	};

	/**
	 * Default options.
	 * @public
	 */
	Autoplay.Defaults = {
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		autoplaySpeed: false
	};

	/**
	 * Transition to the next slide and set a timeout for the next transition.
	 * @private
	 * @param {Number} [speed] - The animation speed for the animations.
	 */
	Autoplay.prototype._next = function(speed) {
		this._call = window.setTimeout(
			$.proxy(this._next, this, speed),
			this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()
		);

		if (this._core.is('interacting') || document.hidden) {
			return;
		}
		this._core.next(speed || this._core.settings.autoplaySpeed);
	}

	/**
	 * Reads the current timer value when the timer is playing.
	 * @public
	 */
	Autoplay.prototype.read = function() {
		return new Date().getTime() - this._time;
	};

	/**
	 * Starts the autoplay.
	 * @public
	 * @param {Number} [timeout] - The interval before the next animation starts.
	 * @param {Number} [speed] - The animation speed for the animations.
	 */
	Autoplay.prototype.play = function(timeout, speed) {
		var elapsed;

		if (!this._core.is('rotating')) {
			this._core.enter('rotating');
		}

		timeout = timeout || this._core.settings.autoplayTimeout;

		// Calculate the elapsed time since the last transition. If the carousel
		// wasn't playing this calculation will yield zero.
		elapsed = Math.min(this._time % (this._timeout || timeout), timeout);

		if (this._paused) {
			// Start the clock.
			this._time = this.read();
			this._paused = false;
		} else {
			// Clear the active timeout to allow replacement.
			window.clearTimeout(this._call);
		}

		// Adjust the origin of the timer to match the new timeout value.
		this._time += this.read() % timeout - elapsed;

		this._timeout = timeout;
		this._call = window.setTimeout($.proxy(this._next, this, speed), timeout - elapsed);
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.stop = function() {
		if (this._core.is('rotating')) {
			// Reset the clock.
			this._time = 0;
			this._paused = true;

			window.clearTimeout(this._call);
			this._core.leave('rotating');
		}
	};

	/**
	 * Pauses the autoplay.
	 * @public
	 */
	Autoplay.prototype.pause = function() {
		if (this._core.is('rotating') && !this._paused) {
			// Pause the clock.
			this._time = this.read();
			this._paused = true;

			window.clearTimeout(this._call);
		}
	};

	/**
	 * Destroys the plugin.
	 */
	Autoplay.prototype.destroy = function() {
		var handler, property;

		this.stop();

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the navigation plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} carousel - The Owl Carousel.
	 */
	var Navigation = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Indicates whether the plugin is initialized or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._initialized = false;

		/**
		 * The current paging indexes.
		 * @protected
		 * @type {Array}
		 */
		this._pages = [];

		/**
		 * All DOM elements of the user interface.
		 * @protected
		 * @type {Object}
		 */
		this._controls = {};

		/**
		 * Markup for an indicator.
		 * @protected
		 * @type {Array.<String>}
		 */
		this._templates = [];

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * Overridden methods of the carousel.
		 * @protected
		 * @type {Object}
		 */
		this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		};

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.push('<div class="' + this._core.settings.dotClass + '">' +
						$(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
				}
			}, this),
			'added.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 0, this._templates.pop());
				}
			}, this),
			'remove.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 1);
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.draw();
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && !this._initialized) {
					this._core.trigger('initialize', null, 'navigation');
					this.initialize();
					this.update();
					this.draw();
					this._initialized = true;
					this._core.trigger('initialized', null, 'navigation');
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._initialized) {
					this._core.trigger('refresh', null, 'navigation');
					this.update();
					this.draw();
					this._core.trigger('refreshed', null, 'navigation');
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

		// register event handlers
		this.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 * @todo Rename `slideBy` to `navBy`
	 */
	Navigation.Defaults = {
		nav: false,
		navText: [
			'<span aria-label="' + 'Previous' + '">&#x2039;</span>',
			'<span aria-label="' + 'Next' + '">&#x203a;</span>'
		],
		navSpeed: false,
		navElement: 'button type="button" role="presentation"',
		navContainer: false,
		navContainerClass: 'owl-nav',
		navClass: [
			'owl-prev',
			'owl-next'
		],
		slideBy: 1,
		dotClass: 'owl-dot',
		dotsClass: 'owl-dots',
		dots: true,
		dotsEach: false,
		dotsData: false,
		dotsSpeed: false,
		dotsContainer: false
	};

	/**
	 * Initializes the layout of the plugin and extends the carousel.
	 * @protected
	 */
	Navigation.prototype.initialize = function() {
		var override,
			settings = this._core.settings;

		// create DOM structure for relative navigation
		this._controls.$relative = (settings.navContainer ? $(settings.navContainer)
			: $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$previous = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[0])
			.html(settings.navText[0])
			.prependTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.prev(settings.navSpeed);
			}, this));
		this._controls.$next = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[1])
			.html(settings.navText[1])
			.appendTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.next(settings.navSpeed);
			}, this));

		// create DOM structure for absolute navigation
		if (!settings.dotsData) {
			this._templates = [ $('<button role="button">')
				.addClass(settings.dotClass)
				.append($('<span>'))
				.prop('outerHTML') ];
		}

		this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer)
			: $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$absolute.on('click', 'button', $.proxy(function(e) {
			var index = $(e.target).parent().is(this._controls.$absolute)
				? $(e.target).index() : $(e.target).parent().index();

			e.preventDefault();

			this.to(index, settings.dotsSpeed);
		}, this));

		/*$el.on('focusin', function() {
			$(document).off(".carousel");

			$(document).on('keydown.carousel', function(e) {
				if(e.keyCode == 37) {
					$el.trigger('prev.owl')
				}
				if(e.keyCode == 39) {
					$el.trigger('next.owl')
				}
			});
		});*/

		// override public methods of the carousel
		for (override in this._overrides) {
			this._core[override] = $.proxy(this[override], this);
		}
	};

	/**
	 * Destroys the plugin.
	 * @protected
	 */
	Navigation.prototype.destroy = function() {
		var handler, control, property, override, settings;
		settings = this._core.settings;

		for (handler in this._handlers) {
			this.$element.off(handler, this._handlers[handler]);
		}
		for (control in this._controls) {
			if (control === '$relative' && settings.navContainer) {
				this._controls[control].html('');
			} else {
				this._controls[control].remove();
			}
		}
		for (override in this.overides) {
			this._core[override] = this._overrides[override];
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	/**
	 * Updates the internal state.
	 * @protected
	 */
	Navigation.prototype.update = function() {
		var i, j, k,
			lower = this._core.clones().length / 2,
			upper = lower + this._core.items().length,
			maximum = this._core.maximum(true),
			settings = this._core.settings,
			size = settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items;

		if (settings.slideBy !== 'page') {
			settings.slideBy = Math.min(settings.slideBy, settings.items);
		}

		if (settings.dots || settings.slideBy == 'page') {
			this._pages = [];

			for (i = lower, j = 0, k = 0; i < upper; i++) {
				if (j >= size || j === 0) {
					this._pages.push({
						start: Math.min(maximum, i - lower),
						end: i - lower + size - 1
					});
					if (Math.min(maximum, i - lower) === maximum) {
						break;
					}
					j = 0, ++k;
				}
				j += this._core.mergers(this._core.relative(i));
			}
		}
	};

	/**
	 * Draws the user interface.
	 * @todo The option `dotsData` wont work.
	 * @protected
	 */
	Navigation.prototype.draw = function() {
		var difference,
			settings = this._core.settings,
			disabled = this._core.items().length <= settings.items,
			index = this._core.relative(this._core.current()),
			loop = settings.loop || settings.rewind;

		this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

		if (settings.nav) {
			this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
			this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
		}

		this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

		if (settings.dots) {
			difference = this._pages.length - this._controls.$absolute.children().length;

			if (settings.dotsData && difference !== 0) {
				this._controls.$absolute.html(this._templates.join(''));
			} else if (difference > 0) {
				this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
			} else if (difference < 0) {
				this._controls.$absolute.children().slice(difference).remove();
			}

			this._controls.$absolute.find('.active').removeClass('active');
			this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
		}
	};

	/**
	 * Extends event data.
	 * @protected
	 * @param {Event} event - The event object which gets thrown.
	 */
	Navigation.prototype.onTrigger = function(event) {
		var settings = this._core.settings;

		event.page = {
			index: $.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: settings && (settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items)
		};
	};

	/**
	 * Gets the current page position of the carousel.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.current = function() {
		var current = this._core.relative(this._core.current());
		return $.grep(this._pages, $.proxy(function(page, index) {
			return page.start <= current && page.end >= current;
		}, this)).pop();
	};

	/**
	 * Gets the current succesor/predecessor position.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.getPosition = function(successor) {
		var position, length,
			settings = this._core.settings;

		if (settings.slideBy == 'page') {
			position = $.inArray(this.current(), this._pages);
			length = this._pages.length;
			successor ? ++position : --position;
			position = this._pages[((position % length) + length) % length].start;
		} else {
			position = this._core.relative(this._core.current());
			length = this._core.items().length;
			successor ? position += settings.slideBy : position -= settings.slideBy;
		}

		return position;
	};

	/**
	 * Slides to the next item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.next = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
	};

	/**
	 * Slides to the previous item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.prev = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
	};

	/**
	 * Slides to the specified item or page.
	 * @public
	 * @param {Number} position - The position of the item or page.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
	 */
	Navigation.prototype.to = function(position, speed, standard) {
		var length;

		if (!standard && this._pages.length) {
			length = this._pages.length;
			$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
		} else {
			$.proxy(this._overrides.to, this._core)(position, speed);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the hash plugin.
	 * @class The Hash Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Hash = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Hash index for the items.
		 * @protected
		 * @type {Object}
		 */
		this._hashes = {};

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.startPosition === 'URLHash') {
					$(window).trigger('hashchange.owl.navigation');
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');

					if (!hash) {
						return;
					}

					this._hashes[hash] = e.content;
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position') {
					var current = this._core.items(this._core.relative(this._core.current())),
						hash = $.map(this._hashes, function(item, hash) {
							return item === current ? hash : null;
						}).join();

					if (!hash || window.location.hash.slice(1) === hash) {
						return;
					}

					window.location.hash = hash;
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Hash.Defaults, this._core.options);

		// register the event handlers
		this.$element.on(this._handlers);

		// register event listener for hash navigation
		$(window).on('hashchange.owl.navigation', $.proxy(function(e) {
			var hash = window.location.hash.substring(1),
				items = this._core.$stage.children(),
				position = this._hashes[hash] && items.index(this._hashes[hash]);

			if (position === undefined || position === this._core.current()) {
				return;
			}

			this._core.to(this._core.relative(position), false, true);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Hash.Defaults = {
		URLhashListener: false
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Hash.prototype.destroy = function() {
		var handler, property;

		$(window).off('hashchange.owl.navigation');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

/**
 * Support Plugin
 *
 * @version 2.3.4
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	var style = $('<support>').get(0).style,
		prefixes = 'Webkit Moz O ms'.split(' '),
		events = {
			transition: {
				end: {
					WebkitTransition: 'webkitTransitionEnd',
					MozTransition: 'transitionend',
					OTransition: 'oTransitionEnd',
					transition: 'transitionend'
				}
			},
			animation: {
				end: {
					WebkitAnimation: 'webkitAnimationEnd',
					MozAnimation: 'animationend',
					OAnimation: 'oAnimationEnd',
					animation: 'animationend'
				}
			}
		},
		tests = {
			csstransforms: function() {
				return !!test('transform');
			},
			csstransforms3d: function() {
				return !!test('perspective');
			},
			csstransitions: function() {
				return !!test('transition');
			},
			cssanimations: function() {
				return !!test('animation');
			}
		};

	function test(property, prefixed) {
		var result = false,
			upper = property.charAt(0).toUpperCase() + property.slice(1);

		$.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function(i, property) {
			if (style[property] !== undefined) {
				result = prefixed ? property : true;
				return false;
			}
		});

		return result;
	}

	function prefixed(property) {
		return test(property, true);
	}

	if (tests.csstransitions()) {
		/* jshint -W053 */
		$.support.transition = new String(prefixed('transition'))
		$.support.transition.end = events.transition.end[ $.support.transition ];
	}

	if (tests.cssanimations()) {
		/* jshint -W053 */
		$.support.animation = new String(prefixed('animation'))
		$.support.animation.end = events.animation.end[ $.support.animation ];
	}

	if (tests.csstransforms()) {
		/* jshint -W053 */
		$.support.transform = new String(prefixed('transform'));
		$.support.transform3d = tests.csstransforms3d();
	}

})(window.Zepto || window.jQuery, window, document);


/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(86);


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(87)
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
Component.options.__file = "resources/assets/js/vue/pages/home.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3bc939a5", Component.options)
  } else {
    hotAPI.reload("data-v-3bc939a5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_pages_home_homeComponent_vue__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_pages_home_homeComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_pages_home_homeComponent_vue__);



var app = new Vue({
  el: "#homeC",
  name: 'homeC',
  data: {},
  components: {
    homeComponent: __WEBPACK_IMPORTED_MODULE_0__components_pages_home_homeComponent_vue___default.a
  }
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(89)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(91)
/* template */
var __vue_template__ = __webpack_require__(101)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
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
Component.options.__file = "resources/assets/js/components/pages/home/homeComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-00655070", Component.options)
  } else {
    hotAPI.reload("data-v-00655070", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(90);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3331a510", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-00655070\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./homeComponent.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-00655070\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./homeComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.filter {\n  font-family: arial;\n  padding: 6px 6px;\n  cursor: pointer;\n  border-radius: 6px;\n  transition: all 0.35s;\n}\n.filter.active {\n  box-shadow: 0px 1px 3px 0px #00000026;\n}\n.filter:hover {\n  background: lightgray;\n}\n.projects {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.projects-enter {\n  transform: scale(0.5) translatey(-80px);\n  opacity: 0;\n}\n.projects-leave-to {\n  transform: translatey(30px);\n  opacity: 0;\n}\n.projects-leave-active {\n  position: absolute;\n  z-index: -1;\n}\n.project {\n  transition: all .35s ease-in-out;\n  padding: 10px;\n  margin: 5px;\n  flex-basis: 24%;\n  box-shadow: 0px 2px 8px lightgrey;\n}\n@media (max-width: 980px) {\n.project {\n    flex-basis: 31%;\n}\n}\n@media (max-width: 750px) {\n.project {\n    flex-basis: 47%;\n}\n}\n@media (max-width: 450px) {\n.project {\n    flex-basis: 100%;\n}\n}\n", ""]);

// exports


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_loading_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_loading_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_loading_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_headerComponent_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_headerComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_layouts_headerComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_pages_home_navComponent_vue__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_pages_home_navComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_pages_home_navComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_pages_home_itemsComponent_vue__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_pages_home_itemsComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_pages_home_itemsComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_pages_share_prodDestacadosComponent_vue__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_pages_share_prodDestacadosComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_pages_share_prodDestacadosComponent_vue__);
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
    name: 'homeComponent',
    props: {
        url: {
            type: String,
            required: true
        }
    },
    components: {
        headerComponent: __WEBPACK_IMPORTED_MODULE_1__components_layouts_headerComponent_vue___default.a,
        navComponent: __WEBPACK_IMPORTED_MODULE_2__components_pages_home_navComponent_vue___default.a,
        loading: __WEBPACK_IMPORTED_MODULE_0__components_layouts_loading_vue___default.a,
        itemsComponent: __WEBPACK_IMPORTED_MODULE_3__components_pages_home_itemsComponent_vue___default.a,
        prodDestacadosComponent: __WEBPACK_IMPORTED_MODULE_4__components_pages_share_prodDestacadosComponent_vue___default.a
    },
    computed: {
        projectsC: function projectsC() {
            var projectAux = [];
            if (this.projects && this.projects.length) {
                this.projects.forEach(function (project, index) {
                    if ((this.currentFilter === project.categoria || this.currentFilter === 'ALL') && projectAux.length < this.max) {
                        projectAux.push(project);
                    }
                }, this);
            }
            this.totalI = projectAux.length;
            return projectAux;
        },
        isMax: function isMax() {
            var m = true;
            console.log(this.totalI);
            if (this.projects.length < this.max || this.totalI < this.max) {
                m = false;
            }
            return m;
        }
    },
    data: function data() {
        return {
            totalI: 0,
            max: 12,
            currentFilter: 'ALL',
            projects: [],
            productDesigns: [{
                id: 10020,
                url: '/img/product/12.jpg',
                titulo: 'Blusa jackets',
                categoria: 'Hombre',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 29.2,
                isDesign: true
            }, {
                id: 1589,
                categoria: 'Hombre',
                url: '/img/product/9.jpg',
                titulo: 'Pantalon jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 12.2,
                isDesign: true
            }, {
                id: 54632,
                url: '/img/product/8.jpg',
                categoria: 'Mujer',
                titulo: 'Franella jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 129.2,
                isDesign: true
            }, {
                id: 345645,
                url: '/img/product/7.jpg',
                titulo: 'Carniut jackets',
                categoria: 'Mujer',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 99.2,
                isDesign: true
            }, {
                id: 14562,
                categoria: 'Hombre',
                url: '/img/product/9.jpg',
                titulo: 'Pantalon jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 12.2,
                isDesign: true
            }, {
                id: 2,
                url: '/img/product/8.jpg',
                categoria: 'Nino',
                titulo: 'Franella jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 129.2,
                isDesign: true
            }, {
                id: 31245,
                url: '/img/product/7.jpg',
                categoria: 'Nina',
                titulo: 'Carniut jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 99.2,
                isDesign: true
            }, {
                id: 400,
                url: '/img/product/6.jpg',
                categoria: 'Hombre',
                titulo: 'Tienza jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 19.2,
                isDesign: true
            }, {
                id: 10748,
                url: '/img/product/1.jpg',
                titulo: 'Blusa jackets',
                categoria: 'Nina',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 29.2,
                isDesign: true
            }, {
                id: 1999,
                url: '/img/product/2.jpg',
                categoria: 'Nina',
                titulo: 'Pantalon jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 12.2,
                isDesign: true
            }, {
                id: 102,
                url: '/img/product/3.jpg',
                categoria: 'Tazas',
                titulo: 'Franella jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 129.2,
                isDesign: true
            }, {
                id: 513,
                url: '/img/product/4.jpg',
                titulo: 'Carniut jackets',
                categoria: 'Tazas',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 99.2,
                isDesign: true
            }, {
                id: 45582,
                url: '/img/product/3.jpg',
                categoria: 'Tazas',
                titulo: 'Franella jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 129.2,
                isDesign: true
            }, {
                id: 321,
                url: '/img/product/4.jpg',
                titulo: 'Carniut jackets',
                categoria: 'Tazas',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 99.2,
                isDesign: true
            }, {
                id: 21112,
                url: '/img/product/3.jpg',
                categoria: 'Tazas',
                titulo: 'Franella jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 129.2,
                isDesign: true
            }, {
                id: 22273,
                url: '/img/product/4.jpg',
                titulo: 'Carniut jackets',
                categoria: 'Tazas',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 99.2,
                isDesign: true
            }, {
                id: 5564,
                url: '/img/product/11.jpg',
                titulo: 'Tienza jackets',
                categoria: 'Buzo',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 19.2,
                isDesign: true
            }],
            products: [{
                id: 4440,
                url: '/img/product/12.jpg',
                titulo: 'Blusa jackets',
                categoria: 'Hombre',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 29.2,
                isDesign: false
            }, {
                id: 555411,
                categoria: 'Hombre',
                url: '/img/product/9.jpg',
                titulo: 'Pantalon jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 12.2,
                isDesign: false
            }, {
                id: 2665,
                url: '/img/product/8.jpg',
                categoria: 'Mujer',
                titulo: 'Franella jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 129.2,
                isDesign: false
            }, {
                id: 105633,
                url: '/img/product/7.jpg',
                titulo: 'Carniut jackets',
                categoria: 'Nino',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 99.2,
                isDesign: false
            }, {
                id: 555451,
                categoria: 'Nino',
                url: '/img/product/9.jpg',
                titulo: 'Pantalon jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 12.2,
                isDesign: false
            }, {
                id: 5552,
                url: '/img/product/8.jpg',
                categoria: 'Nino',
                titulo: 'Franella jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 129.2,
                isDesign: false
            }, {
                id: 5553,
                url: '/img/product/7.jpg',
                categoria: 'Nina',
                titulo: 'Carniut jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 99.2,
                isDesign: false
            }, {
                id: 4454,
                url: '/img/product/6.jpg',
                categoria: 'Hombre',
                titulo: 'Tienza jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 19.2,
                isDesign: false
            }, {
                id: 5550,
                url: '/img/product/1.jpg',
                titulo: 'Blusa jackets',
                categoria: 'Mujer',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 29.2,
                isDesign: false
            }, {
                id: 5661,
                url: '/img/product/2.jpg',
                categoria: 'Nina',
                titulo: 'Pantalon jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 12.2,
                isDesign: false
            }, {
                id: 542,
                url: '/img/product/3.jpg',
                categoria: 'Tazas',
                titulo: 'Franella jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 129.2,
                isDesign: false
            }, {
                id: 45543,
                url: '/img/product/4.jpg',
                titulo: 'Carniut jackets',
                categoria: 'Nina',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 99.2,
                isDesign: false
            }, {
                id: 2222,
                url: '/img/product/3.jpg',
                categoria: 'Tazas',
                titulo: 'Franella jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 129.2,
                isDesign: false
            }, {
                id: 3,
                url: '/img/product/4.jpg',
                titulo: 'Carniut jackets',
                categoria: 'Tazas',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 99.2,
                isDesign: false
            }, {
                id: 1111,
                url: '/img/product/3.jpg',
                categoria: 'Tazas',
                titulo: 'Franella jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 129.2,
                isDesign: false
            }, {
                id: 223,
                url: '/img/product/4.jpg',
                titulo: 'Carniut jackets',
                categoria: 'Tazas',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 99.2,
                isDesign: false
            }, {
                id: 14,
                url: '/img/product/11.jpg',
                titulo: 'Tienza jackets',
                categoria: 'Buzo',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 19.2,
                isDesign: false
            }],
            isLoading: false,
            isDesign: false,
            showNav: true,
            numCart: 0,
            numBag: 0,
            isAuth: false,
            search: '',
            rubro: ''
        };
    },

    methods: {
        setFilter: function setFilter(filter) {
            this.currentFilter = filter;
        },
        searchK: function searchK(e) {
            console.log(e);
            this.search = e.search;
        },
        loginM: function loginM(e) {
            var _this = this;

            this.isLoading = true;
            window.name = e.name;
            window.last_name = e.last_name;
            window.isAuth = true;
            this.isAuth = true;
            setTimeout(function (e) {
                console.log('inicio de sesion exitoso');
                _this.isLoading = false;
            }, 500);
        },
        designM: function designM(e) {
            var _this2 = this;

            if (e !== this.isDesign) {
                this.isDesign = e;

                window.isDesign = e;
                this.isLoading = true;
                //this.showNav = false
                if (this.isDesign) {
                    this.projects = this.productDesigns;
                } else {
                    this.projects = this.products;
                }
                setTimeout(function (e) {
                    _this2.showNav = true;
                    _this2.isLoading = false;
                }, 500);
            }
        },
        searchM: function searchM(e) {
            var _this3 = this;

            this.search = e.search;
            this.rubro = e.rubro;
            window.search = e.search;
            window.rubro = e.rubro;
            this.isLoading = true;
            setTimeout(function (e) {
                _this3.isLoading = false;
            }, 500);
        }
    },
    mounted: function mounted() {
        var _this4 = this;

        $(window).resize(function (event) {
            event.preventDefault();
            if (document.body.clientWidth <= 768 && document.body.clientWidth >= 460) _this4.max = 6;else if (document.body.clientWidth < 460) _this4.max = 3;else _this4.max = 12;
        });
    },
    created: function created() {
        if (document.body.clientWidth <= 768 && document.body.clientWidth >= 460) this.max = 6;else if (document.body.clientWidth < 460) this.max = 3;else this.max = 12;

        this.isLoading = true;
        if (typeof window.isDesign === 'undefined') {
            this.isDesign = false;
        }
        if (typeof window.isAuth === 'undefined') {
            this.isAuth = false;
        }
        if (typeof window.numBag === 'undefined') {
            this.numBag = 0;
        }
        if (typeof window.numCart === 'undefined') {
            this.numCart = 0;
        }
        if (typeof window.search === 'undefined') {
            this.search = '';
        }
        if (typeof window.rubro === 'undefined') {
            this.rubro = '';
        }
        if (this.isDesign) {
            this.projects = this.productDesigns;
        } else {
            this.projects = this.products;
        }
    },
    beforeMount: function beforeMount() {
        this.isLoading = false;
    }
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(93)
/* template */
var __vue_template__ = __webpack_require__(94)
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
Component.options.__file = "resources/assets/js/components/pages/home/navComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-828aa110", Component.options)
  } else {
    hotAPI.reload("data-v-828aa110", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_owl_carousel__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_owl_carousel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_owl_carousel__);
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
  name: "navComponent",
  props: {
    url: {
      type: String,
      required: true
    },
    isdesignp: {
      type: Boolean,
      required: false,
      value: false
    }
  },
  data: function data() {
    return {
      barner: [{
        id: 0,
        url: "/img/bg.jpg",
        titulo: "Denim jackets",
        isDesign: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" + "Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        precio: 1229.2
      }, {
        id: 1,
        url: "/img/bg-2.jpg",
        titulo: "Content Static",
        isDesign: false,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" + "Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        precio: 89.5
      }],
      barnerDesign: [{
        id: 2,
        url: "/img/bg-3.jpg",
        titulo: "Toommy jackets",
        isDesign: true,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" + "Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        precio: 19.2
      }, {
        id: 3,
        url: "/img/bg-4.jpg",
        titulo: "Tonts Static",
        isDesign: true,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" + "Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        precio: 9.5
      }],
      items: [],
      isDesign: this.isdesignp
    };
  },
  mounted: function mounted() {
    this.llenarItems();
  },

  methods: {
    verDetalle: function verDetalle(i) {
      console.log(i);
    },
    llenarItems: function llenarItems() {
      var _this = this;

      this.items = [];
      setTimeout(function (e) {
        if (_this.isDesign) {
          _this.items = _this.barnerDesign;
        } else {
          _this.items = _this.barner;
        }
        setTimeout(function (e) {
          $(".hero-slider").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            items: 1,
            dots: true,
            animateOut: "fadeOut",
            animateIn: "fadeIn",
            navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
            smartSpeed: 1200,
            autoHeight: false,
            autoplay: true,
            onInitialized: function onInitialized() {
              var a = this.items().length;
              $("#snh-1").html("<span>1</span><span>" + a + "</span>");
            }
          }).on("changed.owl.carousel", function (a) {
            var b = --a.item.index,
                a = a.item.count;
            $("#snh-1").html("<span> " + (1 > b ? b + a : b > a ? b - a : b) + "</span><span>" + a + "</span>");
          });

          $(".hero-slider").append('<div class="slider-nav-warp"><div class="slider-nav"></div></div>');
          $(".hero-slider .owl-nav, .hero-slider .owl-dots").appendTo(".slider-nav");
        }, 10);
      }, 10);
    }
  },
  watch: {
    isdesignp: function isdesignp() {
      this.isDesign = this.isdesignp;
      this.llenarItems();
    }
  }
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.items.length
    ? _c("section", { staticClass: "hero-section" }, [
        _c(
          "div",
          { staticClass: "hero-slider owl-carousel" },
          _vm._l(_vm.items, function(item, i) {
            return _c(
              "div",
              {
                key: i,
                staticClass: "hs-item",
                style:
                  "background-position:center center;background-size:container;background-image:" +
                  "url(" +
                  _vm.url +
                  item.url +
                  ")"
              },
              [
                _c("div", { staticClass: "container" }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-xl-6 col-lg-7 text-white" }, [
                      _c("h2", [_vm._v(_vm._s(item.titulo))]),
                      _vm._v(" "),
                      _c("p", [_vm._v(_vm._s(item.descripcion))]),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          staticClass: "site-btn sb-line cursor",
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              $event.preventDefault()
                              return _vm.verDetalle(item.id)
                            }
                          }
                        },
                        [
                          item.isDesign
                            ? _c("span", [
                                _c("i", { staticClass: "fa fa-magic mr-2" }),
                                _vm._v("DISEÑAR\n              ")
                              ])
                            : _c("span", [
                                _c("i", { staticClass: "fa fa-eye mr-2" }),
                                _vm._v("VER DETALLE\n              ")
                              ])
                        ]
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "align-items-center d-flex justify-content-center offer-card text-white"
                    },
                    [
                      _c(
                        "span",
                        { staticClass: "pb-3 pr-1 font-nav-current" },
                        [_vm._v("$")]
                      ),
                      _vm._v(" "),
                      _c("span", { staticClass: "pb-3 font-nav-price" }, [
                        _vm._v(_vm._s(item.precio))
                      ])
                    ]
                  )
                ])
              ]
            )
          }),
          0
        ),
        _vm._v(" "),
        _vm._m(0)
      ])
    : _vm._e()
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "container" }, [
      _c("div", { staticClass: "slide-num-holder", attrs: { id: "snh-1" } })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-828aa110", module.exports)
  }
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(96)
/* template */
var __vue_template__ = __webpack_require__(97)
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
Component.options.__file = "resources/assets/js/components/pages/home/itemsComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f173e7b", Component.options)
  } else {
    hotAPI.reload("data-v-1f173e7b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 96 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'itemsComponent',
    props: {
        url: {
            type: String,
            required: true
        }
    },
    mounted: function mounted() {}
});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("section", { staticClass: "features-section mt-4" }, [
      _c("div", { staticClass: "container-fluid" }, [
        _c("div", { staticClass: "row d-flex flex-direction-xs" }, [
          _c("div", { staticClass: "feature feature-barna" }, [
            _c(
              "div",
              {
                staticClass:
                  "feature-inner d-flex flex-column justify-content-start"
              },
              [
                _c(
                  "div",
                  { staticClass: "feature-icon feature-icon-barna mb-4" },
                  [
                    _c("i", {
                      staticClass:
                        "fa fa-drivers-license font-24 center-element"
                    })
                  ]
                ),
                _vm._v(" "),
                _c("p", { staticClass: "font-18 mb-0" }, [
                  _vm._v(
                    "Fast Secure Payments: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla harum omnis officiis"
                  )
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "feature feature-barna" }, [
            _c(
              "div",
              {
                staticClass:
                  "feature-inner d-flex flex-column justify-content-start"
              },
              [
                _c(
                  "div",
                  { staticClass: "feature-icon feature-icon-barna mb-4" },
                  [
                    _c("i", {
                      staticClass: "fa fa-check font-24 center-element"
                    })
                  ]
                ),
                _vm._v(" "),
                _c("p", { staticClass: "font-18 mb-0" }, [
                  _vm._v(
                    "Premium Products: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos harum eveniet "
                  )
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "feature feature-barna" }, [
            _c(
              "div",
              {
                staticClass:
                  "feature-inner d-flex flex-column justify-content-start"
              },
              [
                _c(
                  "div",
                  { staticClass: "feature-icon feature-icon-barna mb-4" },
                  [
                    _c("i", {
                      staticClass: "fa fa-send font-24 center-element"
                    })
                  ]
                ),
                _vm._v(" "),
                _c("p", { staticClass: "font-18 mb-0" }, [
                  _vm._v(
                    "Free & fast Delivery: Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore doloribus dolores eaque facilis at"
                  )
                ])
              ]
            )
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1f173e7b", module.exports)
  }
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(99)
/* template */
var __vue_template__ = __webpack_require__(100)
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
Component.options.__file = "resources/assets/js/components/pages/share/prodDestacadosComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-67f69c59", Component.options)
  } else {
    hotAPI.reload("data-v-67f69c59", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_owl_carousel__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_owl_carousel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_owl_carousel__);
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
    name: 'prodDestacadosComponent',
    props: {
        url: {
            type: String,
            required: true
        },
        isdesignp: {
            type: Boolean,
            required: false,
            value: false
        }
    },
    data: function data() {
        return {
            productDesigns: [{
                id: 0,
                url: '/img/product/1.jpg',
                titulo: 'Blusa jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 29.2,
                isDesign: true
            }, {
                id: 1,
                url: '/img/product/2.jpg',
                titulo: 'Pantalon jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 12.2,
                isDesign: true
            }, {
                id: 2,
                url: '/img/product/3.jpg',
                titulo: 'Franella jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 129.2,
                isDesign: true
            }, {
                id: 3,
                url: '/img/product/4.jpg',
                titulo: 'Carniut jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 99.2,
                isDesign: true
            }, {
                id: 4,
                url: '/img/product/5.jpg',
                titulo: 'Tienza jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 19.2,
                isDesign: true
            }],
            products: [{
                id: 0,
                url: '/img/product/6.jpg',
                titulo: 'Changes jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 2.2,
                isDesign: false
            }, {
                id: 1,
                url: '/img/product/7.jpg',
                titulo: 'Pages jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 2.2,
                isDesign: false
            }, {
                id: 2,
                url: '/img/product/8.jpg',
                titulo: 'Nenella jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 19.2,
                isDesign: false
            }, {
                id: 3,
                url: '/img/product/9.jpg',
                titulo: 'Vitorius jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 9.2,
                isDesign: false
            }, {
                id: 4,
                url: '/img/product/10.jpg',
                titulo: 'Lorem jackets',
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' + 'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                precio: 129.2,
                isDesign: false
            }],
            items: [],
            isDesign: this.isdesignp

        };
    },
    mounted: function mounted() {
        this.llenarItems();
    },

    methods: {
        verDetalle: function verDetalle(i) {
            console.log(i);
        },
        llenarItems: function llenarItems() {
            var _this = this;

            this.items = [];
            setTimeout(function (e) {

                if (_this.isDesign) {
                    _this.items = _this.productDesigns;
                } else {
                    _this.items = _this.products;
                }
                setTimeout(function (e) {
                    $('.product-slider').owlCarousel({
                        loop: true,
                        nav: true,
                        dots: false,
                        margin: 30,
                        autoplay: true,
                        navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
                        responsive: {
                            0: {
                                items: 1
                            },
                            480: {
                                items: 2
                            },
                            768: {
                                items: 3
                            },
                            1200: {
                                items: 4
                            }
                        }
                    });
                }, 100);
            }, 100);
        }
    },
    watch: {
        isdesignp: function isdesignp() {
            this.isDesign = this.isdesignp;
            this.llenarItems();
        }
    }
});

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.items.length
    ? _c("section", { staticClass: "top-letest-product-section bg-gray" }, [
        _c("div", { staticClass: "container" }, [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "product-slider owl-carousel" },
            _vm._l(_vm.items, function(item, i) {
              return _c(
                "div",
                { key: i, staticClass: "product-item border-items" },
                [
                  _c("div", { staticClass: "pi-pic" }, [
                    _c("img", { attrs: { src: _vm.url + item.url, alt: "" } }),
                    _vm._v(" "),
                    _c("div", { staticClass: "pi-links" }, [
                      item.isDesign
                        ? _c("a", { staticClass: "add-card add-bag" }, [
                            _c("i", { staticClass: "fa fa-magic" }),
                            _c("span", [_vm._v("Diseñar")])
                          ])
                        : _c("a", { staticClass: "add-card" }, [
                            _c("i", { staticClass: "fa fa-eye" }),
                            _c("span", [_vm._v("Ver Detalle")])
                          ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "pi-text" }, [
                    _c("h6", [_vm._v("$" + _vm._s(item.precio))]),
                    _vm._v(" "),
                    _c("p", [_vm._v(_vm._s(item.titulo))])
                  ])
                ]
              )
            }),
            0
          )
        ])
      ])
    : _vm._e()
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "section-title" }, [
      _c("h2", [_vm._v("Productos Destacados")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-67f69c59", module.exports)
  }
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("header-component", {
        attrs: {
          isdesignp: _vm.isDesign,
          url: _vm.url,
          rubrop: _vm.rubro,
          numcartp: _vm.numCart,
          numbagp: _vm.numBag,
          isauthp: _vm.isAuth,
          searchp: _vm.search
        },
        on: {
          loginM: _vm.loginM,
          designM: _vm.designM,
          searchK: _vm.searchK,
          searchM: _vm.searchM
        }
      }),
      _vm._v(" "),
      _vm.showNav
        ? _c("nav-component", {
            attrs: { isdesignp: _vm.isDesign, url: _vm.url }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("items-component", { attrs: { url: _vm.url } }),
      _vm._v(" "),
      _c("prod-destacados-component", {
        attrs: { isdesignp: _vm.isDesign, url: _vm.url }
      }),
      _vm._v(" "),
      _c("section", { staticClass: "product-filter-section" }, [
        _c("div", { staticClass: "container" }, [
          _c("div", { staticClass: "section-title" }, [
            _c("h2", [
              _vm._v("Productos para "),
              _vm.isDesign
                ? _c("span", [_vm._v("diseñar")])
                : _c("span", [_vm._v("comprar")])
            ])
          ]),
          _vm._v(" "),
          _c(
            "ul",
            {
              staticClass:
                "product-filter-menu md-d-flex-barna scroll-barna overflow-auto"
            },
            [
              _c("li", [
                _c(
                  "a",
                  {
                    staticClass: "filter",
                    class: { active: _vm.currentFilter === "ALL" },
                    on: {
                      click: function($event) {
                        return _vm.setFilter("ALL")
                      }
                    }
                  },
                  [_vm._v("TODAS")]
                )
              ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  {
                    staticClass: "filter",
                    class: { active: _vm.currentFilter === "Hombre" },
                    on: {
                      click: function($event) {
                        return _vm.setFilter("Hombre")
                      }
                    }
                  },
                  [_vm._v("Hombre")]
                )
              ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  {
                    staticClass: "filter",
                    class: { active: _vm.currentFilter === "Mujer" },
                    on: {
                      click: function($event) {
                        return _vm.setFilter("Mujer")
                      }
                    }
                  },
                  [_vm._v("Mujer")]
                )
              ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  {
                    staticClass: "filter",
                    class: { active: _vm.currentFilter === "Nino" },
                    on: {
                      click: function($event) {
                        return _vm.setFilter("Nino")
                      }
                    }
                  },
                  [_vm._v("Niño")]
                )
              ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  {
                    staticClass: "filter",
                    class: { active: _vm.currentFilter === "Nina" },
                    on: {
                      click: function($event) {
                        return _vm.setFilter("Nina")
                      }
                    }
                  },
                  [_vm._v("Niña")]
                )
              ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  {
                    staticClass: "filter",
                    class: { active: _vm.currentFilter === "Tazas" },
                    on: {
                      click: function($event) {
                        return _vm.setFilter("Tazas")
                      }
                    }
                  },
                  [_vm._v("Tazas")]
                )
              ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  {
                    staticClass: "filter",
                    class: { active: _vm.currentFilter === "Buzo" },
                    on: {
                      click: function($event) {
                        return _vm.setFilter("Buzo")
                      }
                    }
                  },
                  [_vm._v("Buzo")]
                )
              ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  {
                    staticClass: "filter",
                    class: { active: _vm.currentFilter === "Otras" },
                    on: {
                      click: function($event) {
                        return _vm.setFilter("Otras")
                      }
                    }
                  },
                  [_vm._v("Otras")]
                )
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticStyle: { "min-height": "50vh", position: "relative" } },
            [
              _c(
                "transition-group",
                { staticClass: "projects", attrs: { name: "projects" } },
                _vm._l(_vm.projectsC, function(project) {
                  return _c(
                    "div",
                    { key: project.id, staticClass: "project" },
                    [
                      _c("div", { staticClass: "product-item" }, [
                        _c("div", { staticClass: "pi-pic" }, [
                          _c("img", {
                            attrs: { src: _vm.url + project.url, alt: "" }
                          }),
                          _vm._v(" "),
                          _c("div", { staticClass: "pi-links" }, [
                            project.isDesign
                              ? _c("a", { staticClass: "add-card add-bag" }, [
                                  _c("i", { staticClass: "fa fa-magic" }),
                                  _c("span", [_vm._v("Diseñar")])
                                ])
                              : _c("a", { staticClass: "add-card" }, [
                                  _c("i", { staticClass: "fa fa-eye" }),
                                  _c("span", [_vm._v("Ver Detalle")])
                                ])
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "pi-text" }, [
                          _c("h6", [_vm._v("$" + _vm._s(project.precio))]),
                          _vm._v(" "),
                          _c("p", [_vm._v(_vm._s(project.titulo) + " ")])
                        ])
                      ])
                    ]
                  )
                }),
                0
              ),
              _vm._v(" "),
              _vm.totalI === 0
                ? _c("p", { staticClass: "center-element no-found-search" }, [
                    _vm._v("\n                          No hay resultados")
                  ])
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _vm.isMax
            ? _c("div", { staticClass: "text-center pt-5" }, [
                _c("button", { staticClass: "site-btn sb-line sb-dark" }, [
                  _vm._v("VER MÁS")
                ])
              ])
            : _vm._e()
        ])
      ]),
      _vm._v(" "),
      _vm.isLoading ? _c("loading") : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-00655070", module.exports)
  }
}

/***/ })
/******/ ]);