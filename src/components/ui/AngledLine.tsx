import styled from 'styled-components';
import { Direction } from '../../models';

export interface AngledLineProps {
  unlocked: boolean;
  selected: boolean;
}

export interface AngledLineVerticalProps {
  direction: Direction;
}

export interface AngledLineHoriztonalProps {
  direction: Direction;
  width: number;
}

export const StyledAngledLine = styled.div<AngledLineProps>`
  background: linear-gradient(
    to right,
    rgba(49, 208, 170, 1) 0%,
    rgba(49, 208, 170, 1) 50%,
    rgba(49, 208, 170, 0) 51%,
    rgba(49, 208, 170, 0) 100%
  );
  background-size: 210% 100%;
  background-position: right top;
  border: ${({ theme }) => theme.edgeBorder};
  height: 4px;
  position: absolute;
  opacity: 0.5;
  transition: opacity 0.6s;

  ${props =>
    props.unlocked &&
    `
      opacity: 1;
  `}
`;
