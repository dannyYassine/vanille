import { BaseView } from './BaseView';
import { Observable } from './Observable';
export declare class List extends BaseView {
    props: Observable<{
        value: any[];
        key?: string;
        item: (i: any) => any;
    }>;
    setBindings(): void;
    render(): any[] | "";
}
//# sourceMappingURL=List.d.ts.map