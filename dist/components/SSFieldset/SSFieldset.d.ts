import Vue, { VueConstructor } from 'vue';
import { Shapeshift } from '@shapeshift/core';
declare const SSFieldSet: VueConstructor<{
    name: string;
    ss: Shapeshift;
} & Vue>;
export default SSFieldSet;
