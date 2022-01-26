import React, { useRef, useEffect, useContext, useCallback } from 'react';
import { isEmpty } from 'lodash';
import SkillNode from './SkillNode';
import SkillEdge from './SkillEdge';
import { Skill } from '../models';
import { Nullable } from '../models/utils';
import SkillContext from '../context/SkillContext';
import { SELECTED_STATE, LOCKED_STATE, UNLOCKED_STATE } from './constants';

type Props = {
  skill: Skill;
  parentPosition: number;
  parentHasMultipleChildren: boolean;
  shouldBeUnlocked: boolean;
  currentLevel: string | number | number;
} & typeof SkillTreeSegment.defaultProps;

function SkillTreeSegment({
  skill,
  hasParent,
  parentHasMultipleChildren,
  parentPosition,
  shouldBeUnlocked,
  currentLevel,
}: Props) {
  const {
    mounting,
    skills,
    updateSkillState,
    decrementSelectedCount,
    incrementSelectedCount,
    handleNodeSelect,
    handleNodeRemove,
  } = useContext(SkillContext);

  const skillNodeRef: React.MutableRefObject<Nullable<HTMLDivElement>> = useRef(
    null
  );
  const [learned, setLearned] = React.useState(skill.learned);
  const nodeState = skills[skill.id] ? skills[skill.id].nodeState : 'locked';

  useEffect(() => {
    setLearned(skill.learned);
  }, [skill.learned]);

  useEffect(() => {
    if (mounting) return;

    if (nodeState === SELECTED_STATE && !shouldBeUnlocked) {
      decrementSelectedCount();
      return updateSkillState(skill.id, LOCKED_STATE, skill.optional);
    }

    if (nodeState === UNLOCKED_STATE && !shouldBeUnlocked) {
      setLearned(0);
      return updateSkillState(skill.id, LOCKED_STATE, skill.optional);
    }

    if (!shouldBeUnlocked) {
      return;
    }

    if (nodeState === LOCKED_STATE && shouldBeUnlocked) {
      return updateSkillState(skill.id, UNLOCKED_STATE, skill.optional);
    }

    if (nodeState === SELECTED_STATE && shouldBeUnlocked && learned === 0) {
      return updateSkillState(skill.id, UNLOCKED_STATE, skill.optional);
    }
  }, [nodeState, shouldBeUnlocked, mounting, learned]);

  useEffect(() => {
    if (mounting) return;

    if (isEmpty(skills)) {
      return updateSkillState(skill.id, UNLOCKED_STATE);
    }

    return;
  }, [mounting]);

  const handleLearnedChange = (newValue: number) => {
    setLearned(newValue);
  };
  return (
    <div
      style={{
        margin: !hasParent ? '16px 0' : '',
      }}
    >
      {hasParent && (
        <SkillEdge
          parentHasMultipleChildren={parentHasMultipleChildren}
          state={nodeState}
          childNodeRef={skillNodeRef}
          parentPosition={parentPosition}
        />
      )}
      <div ref={skillNodeRef}>
        <SkillNode
          incSkillCount={useCallback(incrementSelectedCount, [])}
          decSkillCount={useCallback(decrementSelectedCount, [])}
          updateSkillState={updateSkillState}
          currentLevel={currentLevel}
          skill={skill}
          learned={learned}
          handleLearnedChange={handleLearnedChange}
          nodeState={nodeState}
          handleNodeSelect={handleNodeSelect}
          handleNodeRemove={handleNodeRemove}
        />
      </div>
    </div>
  );
}

SkillTreeSegment.defaultProps = {
  hasParent: true,
};

export default SkillTreeSegment;
