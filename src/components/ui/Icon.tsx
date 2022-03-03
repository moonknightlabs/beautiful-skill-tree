import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import skillLock from '../../images/skillLock.png';
// @ts-ignore
import skillDefault from '../../images/skillDefault.png';
import { SELECTED_STATE, LOCKED_STATE } from '../constants';
export interface Props {
  containerWidth: number;
  src: string;
  title: string;
  currentState: string;
}

interface StyledIconProps {
  containerWidth: number;
}

interface ImageProps {
  selected: boolean;
}

const Icon = React.memo(function({
  src,
  title,
  containerWidth,
  currentState,
}: Props) {
  return (
    <StyledIcon data-testid="icon-container" containerWidth={containerWidth}>
      {currentState === LOCKED_STATE && (
        <LockImage src={skillLock} alt={'Locked'} />
      )}
      <Image
        src={src}
        alt={title}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = skillDefault;
        }}
        selected={currentState === SELECTED_STATE}
      />
    </StyledIcon>
  );
});

export default Icon;

const StyledIcon = styled.div.attrs<StyledIconProps>(props => ({
  style: {
    height: `${props.containerWidth}px`,
    width: `${props.containerWidth}px`,
  },
}))<StyledIconProps>`
  display: flex;
  &:hover {
    transition: 0.3s;
    background: #b6b0aa;
    border-radius: 5px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 0 12px 0 rgba(255, 255, 255, 1);
  }
`;

const Image = styled.img<ImageProps>`
  pointer-events: none;
  height: 100%;
  margin: auto;
  width: 100%;
  ${props =>
    props.selected &&
    `
    position: relative;
    top: 2px;
    left: 0;
  `}
`;

const LockImage = styled.img`
  pointer-events: none;
  height: 100%;
  margin: auto;
  width: 100%;
  z-index: 2;
  position: absolute;
  filter: brightness(1.5);
`;
