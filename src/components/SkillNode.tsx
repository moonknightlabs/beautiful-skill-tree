import React from 'react';
import { throttle } from 'lodash';
import styled from 'styled-components';
import { LOCKED_STATE, UNLOCKED_STATE, SELECTED_STATE } from './constants';
import SkillTreeSegment from './SkillTreeSegment';
import Tooltip from './tooltip/Tooltip';
import { Skill, NodeState, SkillData } from '../models';
import Node from './ui/Node';
interface Props {
  skill: Skill;
  nodeState: NodeState;
  currentLevel: number | string;
  learned: number;
  skillPoint: string | number;
  childrenLearnedState: SkillData[];
  isOwner: boolean;
  handleLearnedChange: (newValue: number) => void;
  incSkillCount: (optional?: boolean) => void;
  decSkillCount: (optional?: boolean) => void;
  handleNodeSelect?: (
    key: string,
    state: NodeState,
    skill: Skill,
    lerned: number
  ) => void;
  handleNodeRemove?: (
    key: string,
    state: NodeState,
    skill: Skill,
    lerned: number
  ) => void;
  updateSkillState: (
    key: string,
    updatedState: NodeState,
    updatedLearnedState: number,
    optional?: boolean
  ) => void;
}

function SkillNode({
  skill,
  nodeState,
  currentLevel,
  learned,
  skillPoint,
  childrenLearnedState,
  isOwner,
  handleLearnedChange,
  updateSkillState,
  handleNodeSelect = () => null,
  handleNodeRemove = () => null,
}: Props) {
  const { children, title, tooltip, id, optional, type } = skill;
  const [parentPosition, setParentPosition] = React.useState(0);
  const skillNodeRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const childWidth: React.MutableRefObject<number> = React.useRef(0);

  function calculatePosition() {
    const { left, right } = skillNodeRef.current!.getBoundingClientRect();

    const scrollX = window.scrollX;

    setParentPosition((right - left) / 2 + left + scrollX);
  }

  function calculateOverlayWidth() {
    childWidth.current = skillNodeRef.current!.clientWidth;
  }

  function handleResize() {
    calculatePosition();
    calculateOverlayWidth();
  }

  function handleClick() {
    if (nodeState === LOCKED_STATE) {
      return null;
    }

    if (skillPoint === 0) {
      return;
    }
    if (nodeState === UNLOCKED_STATE) {
      if (learned < skill.levels.length) {
        handleLearnedChange(learned + 1);
        if (learned < skill.levels.length - 1) {
          handleNodeSelect(id, UNLOCKED_STATE, skill, learned + 1);
          return updateSkillState(id, UNLOCKED_STATE, learned + 1, optional);
        }
        if (learned === skill.levels.length - 1) {
          handleNodeSelect(id, SELECTED_STATE, skill, learned + 1);
          return updateSkillState(id, SELECTED_STATE, learned + 1, optional);
        }
        return;
      }
    }
    return;
  }

  function handleRightClick() {
    if (nodeState === LOCKED_STATE) {
      handleLearnedChange(0);
      return null;
    }

    if (learned === skill.actualLearned) {
      return;
    }

    if (nodeState === UNLOCKED_STATE) {
      if (learned > 0) {
        handleLearnedChange(learned - 1);
        if (learned === 0) {
          handleNodeRemove(id, LOCKED_STATE, skill, learned - 1);
          return updateSkillState(id, LOCKED_STATE, learned - 1, optional);
        }
        handleNodeRemove(id, UNLOCKED_STATE, skill, learned - 1);
        return updateSkillState(id, UNLOCKED_STATE, learned - 1, optional);
      }
    }

    if (nodeState === SELECTED_STATE) {
      if (
        childrenLearnedState &&
        childrenLearnedState.filter(child => {
          return child.learned > 0;
        }).length > 0
      ) {
        return;
      }
      handleLearnedChange(learned - 1);
      handleNodeRemove(id, UNLOCKED_STATE, skill, learned - 1);
      return updateSkillState(id, UNLOCKED_STATE, learned - 1, optional);
    }
    return;
  }

  React.useEffect(() => {
    const throttledHandleResize = throttle(handleResize, 200);

    calculatePosition();
    calculateOverlayWidth();

    window.addEventListener('resize', throttledHandleResize);

    return function cleanup() {
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, []);

  React.useEffect(() => {
    if (learned === skill.levels.length) {
      return updateSkillState(id, SELECTED_STATE, learned, optional);
    }
  }, [learned]);

  const hasMultipleChildren = children.length > 1;

  return (
    <React.Fragment>
      <StyledSkillNode>
        <Tooltip
          title={title}
          tooltip={tooltip}
          type={type}
          isOwner={isOwner}
          handleSelect={handleClick}
          handleRemove={handleRightClick}
          currentState={nodeState}
        >
          <Node
            handleClick={handleClick}
            handleRightClick={handleRightClick}
            id={id}
            isOwner={isOwner}
            currentState={nodeState}
            learned={learned}
            skill={skill}
            ref={skillNodeRef}
          />
        </Tooltip>
      </StyledSkillNode>

      {children.length > 0 && (
        <SkillTreeSegmentWrapper>
          {children.map(child => {
            return (
              <SkillTreeSegment
                key={child.id}
                hasParent
                currentLevel={currentLevel}
                parentPosition={parentPosition}
                isOwner={isOwner}
                parentHasMultipleChildren={hasMultipleChildren}
                shouldBeUnlocked={
                  nodeState === SELECTED_STATE &&
                  currentLevel >= child.requiredLevel
                }
                skill={child}
                skillPoint={skillPoint}
              />
            );
          })}
        </SkillTreeSegmentWrapper>
      )}
    </React.Fragment>
  );
}

export default React.memo(SkillNode);

const StyledSkillNode = styled.div`
  margin: 0 auto;
  position: relative;
  width: fit-content;
`;

const SkillTreeSegmentWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  column-gap: 50px;
`;
