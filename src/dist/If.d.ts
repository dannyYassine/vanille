import { BaseView } from './BaseView';
import { Observable } from './Observable';
export declare class If extends BaseView {
    props: Observable<{
        value: boolean;
    }>;
    setBindings(): void;
    render(): "" | (string | {
        ref: string;
    })[];
}
//# sourceMappingURL=If.d.ts.map