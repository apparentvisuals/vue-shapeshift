import Vue, { VueConstructor, VNode } from 'vue';
import { shapeshift, Shapeshift } from '@shapeshift/core';
import { getElement } from '../utils';

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
    let ss = shapeshift(this.schema, this.uiSchema);
    let children = [getElement(createElement, ss)];
    return createElement('form', children);
  }
});
export default SSAutoForm;
