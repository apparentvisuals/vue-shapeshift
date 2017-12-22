import Vue, { VueConstructor } from 'vue';
import { Shapeshift } from '@shapeshift/core';

const SSCheckbox = Vue.extend({
  props: {
    ss: {
      type: Shapeshift,
      required: true
    }
  },
  render(createElement) {
    const input = createElement('input', {
      attrs: {
        type: 'checkbox',
        class: 'uk-checkbox'
      }
    });

    const label = createElement('label', {}, [input, ' ' + this.ss.schema.title]);

    return createElement(
      'div',
      {
        attrs: {
          class: 'uk-margin uk-grid-small uk-child-width-auto uk-grid'
        }
      },
      [label]
    );
  }
});
export default SSCheckbox;
