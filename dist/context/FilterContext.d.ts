import * as React from 'react';
import { SkillMap } from '../models';
interface Props {
    children: React.ReactNode;
}
interface IFilterContext {
    filtersMatches: Set<string> | null;
    handleFilter: (query: string) => void;
    addToSkillMap: (skillMap: SkillMap) => void;
}
declare const FilterContext: React.Context<IFilterContext>;
export declare function FilterProvider(props: Props): JSX.Element;
export default FilterContext;
