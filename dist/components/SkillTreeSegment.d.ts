import { Skill } from '../models';
declare type Props = {
  skill: Skill;
  parentPosition: number;
  parentHasMultipleChildren: boolean;
  shouldBeUnlocked: boolean;
} & typeof SkillTreeSegment.defaultProps;
declare function SkillTreeSegment({
  skill,
  hasParent,
  parentHasMultipleChildren,
  parentPosition,
  shouldBeUnlocked,
}: Props): JSX.Element;
declare namespace SkillTreeSegment {
  var defaultProps: {
    hasParent: boolean;
  };
}
export default SkillTreeSegment;
