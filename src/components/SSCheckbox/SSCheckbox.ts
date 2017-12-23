import Vue, { VueConstructor, VNode } from 'vue';
import { Shapeshift } from '@shapeshift/core';

const SSCheckbox = Vue.extend({
  props: {
    value: [Boolean],
    ss: {
      type: Shapeshift,
      required: true
    }
  },

  data() {
    return {
      nestedValue: !!this.value
    }
  },

  watch: {
    value(newValue) {
      this.nestedValue = newValue;
    }
  },

  render(createElement): VNode {
    const self = this;
    const listeners = Object.assign({}, this.$listeners);
    const input = createElement('input', {
      domProps: {
        value: this.nestedValue
      },
      attrs: { type: 'checkbox' },
      on: Object.assign(listeners, {
        input: function (event: any) {
          self.nestedValue = event.target.checked;
          self.$emit('input', self.nestedValue);
        }
      }),
    });
    const label = createElement('label', {}, [input, ' ' + this.ss.schema.title]);
    return createElement('div', [label]);
  }
});
export default SSCheckbox;
