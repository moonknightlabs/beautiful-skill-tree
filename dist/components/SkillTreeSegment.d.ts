import { Skill } from '../models';
declare type Props = {
  skill: Skill;
  parentPosition: number;
  parentHasMultipleChildren: boolean;
  isOwner: boolean;
  shouldBeUnlocked: boolean;
  currentLevel: string | number | number;
  skillPoint: string | number;
} & typeof SkillTreeSegment.defaultProps;
declare function SkillTreeSegment({
  skill,
  hasParent,
  parentHasMultipleChildren,
  parentPosition,
  shouldBeUnlocked,
  currentLevel,
  skillPoint,
  isOwner,
}: Props): JSX.Element;
declare namespace SkillTreeSegment {
  var defaultProps: {
    hasParent: boolean;
  };
}
export default SkillTreeSegment;
