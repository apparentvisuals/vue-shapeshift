var VueShapeshift = (function (Vue) {
'use strict';

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var shapeshift_cjs = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, '__esModule', { value: true });

var Shapeshift = (function () {
    function Shapeshift(schema, uiSchema) {
        this.schema = schema;
        this.uiSchema = uiSchema;
    }
    Shapeshift.prototype.forEach = function (func) {
        var _this = this;
        if (this.uiSchema &&
            this.uiSchema.order &&
            Array.isArray(this.uiSchema.order)) {
            this.uiSchema.order.forEach(function (value) {
                func(value, _this.schema.properties[value], _this.uiSchema[value]);
            });
        }
    };
    return Shapeshift;
}());

exports.Shapeshift = Shapeshift;
});

unwrapExports(shapeshift_cjs);
var shapeshift_cjs_1 = shapeshift_cjs.Shapeshift;

var SSAutoForm$1 = Vue.extend({
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
    },
    render: function (createElement) {
        var shapeshift = new shapeshift_cjs_1(this.schema, this.uiSchema);
        var fields = [];
        shapeshift.forEach(function (name, schema, uiSchema) {
            switch (schema.type) {
                case 'boolean':
                    fields.push(createElement('ss-checkbox', {
                        props: {
                            schema: schema,
                            uiSchema: uiSchema
                        }
                    }));
                    break;
                default:
                    fields.push(createElement('ss-text-field', {
                        props: {
                            schema: schema,
                            uiSchema: uiSchema
                        }
                    }));
                    break;
            }
        });
        return createElement('form', fields);
    }
});

var SSTextField$1 = Vue.extend({
    props: {
        schema: {
            type: Object,
            required: true
        },
        uiSchema: {
            type: Object,
            require: false
        }
    },
    render: function (createElement) {
        var label = createElement('label', [this.schema.name]);
        var input = createElement('input', {
            attrs: {
                type: 'text',
                class: 'uk-input'
            }
        });
        return createElement('div', {
            attrs: {
                class: 'uk-margin'
            }
        }, [label, input]);
    }
});

var SSCheckbox$1 = Vue.extend({
    props: {
        schema: {
            type: Object
        },
        uiSchema: {
            type: Object
        }
    },
    render: function (createElement) {
        var input = createElement('input', {
            attrs: {
                type: 'checkbox',
                class: 'uk-checkbox'
            }
        });
        var label = createElement('label', {}, [input, this.schema.name]);
        return createElement('div', {
            attrs: {
                class: 'uk-margin'
            }
        }, [label]);
    }
});

var ShapeshiftPlugin = {
    install: function (Vue$$1, options) {
        Vue$$1.component('ss-text-field', SSTextField$1);
        Vue$$1.component('ss-checkbox', SSCheckbox$1);
        Vue$$1.component('ss-auto-form', SSAutoForm$1);
    }
};

return ShapeshiftPlugin;

}(Vue));
