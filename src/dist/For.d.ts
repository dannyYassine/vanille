import { View } from './View';
export declare class For extends View<{
    items: any[];
    key?: string;
    template: (item: any, index: number) => any;
}> {
    private markersByKey;
    private itemsByKey;
    constructor();
    connectedCallback(): void;
    private getItemKey;
    private shouldUpdateItem;
    private updateList;
    private createNewItem;
    private updateExistingItem;
    private removeItem;
}
//# sourceMappingURL=For.d.ts.map