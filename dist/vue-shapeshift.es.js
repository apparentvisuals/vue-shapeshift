import Vue from 'vue';

var SSAutoFrom = Vue.extend({render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"title"},[_vm._v("Hello World")])},staticRenderFns: [],});

var SSTextField$1 = Vue.extend({render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"title"},[_vm._v("Hello Component")])},staticRenderFns: [],});

const ShapeshiftPlugin = {
    install(Vue$$1, options) {
        console.log('Initialize components');
        Vue$$1.component('ss-auto-form', SSAutoFrom);
        Vue$$1.component('ss-text-field', SSTextField$1);
    }
};

export { SSAutoFrom as SSAutoForm, SSTextField$1 as SSTextField };
export default ShapeshiftPlugin;
