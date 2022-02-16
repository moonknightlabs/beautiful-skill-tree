import { NodeState, Tooltip } from '../../models';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
interface Props {
  children: JSX.Element;
  title: string;
  tooltip: Tooltip;
  currentState: NodeState;
  type: string;
  handleSelect: () => void;
  handleRemove: () => void;
}
declare function Tooltip(props: Props): JSX.Element;
export default Tooltip;
