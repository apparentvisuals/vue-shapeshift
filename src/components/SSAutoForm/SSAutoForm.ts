import Vue, { VueConstructor, VNode } from 'vue';
import { shapeshift, Shapeshift } from '@shapeshift/core';
import { getElement, getRootElement } from '../utils';

const SSAutoForm = Vue.extend({
  props: {
    value: [Object, String, Number],
    schema: {
      type: Object,
      required: true
    },
    uiSchema: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      nestedValue: this.value || {}
    }
  },

  watch: {
    value(newValue) {
      this.nestedValue = newValue;
    }
  },

  render(createElement): VNode {
    let ss = shapeshift(this.schema, this.uiSchema);
    let children = getRootElement.call(this, createElement, ss);
    return createElement('form', children);
  }
});
export default SSAutoForm;
