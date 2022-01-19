import * as React from 'react';
import { Skill } from '../../models';
interface Props {
  handleClick: VoidFunction;
  id: string;
  currentState: string;
  skill: Skill;
}
declare const Node: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<HTMLDivElement>
>;
export default Node;
