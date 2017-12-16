import Vue, { VueConstructor } from 'vue';

const SSRange = Vue.extend({
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

    return createElement(
      'div',
      {
        attrs: {
          class: 'uk-margin'
        }
      },
      [label, input]
    );
  }
});
export default SSRange;
