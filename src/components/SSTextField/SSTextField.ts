import Vue, { VueConstructor } from 'vue';
import { Shapeshift } from '@shapeshift/core';

const SSTextField = Vue.extend({
  props: {
    ss: {
      type: Shapeshift,
      required: true,
    },
  },
  render(createElement) {
    const input = createElement('input', {
      attrs: {
        type: 'text',
        class: 'uk-input',
        placeholder: this.ss.schema.title,
      }
    });

    return createElement(
      'div',
      { attrs: { class: 'uk-margin' } },
      [input]
    );
  }
});
export default SSTextField;
