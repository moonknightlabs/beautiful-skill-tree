import * as React from 'react';
import { throttle } from 'lodash';
import styled from 'styled-components';
import { LOCKED_STATE, UNLOCKED_STATE, SELECTED_STATE } from './constants';
import SkillTreeSegment from './SkillTreeSegment';
import Tooltip from './tooltip/Tooltip';
import { Skill, NodeState } from '../models';
import Node from './ui/Node';

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

function SkillNode({
  skill,
  nodeState,
  currentLevel,
  incSkillCount,
  // decSkillCount,
  updateSkillState,
  handleNodeSelect = () => null,
}: Props) {
  const { children, title, tooltip, id, optional } = skill;
  const [parentPosition, setParentPosition] = React.useState(0);
  const [learned, setLearned] = React.useState(skill.learned);
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

    if (nodeState === UNLOCKED_STATE) {
      if (learned < skill.levels.length) {
        setLearned(learned + 1);
        console.log(learned);
        return;
      }
    }
    // return;
    handleNodeSelect(id, UNLOCKED_STATE, skill);
    return updateSkillState(id, UNLOCKED_STATE, optional);
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
      incSkillCount(optional);
      handleNodeSelect(id, SELECTED_STATE, skill);
      return updateSkillState(id, SELECTED_STATE, optional);
    }
  }, [learned]);
  const hasMultipleChildren = children.length > 1;

  return (
    <React.Fragment>
      <StyledSkillNode>
        <Tooltip title={title} tooltip={tooltip}>
          <Node
            handleClick={handleClick}
            id={id}
            currentState={nodeState}
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
                parentHasMultipleChildren={hasMultipleChildren}
                shouldBeUnlocked={
                  nodeState === SELECTED_STATE &&
                  currentLevel >= child.requiredLevel
                }
                skill={child}
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
`;
