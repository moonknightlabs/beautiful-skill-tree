import React from 'react';
interface Props {
    handleClick: () => void;
    collapsible: boolean;
    isVisible: boolean;
    id: string;
    title: React.ReactNode | string;
    description?: string;
    disabled: boolean;
}
declare function SkillTreeHeader(props: Props): JSX.Element;
export default SkillTreeHeader;
