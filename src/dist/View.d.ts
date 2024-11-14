import { Signal } from './signals';
import { ViewMode } from './ViewMode';
export declare class View<P = {}> extends HTMLElement {
    props: P;
    styleTag?: HTMLStyleElement;
    refs: ProxyConstructor;
    $c: Signal<unknown>[];
    $scopedId: string;
    constructor(viewMode?: ViewMode);
    get root(): ShadowRoot | Element;
    styles(): string;
    def(): object;
    protected connectedCallback(): void;
    disconnectedCallback(): void;
    adoptedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    connected(): void;
    disconnected(): void;
    adopted(): void;
    attributeChanged(name: any, oldValue: any, newValue: any): void;
    protected createStyleTag(): void;
    protected updateStyles(): void;
    updateRender(): void;
    emit(name: string, data?: unknown): void;
}
//# sourceMappingURL=View.d.ts.map