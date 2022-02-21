import * as React from 'react';
import styled from 'styled-components';
// @ts-ignore
import CloseIcon from '../../images/close.svg';
import useMobile from '../../hooks/useMobile';
import { NodeState } from 'models';
import { LOCKED_STATE } from '../constants';

type Props = {
  content: React.ReactNode;
  title: string;
  currentState: NodeState;
  type: string;
  isOwner: boolean;
  handleClose: () => void;
  handleSelect: () => void;
  handleRemove: () => void;
};

const TooltipContent = React.memo(function({
  content,
  title,
  currentState,
  type,
  isOwner,
  handleClose,
  handleSelect,
  handleRemove,
}: Props) {
  const isMobile = useMobile();
  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>{title}</Title>
        <img
          onClick={handleClose}
          style={{
            width: '16px',
            margin: '21px 4px auto 0',
            cursor: 'pointer',
          }}
          src={CloseIcon}
          alt="icon"
        />
      </div>
      <Type>{type} Skill</Type>
      <ContentContainer>{content}</ContentContainer>
      {isOwner && isMobile && currentState !== LOCKED_STATE && (
        <ButtonContainer>
          <Button onClick={handleRemove}>-1 Level</Button>
          <Button onClick={handleSelect}>+1 Level</Button>
        </ButtonContainer>
      )}
    </React.Fragment>
  );
});

export default TooltipContent;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.headingFont};
  font-size: ${({ theme }) => theme.tooltipTitleFontSize};
  margin: 8px 0 0;
`;

const Type = styled.div`
  font-weight: bold;
`;

const ContentContainer = styled.div`
  margin: 8px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 30px;
  margin: 20px 0 10px;
`;

const Button = styled.button`
  border: 1px solid #79ecc7;
  background: transparent;
  padding: 10px;
  color: #79ecc7;
  transition: 0.2s;
  width: 100%;
  border-radius: 5px;

  :hover {
    background-color: #79ecc7;
    cursor: pointer;
    color: white;
  }
`;
