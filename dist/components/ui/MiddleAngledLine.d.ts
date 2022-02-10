import { NodeState, Direction } from '../../models';
interface Props {
    parentPosition: number;
    childPosition: number;
    direction: Direction;
    state: NodeState;
}
declare function MiddleAngledLine(props: Props): JSX.Element;
export default MiddleAngledLine;
