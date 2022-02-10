import * as React from 'react';
import { SkillCount, Action } from '../models';
declare type Props = {
    children: React.ReactNode;
};
export interface IAppContext {
    skillCount: SkillCount;
    addToSkillCount: (skilCount: SkillCount) => void;
    selectedSkillCount: SkillCount;
    dispatch: React.Dispatch<Action>;
    resetId: string;
    resetSkills: VoidFunction;
}
declare const AppContext: React.Context<IAppContext>;
export declare const initialState: {
    selectedSkillCount: {
        required: number;
        optional: number;
    };
};
export declare function AppProvider({ children }: Props): JSX.Element;
export default AppContext;
