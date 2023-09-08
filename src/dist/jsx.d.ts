export declare function h(...args: any[]): any[];
type HasScopedId = {
    $scopedId: string;
};
type HasProps = {
    props: {
        string: any;
    };
};
export declare function render(jsx: Array<unknown>, document: Document): HTMLElement & HasScopedId & HasProps;
export {};
//# sourceMappingURL=jsx.d.ts.map