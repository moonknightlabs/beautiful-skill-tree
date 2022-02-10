export declare type Dictionary<T> = {
    [key: string]: T;
};
export declare type Nullable<T> = T | null;
export declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
