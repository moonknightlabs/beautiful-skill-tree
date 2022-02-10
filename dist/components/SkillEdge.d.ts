import React from 'react';
import { NodeState } from '../models';
import { Nullable } from 'models/utils';
export interface Props {
    parentHasMultipleChildren: boolean;
    childNodeRef: React.MutableRefObject<Nullable<HTMLDivElement>>;
    state: NodeState;
    parentPosition: number;
}
declare function SkillEdge(props: Props): JSX.Element;
export default SkillEdge;
