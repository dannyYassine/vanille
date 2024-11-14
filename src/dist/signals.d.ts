export declare class Signal<P> {
    value: P;
    subscribers: Set<(newValue: P, oldValue: P) => void>;
    constructor(initialValue?: P);
    get(): P;
    set(newValue: any): void;
    mutSet(newValue: any): void;
    subscribe(callback: any): () => void;
    unsubscribe(callback: any): void;
    notifySubscribers(newValue: any, oldValue: any): void;
}
export declare class Computed<P> extends Signal<P> {
    computeFn: () => P;
    dependencies: Set<Signal<P>>;
    constructor(computeFn: any);
    compute(val?: boolean): void;
    update: () => void;
}
export declare function effect(fn: any): () => void;
export declare function state<P>(value: P): Signal<P>;
export declare function stateArray<P>(value: P[]): Signal<Signal<P>[]>;
export declare function computed<P>(cb: () => P): Computed<P>;
//# sourceMappingURL=signals.d.ts.map