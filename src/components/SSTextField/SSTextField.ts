import Vue, { VueConstructor } from 'vue';

const SSTextField = Vue.extend({
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
export default SSTextField;
