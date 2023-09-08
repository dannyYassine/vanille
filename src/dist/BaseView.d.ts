export declare abstract class BaseView extends HTMLElement {
    refs: typeof Proxy;
    $scopedId: string;
    constructor();
    abstract render(): any;
    setBindings(): void;
    protected connectedCallback(): void;
    removeAllChildren(): void;
    update(): void;
}
//# sourceMappingURL=BaseView.d.ts.map