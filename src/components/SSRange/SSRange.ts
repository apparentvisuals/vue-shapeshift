import Vue, { VueConstructor } from 'vue';
import { Shapeshift } from '@shapeshift/core';

const SSRange = Vue.extend({
  props: {
    ss: {
      type: Shapeshift,
      require: true
    }
  },
  render(createElement) {
    const label = createElement('label', this.ss.schema.title);
    const input = createElement('input', { attrs: { type: 'range' } });
    return createElement('div', [label, input]);
  }
});
export default SSRange;
