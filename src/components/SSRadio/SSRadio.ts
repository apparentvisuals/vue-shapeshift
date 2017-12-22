import Vue, { VueConstructor } from 'vue';

const SSRadio = Vue.extend({
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
        type: 'radio',
        class: 'uk-radio'
      }
    });

    const label = createElement('label', {}, [input, ' ' + this.schema.name]);

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
export default SSRadio;
