import Vue, { VueConstructor } from 'vue';
import { Shapeshift } from '@shapeshift/core';
declare const SSTextField: VueConstructor<{
    ss: Shapeshift;
} & Vue>;
export default SSTextField;
