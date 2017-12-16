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

SSTextField$1['componentName'] = 'ss-text-field';

const SSCheckbox$1 = Vue.extend({
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
    render(createElement) {
        const input = createElement('input', {
            attrs: {
                type: 'checkbox',
                class: 'uk-checkbox'
            }
        });
        const label = createElement('label', {}, [input, ' ' + this.schema.name]);
        return createElement('div', {
            attrs: {
                class: 'uk-margin uk-grid-small uk-child-width-auto uk-grid'
            }
        }, [label]);
    }
});

SSCheckbox$1['componentName'] = 'ss-checkbox';

const SSRange$1 = Vue.extend({
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
                type: 'range',
                class: 'uk-range'
            }
        });
        return createElement('div', {
            attrs: {
                class: 'uk-margin'
            }
        }, [label, input]);
    }
});

SSRange$1['componentName'] = 'ss-range';

const defaultComponents = [SSTextField$1, SSCheckbox$1, SSRange$1];
const ShapeshiftPlugin = {
    install(Vue$$1, options) {
        let components = defaultComponents;
        if (options && options.components) {
            components = options.components;
        }
        components.forEach(component => {
            Vue$$1.component(component['componentName'], component);
        });
        Vue$$1.component('ss-auto-form', SSAutoForm$1);
    }
};

export default ShapeshiftPlugin;
