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
    const input = createElement('input', { attrs: { type: 'radio' } });
    const label = createElement('label', {}, [input, ' ' + this.schema.name]);
    return createElement('div', [label]);
  }
});
export default SSRadio;
