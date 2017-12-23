import Vue, { VueConstructor, VNode } from 'vue';
import { Shapeshift } from '@shapeshift/core';
import { getElement } from '../utils';

const SSFieldSet = Vue.extend({
  props: {
    value: Object,
    name: { type: String },
    ss: {
      type: Shapeshift,
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
    let children: VNode[] = [];
    if (this.ss.schema.title) {
      children.push(createElement('legend', this.ss.schema.title));
    }
    this.ss.forEach((name, ss) => {
      children.push(getElement.call(this, createElement, ss, name));
    });
    return createElement('fieldset', { attrs: { name: this.name } }, children);
  }
});

export default SSFieldSet;