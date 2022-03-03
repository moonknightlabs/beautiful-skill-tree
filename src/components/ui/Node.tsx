import * as React from 'react';
import styled, { BaseThemedCssFunction } from 'styled-components';
import { SELECTED_STATE, UNLOCKED_STATE, LOCKED_STATE } from '../constants';
import { Skill } from '../../models';
import Icon from './Icon';
import isIOSDevice from '../../helpers/isIOS';
import { SkillThemeType } from '../../';
import useMobile from '../../hooks/useMobile';
// import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';
//@ts-ignore
import skillLock from '../../images/skillLock.png';
const keyframes = require('styled-components').keyframes;
const css: BaseThemedCssFunction<SkillThemeType> = require('styled-components')
  .css;

interface Props {
  handleClick: VoidFunction;
  handleRightClick: VoidFunction;
  id: string;
  currentState: string;
  skill: Skill;
  learned: number;
  isOwner: boolean;
}

interface StyledNodeProps {
  optional: boolean;
  selected: boolean;
  unlocked: boolean;
  locked: boolean;
  isIOS: boolean;
  color: 'default' | 'alternative';
}

interface TextProp {
  selected: boolean;
}

const Node = React.forwardRef(function Node(
  props: Props,
  ref: React.Ref<HTMLDivElement>
) {
  const {
    handleClick,
    handleRightClick,
    id,
    currentState,
    skill,
    learned,
    isOwner,
  } = props;
  // console.log('Skill', skill);
  const { color = 'default' } = skill;
  const [isIOS, setIsIOS] = React.useState(false);
  const isMobile = useMobile();
  const memoizedHandleKeyDown = React.useCallback(
    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
      if (e.keyCode === 13) {
        handleClick();
      }
    },
    [handleClick]
  );

  React.useEffect(() => {
    setIsIOS(isIOSDevice());
  }, []);

  const checkForClickType = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isMobile || !isOwner) return;
    if (e.button === 0) {
      handleClick();
    } else if (e.button === 2) {
      handleRightClick();
    }
  };

  return (
    <StyledNode
      onClick={checkForClickType}
      onContextMenu={checkForClickType}
      onKeyDown={memoizedHandleKeyDown}
      ref={ref}
      tabIndex={0}
      data-testid={id}
      optional={skill.optional || false}
      isIOS={isIOS}
      selected={currentState === SELECTED_STATE}
      unlocked={currentState === UNLOCKED_STATE}
      locked={currentState === LOCKED_STATE}
      color={color}
    >
      {'icon' in skill ? (
        <IconNode>
          {skill.availableInGame && (
            <AvailableInGameNode>
              <CheckBoxIcon />
            </AvailableInGameNode>
          )}
          <Icon
            title="node-icon"
            src={skill.icon}
            currentState={currentState}
            containerWidth={64}
          />
          <LevelNode>
            {/* {skill.learned}/{skill.levels.length} */}
            {learned}/{skill.levels.length}
          </LevelNode>
        </IconNode>
      ) : (
        <TextNode>
          {color === 'default' ? (
            <>
              <Text>{skill.title}</Text>
              <TextLevelNode>
                {/* {skill.learned}/{skill.levels.length} */}
                {learned}/{skill.levels.length}
              </TextLevelNode>
            </>
          ) : (
            <>
              <AlternativeText selected={currentState === SELECTED_STATE}>
                {skill.title}
              </AlternativeText>
              <TextLevelNode>
                {/* {skill.learned}/{skill.levels.length} */}
                {learned}/{skill.levels.length}
              </TextLevelNode>
            </>
          )}
        </TextNode>
      )}
    </StyledNode>
  );
});

export default Node;

const shadowburst = keyframes`
  from {
    box-shadow: 0 0 18px 0 rgba(255, 255, 255, 1);
  }

  20% {
    box-shadow: 0 0 24px 0 rgba(255, 255, 255, 1);
  }

  to {
    box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0);
  }
`;

const shadowpulse = keyframes`
  from,
  20% {
    box-shadow: 0 0 8px 0 rgba(255, 255, 255, 0.5);
  }

  to {
    box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0.5);
  }
`;

const StyledNode = styled.div<StyledNodeProps>`
  background: ${({ theme }) => theme.nodeBackgroundColor};
  padding: 2px 0;
  border-color: ${({ theme }) => theme.nodeBorderColor};
  box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0);
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  display: flex;
  margin: 0 3px;
  outline: none;
  position: relative;
  transition: box-shadow 0.6s, opacity 1s;
  user-select: none;
  z-index: 98;
  
  @media (min-width: 410px) {
    margin: 0 8px;
  }

  @media (min-width: 900px) {
    margin: 0 16px;
    outline: initial;
    outline-color: white;
  }

  ${props =>
    props.selected &&
    css`
      position: relative;
      border-radius: 50% / 10%;
      color: white;
      width: 65px;
      height: 68px;
      text-align: center;
      text-indent: 0.1em;
      animation: ${shadowburst} 1s 1;
      background: ${({ theme }) =>
        props.color === 'default'
          ? theme.nodeActiveBackgroundColor
          : theme.nodeAlternativeActiveBackgroundColor};

      &:before {
        content: '';
        position: absolute;
        top: 10%;
        bottom: 10%;
        right: -5%;
        left: -5%;
        background: inherit;
        border-radius: 4% / 50%;
      }
    `}

  ${props =>
    props.unlocked &&
    css`
      /* animation: ${shadowpulse} 1s infinite alternate;
      box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.5); */

      &:after,
      &:before {
        border: 0 solid;
        border-image-source: ${({ theme }) => theme.nodeHoverBorderColor};
        border-image-slice: 1;
        content: ' ';
        opacity: 0;
        height: 0;
        transition: opacity 0.6s, width 0.6s, height 0.6s;
        position: absolute;
        width: 0;
      }

      &:after {
        border-top: ${({ theme }) => theme.nodeHoverBorder};
        border-left: ${({ theme }) => theme.nodeHoverBorder};
        top: 0;
        left: 0;
      }

      &:before {
        bottom: 0px;
        right: 0px;
        border-bottom: ${({ theme }) => theme.nodeHoverBorder};
        border-right: ${({ theme }) => theme.nodeHoverBorder};
      }

      /* &:hover,
      &:focus {
        animation: none;
        box-shadow: 0 0 12px 0 rgba(255, 255, 255, 1);

        &:after,
        &:before {
          opacity: 1;
          height: 85%;
          transition: width 0.6s, height 0.6s;
          width: ${(props: StyledNodeProps) => (props.isIOS ? 0 : '95%')};
        }
      } */
    `}

    ${props =>
      props.unlocked &&
      props.optional &&
      css`
        background: ${({ theme }) => theme.nodeBackgroundColor};
      `}

  ${props =>
    props.locked &&
    `
        cursor: initial;
        opacity: 0.65;
    `}
`;

const IconNode = styled.div`
  width: ${({ theme }) => theme.nodeIconNodeWidth};
`;

const LevelNode = styled.div`
  background-color: black;
  position: absolute;
  padding: 6px 4px;
  border-radius: 50%;
  font-size: 14px;
  bottom: -15px;
  right: 22%;
  z-index: 99;
  font-weight: bold;
  border: 2px solid darkgray;
`;

const AvailableInGameNode = styled.div`
  background: #2a2936;
  color: #31d0aa;
  position: absolute;
  left: -15px;
  top: -10px;
  z-index: 99;
`;
const TextLevelNode = styled.div`
  background-color: black;
  position: absolute;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  bottom: -15px;
  right: -25px;
  z-index: 99;

  @media (max-width: 900px) {
    font-size: 12px;
    bottom: -15px;
  }
`;

const TextNode = styled.div`
  align-items: center;
  display: flex;
  font-weight: 600;
  justify-content: center;
  height: ${({ theme }) => theme.nodeMobileTextNodeHeight};
  width: ${({ theme }) => theme.nodeMobileTextNodeWidth};

  @media (min-width: 900px) {
    height: ${({ theme }) => theme.nodeDesktopTextNodeHeight};
    width: ${({ theme }) => theme.nodeDesktopTextNodeWidth};
  }
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.nodeMobileFontSize};
  text-overflow: ellipsis;
  margin: 0;
  overflow: hidden;
  padding: 0 8px;
  white-space: nowrap;

  @media (min-width: 900px) {
    font-size: ${({ theme }) => theme.nodeDesktopFontSize};
  }
`;

const AlternativeText = styled(Text)<TextProp>`
  color: ${({ theme }) => theme.nodeAlternativeFontColor};

  ${props =>
    props.selected &&
    css`
      color: ${({ theme }) => theme.nodeAltenativeActiveFontColor};
    `};
`;
