import Vue from 'vue';

class Shapeshift {
    constructor(schema, uiSchema) {
        this.schema = schema;
        this.uiSchema = uiSchema;
    }
    forEach(func) {
        if (this.uiSchema &&
            this.uiSchema.order &&
            Array.isArray(this.uiSchema.order)) {
            this.uiSchema.order.forEach(value => {
                func(value, this.schema.properties[value], this.uiSchema[value]);
            });
        }
    }
}

const SSAutoForm$1 = Vue.extend({
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
    data() {
        return {
            triggers: {}
        };
    },
    render(createElement) {
        let shapeshift = new Shapeshift(this.schema, this.uiSchema);
        let fields = [];
        shapeshift.forEach((name, schema, uiSchema) => {
            switch (schema.type) {
                case 'boolean':
                    fields.push(createElement('ss-checkbox', {
                        props: {
                            schema,
                            uiSchema
                        }
                    }));
                    break;
                default:
                    fields.push(createElement('ss-text-field', {
                        props: {
                            schema,
                            uiSchema
                        }
                    }));
                    break;
            }
        });
        return createElement('form', fields);
    }
});

const SSTextField$1 = Vue.extend({
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
    render(createElement) {
        const label = createElement('label', [this.schema.name]);
        const input = createElement('input', {
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

const SSCheckbox$1 = Vue.extend({
    props: {
        schema: {
            type: Object
        },
        uiSchema: {
            type: Object
        }
    },
    render(createElement) {
        const input = createElement('input', {
            attrs: {
                type: 'checkbox',
                class: 'uk-checkbox'
            }
        });
        const label = createElement('label', {}, [input, this.schema.name]);
        return createElement('div', {
            attrs: {
                class: 'uk-margin'
            }
        }, [label]);
    }
});

const ShapeshiftPlugin = {
    install(Vue$$1, options) {
        Vue$$1.component('ss-text-field', SSTextField$1);
        Vue$$1.component('ss-checkbox', SSCheckbox$1);
        Vue$$1.component('ss-auto-form', SSAutoForm$1);
    }
};

export default ShapeshiftPlugin;
