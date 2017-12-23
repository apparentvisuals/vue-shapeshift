import Vue, { VueConstructor } from 'vue';
import { Shapeshift } from '@shapeshift/core';
declare const SSRange: VueConstructor<{
    ss: Shapeshift;
} & Vue>;
export default SSRange;
