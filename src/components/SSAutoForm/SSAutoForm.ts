import Vue, { VueConstructor, VNode } from 'vue';
import { Shapeshift } from '@shapeshift/core';

const SSAutoForm = Vue.extend({
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
    let fields: VNode[] = [];
    shapeshift.forEach((name, schema, uiSchema) => {
      switch (schema.type) {
        case 'boolean':
          fields.push(
            createElement('ss-checkbox', {
              props: {
                schema,
                uiSchema
              }
            })
          );
          break;
        default:
          fields.push(
            createElement('ss-text-field', {
              props: {
                schema,
                uiSchema
              }
            })
          );
          break;
      }
    });
    return createElement('form', fields);
  }
});
export default SSAutoForm;
