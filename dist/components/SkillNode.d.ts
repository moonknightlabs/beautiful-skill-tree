import * as React from 'react';
import { Skill, NodeState } from '../models';
interface Props {
  skill: Skill;
  nodeState: NodeState;
  currentLevel: string;
  incSkillCount: (optional?: boolean) => void;
  decSkillCount: (optional?: boolean) => void;
  handleNodeSelect?: (key: string, state: NodeState, skill: Skill) => void;
  updateSkillState: (
    key: string,
    updatedState: NodeState,
    optional?: boolean
  ) => void;
}
declare function SkillNode({
  skill,
  nodeState,
  currentLevel,
  incSkillCount,
  updateSkillState,
  handleNodeSelect,
}: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof SkillNode>;
export default _default;
