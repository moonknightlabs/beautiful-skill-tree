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
  handleClose: () => void;
  handleSelect: () => void;
  handleRemove: () => void;
};

const TooltipContent = React.memo(function({
  content,
  title,
  currentState,
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
      <ContentContainer>{content}</ContentContainer>
      {isMobile && currentState !== LOCKED_STATE && (
        <ButtonContainer>
          <Button onClick={handleSelect}>Learn</Button>
          <Button onClick={handleRemove}>Unlearn</Button>
        </ButtonContainer>
      )}
    </React.Fragment>
  );
});

export default TooltipContent;

const Title = styled.h1`
  margin: 8px 0;
`;

const ContentContainer = styled.div`
  margin: 8px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  border: 1px solid #fec602;
  background: transparent;
  padding: 10px;
  color: #fec602;
  transition: 0.2s;

  :hover {
    background-color: #fec602;
    color: white;
  }
`;
