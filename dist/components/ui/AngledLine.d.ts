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
export declare const StyledAngledLine: import("styled-components").StyledComponent<"div", any, AngledLineProps, never>;
