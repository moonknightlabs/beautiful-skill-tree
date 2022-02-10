import { Skill } from '../models';
declare type Props = {
    skill: Skill;
    parentPosition: number;
    parentHasMultipleChildren: boolean;
    shouldBeUnlocked: boolean;
    currentLevel: string | number | number;
} & typeof SkillTreeSegment.defaultProps;
declare function SkillTreeSegment({ skill, hasParent, parentHasMultipleChildren, parentPosition, shouldBeUnlocked, currentLevel, }: Props): JSX.Element;
declare namespace SkillTreeSegment {
    var defaultProps: {
        hasParent: boolean;
    };
}
export default SkillTreeSegment;
