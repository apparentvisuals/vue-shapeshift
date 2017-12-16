var VueShapeshift = (function (Vue) {
'use strict';

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

var SSAutoFrom = Vue.extend({render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._l((_vm.uiSchema.order),function(property){return [(_vm.schema.properties[property].type === 'boolean')?_c('div',{key:property},[_c('v-checkbox',{attrs:{"color":"primary","label":_vm.schema.properties[property].title,"rules":_vm.rules[property],"required":_vm.schema.required && _vm.schema.required.indexOf(property) > -1},model:{value:(_vm.value[property]),callback:function ($$v) {_vm.$set(_vm.value, property, $$v);},expression:"value[property]"}})],1):(_vm.schema.properties[property].type === 'number')?_c('div',{key:property},[_c('v-text-field',{attrs:{"box":"","label":_vm.schema.properties[property].title,"rules":_vm.rules[property],"required":_vm.schema.required && _vm.schema.required.indexOf(property) > -1},model:{value:(_vm.value[property]),callback:function ($$v) {_vm.$set(_vm.value, property, $$v);},expression:"value[property]"}})],1):[(_vm.schema.properties[property].format === 'date')?_c('div',{key:property},[_c('v-menu',{attrs:{"lazy":"","close-on-content-click":false,"transition":"scale-transition","offset-y":""},model:{value:(_vm.triggers[property]),callback:function ($$v) {_vm.$set(_vm.triggers, property, $$v);},expression:"triggers[property]"}},[_c('v-text-field',{attrs:{"slot":"activator","box":"","readonly":"readonly","label":_vm.schema.properties[property].title,"required":_vm.schema.required && _vm.schema.required.indexOf(property) > -1},slot:"activator",model:{value:(_vm.value[property]),callback:function ($$v) {_vm.$set(_vm.value, property, $$v);},expression:"value[property]"}}),_vm._v(" "),_c('v-date-picker',{attrs:{"autosave":""},model:{value:(_vm.value[property]),callback:function ($$v) {_vm.$set(_vm.value, property, $$v);},expression:"value[property]"}})],1)],1):(_vm.schema.properties[property].format === 'email')?_c('div',{key:property},[_c('v-text-field',{attrs:{"box":"","label":_vm.schema.properties[property].title,"rules":_vm.rules[property],"required":_vm.schema.required && _vm.schema.required.indexOf(property) > -1},model:{value:(_vm.value[property]),callback:function ($$v) {_vm.$set(_vm.value, property, $$v);},expression:"value[property]"}})],1):_c('div',{key:property},[_c('ss-text-field')],1)]]})],2)},staticRenderFns: [],
    props: {
        schema: {
            type: Object,
            required: true
        },
        uiSchema: {
            type: Object,
            required: true
        },
        value: {
            type: Object,
            required: true
        }
    },
    data: function () {
        return {
            triggers: {}
        };
    }
});

var SSTextField$1 = Vue.extend({render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('input',{attrs:{"type":"text"}})])}],});

var ShapeshiftPlugin = {
    install: function (Vue$$1, options) {
        console.log('Initialize components');
        Vue$$1.component('ss-auto-form', SSAutoFrom);
        Vue$$1.component('ss-text-field', SSTextField$1);
    }
};

return ShapeshiftPlugin;

}(Vue));
