import { Action } from 'models';
declare type State = {
    selectedSkillCount: {
        required: number;
        optional: number;
    };
};
declare function reducer(state: State, action: Action): State;
export default reducer;
