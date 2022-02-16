import * as React from 'react';
import { NodeState } from 'models';
declare type Props = {
  content: React.ReactNode;
  title: string;
  currentState: NodeState;
  type: string;
  handleClose: () => void;
  handleSelect: () => void;
  handleRemove: () => void;
};
declare const TooltipContent: React.NamedExoticComponent<Props>;
export default TooltipContent;
