import React, { useContext, useRef } from 'react';
import TooltipContent from './TooltipContent';
import styled, { ThemeContext } from 'styled-components';
import Tippy from '@tippy.js/react';
import { Instance, Props as TProps } from 'tippy.js';
import { NodeState, Tooltip } from '../../models';
import useMobile from '../../hooks/useMobile';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { SkillTheme } from 'theme';

interface Props {
  children: JSX.Element;
  title: string;
  tooltip: Tooltip;
  currentState: NodeState;
  type: string;
  handleSelect: () => void;
  handleRemove: () => void;
}

function Tooltip(props: Props) {
  const {
    children,
    tooltip,
    title,
    type,
    handleSelect,
    handleRemove,
    currentState,
  } = props;
  const { direction = 'top', content } = tooltip;
  const { tooltipZIndex } = useContext<SkillTheme>(ThemeContext);
  const tooltipRef = useRef<Instance<TProps> | null>(null);
  const isMobile = useMobile();

  const placement = React.useMemo(() => (isMobile ? 'top' : direction), [
    isMobile,
    direction,
  ]);

  function hideTooltip() {
    if (!tooltipRef.current) return;

    return tooltipRef.current.hide();
  }

  const memoizedContent = React.useMemo(() => {
    return (
      <TooltipContent
        handleClose={hideTooltip}
        content={content}
        title={title}
        type={type}
        currentState={currentState}
        handleSelect={handleSelect}
        handleRemove={handleRemove}
      />
    );
  }, [content, title, currentState, handleSelect, handleRemove, type]);

  // const tooltipContent = React.createElement(() => {
  //   return (
  //     <TooltipContent
  //     handleClose={hideTooltip}
  //     content={content}
  //     title={title}
  //     currentState={currentState}
  //     handleSelect={handleSelect}
  //     handleRemove={handleRemove}
  //   />
  //   )
  // })

  return (
    <StyledTippy
      interactive
      placement={placement}
      onCreate={tooltip => {
        tooltipRef.current = tooltip;
      }}
      hideOnClick={false}
      animation="shift-away"
      arrow={false}
      appendTo={document.body}
      touch="hold"
      zIndex={tooltipZIndex}
      content={memoizedContent}
    >
      {children}
    </StyledTippy>
  );
}

export default Tooltip;

const StyledTippy = styled(Tippy)`
  background-color: ${({ theme }) => theme.treeBackgroundColor};
  border: ${({ theme }) => theme.border};
  border-image-source: ${({ theme }) => theme.nodeHoverBorderColor};
  border-image-slice: 1;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0 8px;
  text-align: left;
  width: 320px;

  .tippy-backdrop {
    background-color: ${({ theme }) => theme.treeBackgroundColor};
  }
`;
