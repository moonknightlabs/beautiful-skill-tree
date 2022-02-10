import React from 'react';
import { Tooltip } from '../../models';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
interface Props {
    children: React.ReactElement;
    title: string;
    tooltip: Tooltip;
}
declare function Tooltip(props: Props): JSX.Element;
export default Tooltip;
