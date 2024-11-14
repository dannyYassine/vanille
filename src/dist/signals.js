"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computed = exports.stateArray = exports.state = exports.effect = exports.Computed = exports.Signal = void 0;
class Signal {
    value;
    subscribers;
    constructor(initialValue) {
        this.value = initialValue;
        this.subscribers = new Set();
    }
    get() {
        // Track the signal's access (assume some global tracking function is available)
        if (globalThis.trackDependency) {
            globalThis.trackDependency(this);
        }
        return this.value;
    }
    set(newValue) {
        if (typeof newValue === 'function') {
            newValue = newValue(this.value);
        }
        if (this.value !== newValue) {
            const oldValue = this.value;
            this.value = newValue;
            this.notifySubscribers(this.value, oldValue);
        }
    }
    mutSet(newValue) {
        const oldValue = this.value;
        if (typeof newValue === 'function') {
            newValue(this.value);
        }
        this.notifySubscribers(this.value, oldValue);
    }
    subscribe(callback) {
        const unsubscribe = () => {
            this.unsubscribe(callback);
        };
        this.subscribers.add(callback);
        return unsubscribe;
    }
    // Unsubscribe from changes
    unsubscribe(callback) {
        this.subscribers.delete(callback);
    }
    notifySubscribers(newValue, oldValue) {
        this.subscribers.forEach((callback) => callback(this.value, oldValue));
    }
}
exports.Signal = Signal;
// Implementation of Signal.Computed
class Computed extends Signal {
    computeFn;
    dependencies;
    constructor(computeFn) {
        super();
        this.computeFn = computeFn;
        this.value = undefined;
        this.subscribers = new Set();
        this.dependencies = new Set(); // Track dependencies (other signals)
        // Compute the initial value and set up tracking
        this.compute(true);
    }
    // Compute the value and track dependencies
    compute(val) {
        // Unsubscribe from previous dependencies
        // this.dependencies.forEach((dep) => dep.unsubscribe(this.update));
        // Track dependencies during the computation
        // this.dependencies.clear();
        if (val) {
            // Monkey-patch the dependency tracking system
            const trackDependency = (signal) => {
                this.dependencies.add(signal);
                signal.subscribe(this.update); // Subscribe to changes
            };
            // Temporarily replace the global `trackDependency` function
            globalThis.trackDependency = trackDependency;
        }
        // Compute the new value
        const newValue = this.computeFn();
        // Clean up the monkey-patch
        delete globalThis.trackDependency;
        // If the computed value has changed, notify subscribers
        if (newValue !== this.value) {
            const oldValue = this.value;
            this.value = newValue;
            this.notifySubscribers(this.value, oldValue);
        }
    }
    // Method to call when a dependency changes
    update = () => {
        this.compute(); // Recompute value when dependencies change
    };
}
exports.Computed = Computed;
function effect(fn) {
    const signals = [];
    // Assume we have some mechanism to track dependencies
    globalThis.trackDependency = (signal) => {
        signal.subscribe(fn); // Subscribe to changes
        signals.push(signal);
    };
    // Run the effect function
    fn();
    // Clean up the monkey-patch
    delete globalThis.trackDependency;
    // Subscribe the effect to signal changes
    const unsubscribe = () => {
        // Cleanup logic to unsubscribe if needed
        signals.forEach((signal) => {
            signal.unsubscribe(fn); // Subscribe to changes
        });
    };
    // Return an unsubscribe function
    return unsubscribe;
}
exports.effect = effect;
function state(value) {
    return new Signal(value);
}
exports.state = state;
;
function stateArray(value) {
    return new Signal(value.map((val) => new Signal(val)));
}
exports.stateArray = stateArray;
;
function computed(cb) {
    return new Computed(cb);
}
exports.computed = computed;
;
//# sourceMappingURL=signals.js.map