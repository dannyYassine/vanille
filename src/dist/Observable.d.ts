export interface ObservableEvent {
    $$listeners: {
        string: unknown;
    };
    $on<T>(event: string, cb: (nv: T, ov: T, obj: object) => void): void;
}
export type Observable<T> = T & ObservableEvent;
export declare function observable<T>(data: T): Observable<T> | null;
//# sourceMappingURL=Observable.d.ts.map