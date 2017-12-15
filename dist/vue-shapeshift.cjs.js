'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));

var SSAutoFrom = Vue.extend({render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"title"},[_vm._v("Hello World")])},staticRenderFns: [],});

var SSTextField$1 = Vue.extend({render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"title"},[_vm._v("Hello Component")])},staticRenderFns: [],});

const ShapeshiftPlugin = {
    install(Vue$$1, options) {
        console.log('Initialize components');
        Vue$$1.component('ss-auto-form', SSAutoFrom);
        Vue$$1.component('ss-text-field', SSTextField$1);
    }
};

exports['default'] = ShapeshiftPlugin;
exports.SSAutoForm = SSAutoFrom;
exports.SSTextField = SSTextField$1;
