import Vue, { VueConstructor, VNode } from 'vue';
import { Shapeshift } from '@shapeshift/core';
import { getElement } from '../utils';

const SSFieldSet = Vue.extend({
  props: {
    name: { type: String },
    ss: {
      type: Shapeshift,
      required: true
    }
  },
  render(createElement) {
    let children: VNode[] = [];
    if (this.ss.schema.title) {
      children.push(createElement('legend', {
        attrs: {
          class: 'uk-legend',
        }
      }, this.ss.schema.title));
    }
    this.ss.forEach((name, ss) => {
      children.push(getElement(createElement, ss, name));
    });
    return createElement('fieldset', {
      attrs: {
        name: this.name,
        class: 'uk-fieldset',
      }
    }, children);
  }
});

export default SSFieldSet;