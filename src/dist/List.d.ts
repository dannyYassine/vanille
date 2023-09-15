import { BaseView } from './BaseView';
import { Observable } from './Observable';
export declare class List extends BaseView {
    props: Observable<{
        value: any[];
        key?: string;
        item: (i: any) => any;
    }>;
    constructor();
    setBindings(): void;
    render(): void;
}
//# sourceMappingURL=List.d.ts.map