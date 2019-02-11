import Vue, { VueConstructor } from 'vue';
export default function mixins<T extends VueConstructor[]>(...args: T): ExtractVue<T> extends infer V ? V extends Vue ? VueConstructor<V> : never : never;
export default function mixins<T extends Vue>(...args: VueConstructor[]): VueConstructor<T>;
/**
 * Returns the instance type from a VueConstructor
 * Useful for adding types when using mixins().extend()
 */
export declare type ExtractVue<T extends VueConstructor | VueConstructor[]> = T extends (infer U)[] ? UnionToIntersection<U extends VueConstructor<infer V> ? V : never> : T extends VueConstructor<infer V> ? V : never;
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
export {};
