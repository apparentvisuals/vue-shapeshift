import Vue, { VueConstructor } from 'vue';

const SSCheckbox = Vue.extend({
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

    return createElement(
      'div',
      {
        attrs: {
          class: 'uk-margin'
        }
      },
      [label]
    );
  }
});
export default SSCheckbox;
