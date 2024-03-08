import { BaseView } from './BaseView';
export declare class Route extends BaseView {
    props: {
        startWith?: string;
        path?: string;
    };
    matchesRoute: boolean;
    location: Location;
    constructor();
    setBindings(): void;
    checkPath(): void;
    matchesPattern(): boolean;
    render(): "" | (string | {
        ref: string;
    })[];
}
//# sourceMappingURL=Route.d.ts.map