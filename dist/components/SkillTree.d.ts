import React from 'react';
import { Skill, SavedDataType, ContextStorage, NodeSelectEvent } from '../models';
export interface Props {
    treeId: string;
    data: Skill[];
    title: React.ReactNode | string;
    description?: string;
    collapsible?: boolean;
    closedByDefault?: boolean;
    savedData?: SavedDataType;
    disabled?: boolean;
    currentLevel: string | number;
    skillPoint: string | number;
    handleSave?: (storage: ContextStorage, treeId: string, skills: SavedDataType) => void;
    handleNodeSelect?: (e: NodeSelectEvent) => void;
    handleNodeRemove?: (e: NodeSelectEvent) => void;
}
declare function SkillTree({ data, title, description, closedByDefault, currentLevel, treeId, savedData, skillPoint, handleSave, handleNodeSelect, handleNodeRemove, collapsible, disabled, }: Props): JSX.Element;
export default SkillTree;
