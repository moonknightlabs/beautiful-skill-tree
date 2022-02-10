import { Dictionary, Nullable } from '../models/utils';
declare type Store = Dictionary<string>;
declare class MockLocalStorage {
    private store;
    constructor(defaultStore: Store);
    getItem(key: string): Nullable<string>;
    setItem(key: string, value: string): void;
}
export default MockLocalStorage;
