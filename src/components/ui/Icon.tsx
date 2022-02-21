import React from 'react';
import styled from 'styled-components';
// @ts-ignore
// import skillLock from '../../images/skillLock.png';
import { LOCKED_STATE } from '../constants';
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
  locked: boolean;
}

const Icon = React.memo(function({
  src,
  title,
  containerWidth,
  currentState,
}: Props) {
  return (
    <StyledIcon data-testid="icon-container" containerWidth={containerWidth}>
      {/* {currentState === LOCKED_STATE && (
        <LockImage src={skillLock} alt={'Locked'} />
      )} */}
      <Image src={src} alt={title} locked={currentState === LOCKED_STATE} />
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
`;

const Image = styled.img<ImageProps>`
  pointer-events: none;
  height: 75%;
  margin: auto;
  width: 75%;
  /* ${props =>
    props.locked &&
    `
    opacity: 0.3;
  `} */
`;

// const LockImage = styled.img`
//   pointer-events: none;
//   height: 100%;
//   margin: auto;
//   width: 100%;
//   z-index: 2;
//   position: absolute;
// `;
