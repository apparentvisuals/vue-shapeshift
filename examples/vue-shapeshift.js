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

(function (DataType) {
    DataType.STRING = 'string';
    DataType.OBJECT = 'object';
    DataType.BOOL = 'boolean';
    DataType.NUMBER = 'number';
    DataType.INTEGER = 'integer';
    DataType.NULL = 'null';
    DataType.ARRAY = 'array';
})(exports.DataType || (exports.DataType = {}));

var Shapeshift = (function () {
    function Shapeshift(schema, uiSchema) {
        this.depth = 0;
        if (typeof schema !== exports.DataType.OBJECT || schema === null || Array.isArray(uiSchema)) {
            throw new Error('JSON Schema must be an object');
        }
        if (uiSchema !== undefined && uiSchema !== null && (typeof uiSchema !== exports.DataType.OBJECT || Array.isArray(uiSchema))) {
            throw new Error('UI Schema must be an object');
        }
        this.schema = schema;
        this.uiSchema = uiSchema || {};
        this.type = schema.type;
        if (this.uiSchema && this.uiSchema.widget) {
            this.widget = this.uiSchema.widget;
        }
        else {
            switch (this.type) {
                case 'string':
                case 'number':
                case 'integer':
                    this.widget = 'textfield';
                    break;
                case 'boolean':
                    this.widget = 'checkbox';
                    break;
                case 'object':
                    this.widget = 'fieldset';
                    break;
                default:
                    this.widget = 'hidden';
                    break;
            }
        }
    }
    Shapeshift.prototype.forEach = function (func) {
        var _this = this;
        var schema = this.schema;
        var uiSchema = this.uiSchema;
        if (typeof schema !== exports.DataType.OBJECT || schema === null || schema.type !== exports.DataType.OBJECT ||
            typeof schema.properties !== exports.DataType.OBJECT || schema.properties === null) {
            return;
        }
        if (!Array.isArray(uiSchema.order)) {
            Object.keys(schema.properties).forEach(function (key) {
                var ss = _this.getNestedValue(key, schema, uiSchema);
                func(key, ss);
            });
            return;
        }
        uiSchema.order.forEach(function (key) {
            if (schema.properties && schema.properties[key]) {
                var ss = _this.getNestedValue(key, schema, uiSchema);
                func(key, ss);
            }
        });
    };
    Shapeshift.prototype.getNestedValue = function (key, schema, uiSchema) {
        var property = schema.properties[key];
        var uiProperty = undefined;
        if (uiSchema && uiSchema.properties) {
            uiProperty = uiSchema.properties[key];
        }
        var ss = new Shapeshift(property, uiProperty);
        ss.depth = this.depth + 1;
        return ss;
    };
    return Shapeshift;
}());

function isNumber(data) {
    return typeof data === exports.DataType.NUMBER && data !== NaN;
}
function isInteger(data) {
    return isNumber(data) && isMultipleOf(data, 1);
}
function isGreaterThan(data, value, exclusive) {
    if (exclusive === void 0) { exclusive = false; }
    if (!isNumber(data)) {
        throw new Error('data is not a number');
    }
    if (!isNumber(value)) {
        throw new Error('value is not an number');
    }
    if (exclusive) {
        return data > value;
    }
    else {
        return data >= value;
    }
}
function isLessThan(data, value, exclusive) {
    if (exclusive === void 0) { exclusive = false; }
    if (!isNumber(data)) {
        throw new Error('data is not a number');
    }
    if (!isNumber(value)) {
        throw new Error('value is not an number');
    }
    if (exclusive) {
        return data < value;
    }
    else {
        return data <= value;
    }
}
function isMultipleOf(data, value) {
    if (!isNumber(data)) {
        throw new Error('data is not a number');
    }
    if (!isNumber(value)) {
        throw new Error('value is not an number');
    }
    return data % value === 0;
}

function isString(data) {
    return typeof data === exports.DataType.STRING;
}
function isMinLength(data, length) {
    if (!isString(data)) {
        throw new Error('data is not a string');
    }
    if (!isInteger(length)) {
        throw new Error('length is not an integer');
    }
    return data.length >= length;
}
function isMaxLength(data, length) {
    if (!isString(data)) {
        throw new Error('data is not a string');
    }
    if (!isInteger(length)) {
        throw new Error('length is not an integer');
    }
    return data.length <= length;
}
function matchPattern(data, pattern) {
    if (!isString(data)) {
        throw new Error('data is not a string');
    }
    if (!isString(pattern)) {
        throw new Error('pattern is not a string');
    }
    var regex = new RegExp(pattern);
    return regex.test(data);
}

function isObject(data) {
    return typeof data === exports.DataType.OBJECT && data !== null && !Array.isArray(data);
}

function isBoolean(data) {
    return typeof data === exports.DataType.BOOL;
}

function isArray(data) {
    return Array.isArray(data);
}

function validate$$1(schema, data) {
    if (!isObject(schema)) {
        throw new Error('schema is not defined');
    }
    if (data === undefined) {
        throw new Error('data is not defined');
    }
    var validators = [];
    switch (schema.type) {
        case exports.DataType.STRING:
            validators.push(validateString$$1(schema, data));
            break;
        case exports.DataType.NUMBER:
            validators.push(validateNumber$$1(schema, data));
            break;
        case exports.DataType.INTEGER:
            validators.push(validateInteger$$1(schema, data));
            break;
        case exports.DataType.BOOL:
            validators.push(validateBoolean$$1(schema, data));
            break;
        case exports.DataType.OBJECT:
            validators.push(validateObject$$1(schema, data));
            break;
        case exports.DataType.ARRAY:
            validators.push(validateArray$$1(schema, data));
            break;
        case exports.DataType.NULL:
            validators.push(data === null);
            break;
        default:
            validators.push(true);
            break;
    }
    if (schema.enum) {
        validators.push(validateValueIn$$1(schema.enum, data));
    }
    return validators.every(function (result) {
        return result;
    });
}
function validateString$$1(schema, data) {
    if (!isString(data)) {
        return false;
    }
    var validators = [];
    if (schema.minLength) {
        validators.push(isMinLength(data, schema.minLength));
    }
    if (schema.maxLength) {
        validators.push(isMaxLength(data, schema.maxLength));
    }
    if (schema.pattern) {
        validators.push(matchPattern(data, schema.pattern));
    }
    return validators.every(function (result) {
        return result;
    });
}
function validateInteger$$1(schema, data) {
    if (isInteger(data)) {
        return validateNumber$$1(schema, data);
    }
    return false;
}
function validateNumber$$1(schema, data) {
    if (!isNumber(data)) {
        return false;
    }
    var validators = [];
    if (schema.minimum) {
        var exclusive = schema.exclusiveMinimum || false;
        validators.push(isGreaterThan(data, schema.minimum, exclusive));
    }
    if (schema.maximum) {
        var exclusive = schema.exclusiveMaximum || false;
        validators.push(isLessThan(data, schema.maximum, exclusive));
    }
    if (schema.multipleOf) {
        validators.push(isMultipleOf(data, schema.multipleOf));
    }
    return validators.every(function (result) {
        return result;
    });
}
function validateArray$$1(schema, data) {
    return isArray(data);
}
function validateObject$$1(schema, data) {
    return isObject(data);
}
function validateBoolean$$1(schema, data) {
    return isBoolean(data);
}
function validateValueIn$$1(values, data) {
    if (!Array.isArray(values) || values.length === 0) {
        return false;
    }
    return values.indexOf(data) > -1;
}


var index = Object.freeze({
	validate: validate$$1,
	validateString: validateString$$1,
	validateInteger: validateInteger$$1,
	validateNumber: validateNumber$$1,
	validateArray: validateArray$$1,
	validateObject: validateObject$$1,
	validateBoolean: validateBoolean$$1,
	validateValueIn: validateValueIn$$1
});

function shapeshift(schema, uiSchema) {
    return new Shapeshift(schema, uiSchema);
}

exports.shapeshift = shapeshift;
exports.Validators = index;
exports.Shapeshift = Shapeshift;
});

unwrapExports(shapeshift_cjs);
var shapeshift_cjs_1 = shapeshift_cjs.DataType;
var shapeshift_cjs_2 = shapeshift_cjs.shapeshift;
var shapeshift_cjs_3 = shapeshift_cjs.Validators;
var shapeshift_cjs_4 = shapeshift_cjs.Shapeshift;

function getRootElement(createElement, ss) {
    var _this = this;
    console.log('form(root)');
    if (ss.type === 'object') {
        var children_1 = [];
        ss.forEach(function (name, ss) {
            children_1.push(getElement.call(_this, createElement, ss, name));
        });
        return children_1;
    }
    else {
        return [getElement.call(this, createElement, ss)];
    }
}
function getElement(createElement, ss, name) {
    ssDebug(ss, name);
    var self = this;
    switch (ss.widget) {
        case 'checkbox':
            return createElement('ss-checkbox', {
                domProps: {
                    value: name ? self.nestedValue[name] : self.nestedValue
                },
                props: {
                    ss: ss,
                },
                on: {
                    input: function (event) {
                        console.log(event);
                        if (name) {
                            self.$set(self.nestedValue, name, event);
                        }
                        else {
                            self.nestedValue = event;
                        }
                        self.$emit('input', self.nestedValue);
                    }
                }
            });
        case 'fieldset':
            return createElement('ss-field-set', {
                domProps: {
                    value: name ? self.nestedValue[name] : self.nestedValue
                },
                props: {
                    name: name,
                    ss: ss,
                },
                on: {
                    input: function (event) {
                        if (name) {
                            self.$set(self.nestedValue, name, event);
                        }
                        else {
                            self.nestedValue = event;
                        }
                        self.$emit('input', self.nestedValue);
                    }
                }
            });
        case 'textarea':
            return createElement('ss-text-area', {
                domProps: {
                    value: name ? self.nestedValue[name] : self.nestedValue
                },
                props: {
                    ss: ss,
                },
                on: {
                    input: function (event) {
                        if (name) {
                            self.$set(self.nestedValue, name, event);
                        }
                        else {
                            self.nestedValue = event;
                        }
                        self.$emit('input', self.nestedValue);
                    }
                }
            });
        case 'textfield':
        default:
            return createElement('ss-text-field', {
                domProps: {
                    value: name ? self.nestedValue[name] : self.nestedValue
                },
                props: {
                    ss: ss,
                },
                on: {
                    input: function (event) {
                        if (name) {
                            self.$set(self.nestedValue, name, event);
                        }
                        else {
                            self.nestedValue = event;
                        }
                        self.$emit('input', self.nestedValue);
                    }
                }
            });
    }
}
function ssDebug(ss, name) {
    var level = Array(ss.depth + 1).join(' ') + '|-';
    var message = '';
    var type = "(" + ss.widget + ")";
    if (name) {
        message = name + type;
    }
    else {
        message = type;
    }
    console.log(level, message);
}

var SSAutoForm$1 = Vue.extend({
    props: {
        value: [Object, String, Number],
        schema: {
            type: Object,
            required: true
        },
        uiSchema: {
            type: Object,
            required: true
        }
    },
    data: function () {
        return {
            nestedValue: this.value || {}
        };
    },
    watch: {
        value: function (newValue) {
            this.nestedValue = newValue;
        }
    },
    render: function (createElement) {
        var ss = shapeshift_cjs_2(this.schema, this.uiSchema);
        var children = getRootElement.call(this, createElement, ss);
        return createElement('form', children);
    }
});

var SSTextField$1 = Vue.extend({
    props: {
        value: [String, Number],
        ss: {
            type: shapeshift_cjs_4,
            required: true,
        },
    },
    data: function () {
        return {
            nestedValue: this.value,
        };
    },
    watch: {
        value: function (newValue) {
            this.nestedValue = newValue;
        }
    },
    render: function (createElement) {
        var self = this;
        var listeners = Object.assign({}, this.$listeners);
        var input = createElement('input', {
            domProps: {
                value: this.nestedValue,
            },
            attrs: {
                type: 'text',
                placeholder: this.ss.schema.title,
            },
            on: Object.assign(listeners, {
                input: function (event) {
                    self.nestedValue = event.target.value;
                    self.$emit('input', self.nestedValue);
                }
            }),
        });
        return createElement('div', [input]);
    }
});

SSTextField$1['componentName'] = 'ss-text-field';

var SSCheckbox$1 = Vue.extend({
    props: {
        value: [Boolean],
        ss: {
            type: shapeshift_cjs_4,
            required: true
        }
    },
    data: function () {
        return {
            nestedValue: !!this.value
        };
    },
    watch: {
        value: function (newValue) {
            this.nestedValue = newValue;
        }
    },
    render: function (createElement) {
        var self = this;
        var listeners = Object.assign({}, this.$listeners);
        var input = createElement('input', {
            domProps: {
                value: this.nestedValue
            },
            attrs: { type: 'checkbox' },
            on: Object.assign(listeners, {
                input: function (event) {
                    self.nestedValue = event.target.checked;
                    self.$emit('input', self.nestedValue);
                }
            }),
        });
        var label = createElement('label', {}, [input, ' ' + this.ss.schema.title]);
        return createElement('div', [label]);
    }
});

SSCheckbox$1['componentName'] = 'ss-checkbox';

var SSRadio$1 = Vue.extend({
    props: {
        schema: {
            type: Object,
            required: true
        },
        uiSchema: {
            type: Object,
            required: false
        }
    },
    render: function (createElement) {
        var input = createElement('input', { attrs: { type: 'radio' } });
        var label = createElement('label', {}, [input, ' ' + this.schema.name]);
        return createElement('div', [label]);
    }
});

SSRadio$1['componentName'] = 'ss-radio';

var SSRange$1 = Vue.extend({
    props: {
        ss: {
            type: shapeshift_cjs_4,
            require: true
        }
    },
    render: function (createElement) {
        var label = createElement('label', this.ss.schema.title);
        var input = createElement('input', { attrs: { type: 'range' } });
        return createElement('div', [label, input]);
    }
});

SSRange$1['componentName'] = 'ss-range';

var SSFieldSet$1 = Vue.extend({
    props: {
        value: Object,
        name: { type: String },
        ss: {
            type: shapeshift_cjs_4,
            required: true
        }
    },
    data: function () {
        return {
            nestedValue: this.value || {}
        };
    },
    watch: {
        value: function (newValue) {
            this.nestedValue = newValue;
        }
    },
    render: function (createElement) {
        var _this = this;
        var children = [];
        if (this.ss.schema.title) {
            children.push(createElement('legend', this.ss.schema.title));
        }
        this.ss.forEach(function (name, ss) {
            children.push(getElement.call(_this, createElement, ss, name));
        });
        return createElement('fieldset', { attrs: { name: this.name } }, children);
    }
});

SSFieldSet$1['componentName'] = 'ss-field-set';

var SSTextArea$1 = Vue.extend({
    props: {
        value: [String, Number],
        ss: {
            type: shapeshift_cjs_4,
            required: true,
        }
    },
    data: function () {
        return {
            nestedValue: this.value
        };
    },
    watch: {
        value: function (newValue) {
            this.nestedValue = newValue;
        }
    },
    render: function (createElement) {
        var self = this;
        var listeners = Object.assign({}, this.$listeners);
        var input = createElement('textarea', {
            domProps: {
                value: this.nestedValue
            },
            attrs: {
                placeholder: this.ss.schema.title,
            },
            on: Object.assign(listeners, {
                input: function (event) {
                    self.nestedValue = event.target.value;
                    self.$emit('input', self.nestedValue);
                }
            }),
        });
        return createElement('div', [input]);
    }
});

SSTextArea$1['componentName'] = 'ss-text-area';

var defaultComponents = [SSTextField$1, SSCheckbox$1, SSRange$1, SSRadio$1, SSFieldSet$1, SSTextArea$1];
var ShapeshiftPlugin = {
    install: function (Vue$$1, options) {
        var components = defaultComponents;
        if (options && options.components) {
            components = options.components;
        }
        components.forEach(function (component) {
            Vue$$1.component(component['componentName'], component);
        });
        Vue$$1.component('ss-auto-form', SSAutoForm$1);
    }
};

return ShapeshiftPlugin;

}(Vue));
