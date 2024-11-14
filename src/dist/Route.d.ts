import { View } from './View';
export declare class Route extends View<{
    startWith?: string;
    path?: string;
    group?: string;
}> {
    matchesRoute: boolean;
    location: Location;
    constructor();
    connected(): void;
    checkPath(): void;
    matchesPattern(): boolean;
    render(): "" | (string | {
        ref: string;
    })[];
}
//# sourceMappingURL=Route.d.ts.map