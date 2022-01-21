import * as React from 'react';
import { Skill } from '../../models';
interface Props {
  handleClick: VoidFunction;
  handleRightClick: VoidFunction;
  id: string;
  currentState: string;
  skill: Skill;
  learned: number;
}
declare const Node: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<HTMLDivElement>
>;
export default Node;
