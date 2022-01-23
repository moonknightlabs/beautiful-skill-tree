import * as React from 'react';
import { Skill, NodeState } from '../models';
interface Props {
  skill: Skill;
  nodeState: NodeState;
  currentLevel: number | string;
  learned: number;
  handleLearnedChange: (newValue: number) => void;
  incSkillCount: (optional?: boolean) => void;
  decSkillCount: (optional?: boolean) => void;
  handleNodeSelect?: (
    key: string,
    state: NodeState,
    skill: Skill,
    lerned: number
  ) => void;
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
  learned,
  handleLearnedChange,
  incSkillCount,
  updateSkillState,
  handleNodeSelect,
}: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof SkillNode>;
export default _default;
